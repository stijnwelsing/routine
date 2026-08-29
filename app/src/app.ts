import { downloadExport } from "./export";
import {
  IDENTITY_LIMITS,
  clipField,
  identityNudge,
  shouldPromptHorizon,
  shouldWarnConstraint,
} from "./identity";
import { computeLoop } from "./loop";
import { formatLong, formatShort, todayISO } from "./dates";
import {
  createCloudStore,
  createLocalStore,
  ensureOwnTenant,
  hasLocalSession,
  resolveStore,
  type Store,
} from "./store";
import { createSupabase } from "./supabase";
import { SKIP_REASONS, type Screen, type Snapshot } from "./types";
import type { SupabaseClient } from "@supabase/supabase-js";

const root = () => document.querySelector<HTMLElement>("#app")!;

interface AppState {
  screen: Screen;
  skipOpen: boolean;
  advanceWarn: boolean;
  busy: boolean;
  error: string | null;
  email: string;
  magicSent: boolean;
}

const state: AppState = {
  screen: "vandaag",
  skipOpen: false,
  advanceWarn: false,
  busy: false,
  error: null,
  email: "",
  magicSent: false,
};

let store: Store | null = null;
let snapshot: Snapshot | null = null;
let client: SupabaseClient | null = null;
let gate: "boot" | "setup" | "auth" | "app" = "boot";

function loop() {
  if (!snapshot) throw new Error("geen snapshot");
  return computeLoop(snapshot.vector, snapshot.stage, snapshot.events, todayISO());
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function render(): void {
  if (gate === "boot") {
    root().innerHTML = `<div class="center"><h1>Routine</h1><p>Laden…</p></div>`;
    return;
  }

  if (gate === "setup") {
    root().innerHTML = `
      <div class="center">
        <h1>Routine</h1>
        <p>Geen live Supabase. Zet <code>VITE_SUPABASE_URL</code> en <code>VITE_SUPABASE_ANON_KEY</code> in <code>app/.env.local</code>. Zie README.</p>
        <div class="stack">
          <button class="btn primary" data-act="local">Doorgaan lokaal op dit apparaat</button>
        </div>
        <p class="note">Lokaal is geen nep-cloud. Data blijft in deze browser tot je een project koppelt.</p>
      </div>`;
    return;
  }

  if (gate === "auth") {
    root().innerHTML = `
      <div class="center">
        <h1>Routine</h1>
        <p>Magic link. Geen wachtwoord.</p>
        <div class="field">
          <div class="lbl">E-mail</div>
          <input type="email" autocomplete="email" inputmode="email" value="${escapeHtml(state.email)}" data-field="email" placeholder="jij@email" />
        </div>
        <button class="btn primary" data-act="magic" ${state.busy ? "disabled" : ""}>
          ${state.magicSent ? "Opnieuw sturen" : "Stuur link"}
        </button>
        ${state.magicSent ? `<p class="note">Check je mail. Open de link op deze telefoon.</p>` : ""}
        ${state.error ? `<p class="error">${escapeHtml(state.error)}</p>` : ""}
      </div>`;
    return;
  }

  if (!snapshot || !store) return;
  const view = loop();
  const { vector, stage } = snapshot;
  const modeLabel = store.mode === "local" ? "Lokaal" : "Supabase";

  const header = `
    <div class="hdr">
      <div>
        <h1>${state.screen === "koers" ? "Koers" : "Vandaag"}</h1>
        <div class="date-s">${formatLong(todayISO())}</div>
      </div>
      <div class="mode-pill ${store.mode === "local" ? "warn" : ""}">${modeLabel}</div>
    </div>`;

  const nav = `
    <nav class="nav">
      <button data-nav="vandaag" class="${state.screen === "vandaag" ? "active" : ""}"><span class="ni">●</span>Vandaag</button>
      <button data-nav="koers" class="${state.screen === "koers" ? "active" : ""}"><span class="ni">↗</span>Koers</button>
    </nav>`;

  if (state.screen === "vandaag") {
    const nudge = identityNudge(snapshot.profile.identity_new, snapshot.events);
    const setTaken = view.setLoggedToday || Boolean(view.skipToday);
    const plusBlocked = setTaken || view.atB;
    const doneBlocked = setTaken;
    root().innerHTML = `
      ${header}
      ${store.mode === "local" ? `<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>` : ""}
      ${view.gearDown ? `<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>` : ""}
      <div class="sec-hd">Lijf</div>
      <div class="card split">
        <div class="row">
          <div>
            <div class="lbl">Slaap</div>
            <div class="note">Optioneel. Blokkeert de dag niet.</div>
          </div>
          <div class="num-row">
            <button class="nb" data-act="sleep-dec">−</button>
            <div class="ndisp">${view.sleep === null ? "—" : view.sleep.toFixed(1)}</div>
            <button class="nb" data-act="sleep-inc">+</button>
          </div>
        </div>
        <div>
          <div class="lbl">Energie</div>
          <div class="stars">
            ${[1, 2, 3, 4, 5]
              .map(
                (n) =>
                  `<button class="star ${view.energy !== null && view.energy >= n ? "on" : ""}" data-act="energy" data-n="${n}">★</button>`,
              )
              .join("")}
          </div>
        </div>
      </div>
      <div class="sec-hd">Etappe</div>
      <div class="card">
        <div class="ex-nm">Push-ups</div>
        <div class="track">
          <span class="now">${fmt(view.current)}</span>
          <span>→</span>
          <span class="mid">${fmt(stage.milestone)}</span>
          <span>→</span>
          <span class="end">${fmt(vector.b)}</span>
        </div>
        <div class="actions">
          <button class="btn ${view.plusToday ? "on" : ""}" data-act="plus" ${plusBlocked ? "disabled" : ""}>+1</button>
          <button class="btn ${view.doneToday ? "on" : "primary"}" data-act="done" ${doneBlocked ? "disabled" : ""}>Done</button>
          <button class="btn ${view.skipToday ? "warn" : "ghost"}" data-act="skip-open" ${view.setLoggedToday ? "disabled" : ""}>Skip</button>
        </div>
        ${
          state.skipOpen || view.skipToday
            ? `<div class="chips">${SKIP_REASONS.map(
                (reason) =>
                  `<button class="chip ${view.skipToday === reason ? "on" : ""}" data-act="skip" data-reason="${reason}">${reason}</button>`,
              ).join("")}</div>`
            : ""
        }
        ${
          view.suggestedMilestone
            ? `<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${fmt(view.suggestedMilestone)}.</div>
               ${
                 state.advanceWarn && snapshot.profile.identity_constraint
                   ? `<div class="banner hot">Check: ${escapeHtml(snapshot.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${fmt(view.suggestedMilestone)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`
                   : `<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${view.suggestedMilestone}">Volgende etappe ${fmt(view.suggestedMilestone)}</button>
                      </div>`
               }`
            : ""
        }
        ${nudge ? `<div class="note">${escapeHtml(nudge)}</div>` : ""}
      </div>
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          <div class="arrow">${view.trend.arrow}</div>
          <div class="word">${view.trend.word}</div>
        </div>
      </div>
      ${state.error ? `<p class="error" style="padding:0 18px">${escapeHtml(state.error)}</p>` : ""}
      ${nav}`;
    return;
  }

  if (state.screen === "koers") {
    const hit =
      view.hitrate.eligible === 0
        ? "—"
        : `${view.hitrate.hits}/${view.hitrate.eligible}`;
    root().innerHTML = `
      ${header}
      <div class="sec-hd">Strength · push-ups</div>
      <div class="card">
        <div class="kv">
          <div><div class="lbl">A</div><div class="val">${fmt(vector.a)}</div></div>
          <div><div class="lbl">B</div><div class="val">${fmt(vector.b)}</div></div>
          <div><div class="lbl">Nu</div><div class="val">${fmt(view.current)}</div></div>
          <div><div class="lbl">Etappe</div><div class="val">${fmt(stage.milestone)}</div></div>
        </div>
      </div>
      <div class="card">
        <div class="kv">
          <div>
            <div class="lbl">Venster</div>
            <div class="val" style="font-size:1.15rem">${formatShort(stage.started_on)} → ${stage.deadline ? formatShort(stage.deadline) : "—"}</div>
          </div>
          <div>
            <div class="lbl">Trend</div>
            <div class="val">${view.trend.arrow} ${view.trend.word}</div>
          </div>
          <div>
            <div class="lbl">Hitrate week</div>
            <div class="val">${hit}</div>
          </div>
          <div>
            <div class="lbl">Rem</div>
            <div class="val" style="font-size:1.1rem">${escapeHtml(vector.pace_constraint || "—")}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="lbl">Volgende actie</div>
        <div class="action-line">${escapeHtml(view.nextAction)}</div>
      </div>
      ${
        shouldPromptHorizon(snapshot.profile.horizon_1y, snapshot.rotated)
          ? `<div class="banner">Zet een 1-jaars B. Etappes roteren.</div>`
          : ""
      }
      <div class="sec-hd">Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${IDENTITY_LIMITS.identity_anti}">${escapeHtml(snapshot.profile.identity_anti ?? "")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word, één zin</div>
          <textarea data-id="identity_new" maxlength="${IDENTITY_LIMITS.identity_new}">${escapeHtml(snapshot.profile.identity_new ?? "")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wat B niet mag schenden</div>
          <textarea data-id="identity_constraint" maxlength="${IDENTITY_LIMITS.identity_constraint}">${escapeHtml(snapshot.profile.identity_constraint ?? "")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">1-jaars B</div>
          <textarea data-id="horizon_1y" maxlength="${IDENTITY_LIMITS.horizon_1y}">${escapeHtml(snapshot.profile.horizon_1y ?? "")}</textarea>
        </div>
        <button class="btn primary" data-act="save-ik">Bewaar</button>
      </div>
      <div class="card stack">
        <button class="btn ghost" data-act="export">Exporteer JSON</button>
        ${store.mode === "cloud" ? `<button class="btn ghost" data-act="signout">Uitloggen</button>` : ""}
      </div>
      ${state.error ? `<p class="error" style="padding:0 18px">${escapeHtml(state.error)}</p>` : ""}
      ${nav}`;
    return;
  }
}

function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

async function withBusy(fn: () => Promise<void>): Promise<void> {
  if (state.busy) return;
  state.busy = true;
  state.error = null;
  try {
    await fn();
  } catch (error) {
    state.error = error instanceof Error ? error.message : "Er ging iets mis";
  } finally {
    state.busy = false;
    render();
  }
}

async function enterApp(next: Store): Promise<void> {
  store = next;
  snapshot = await store.load();
  gate = "app";
  state.screen = "vandaag";
  render();
}

export async function start(): Promise<void> {
  client = createSupabase();
  bind();

  if (!client) {
    if (hasLocalSession()) {
      await enterApp(createLocalStore());
      return;
    }
    gate = "setup";
    render();
    return;
  }

  const resolved = await resolveStore(client);
  if (resolved.kind === "ready") {
    await enterApp(resolved.store);
    client.auth.onAuthStateChange(async (_event, session) => {
      if (!session) {
        store = null;
        snapshot = null;
        gate = "auth";
        render();
      }
    });
    return;
  }

  gate = "auth";
  render();
  client.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user && gate !== "app") {
      const tenantId = await ensureOwnTenant(client!);
      await enterApp(createCloudStore(client!, session.user, tenantId));
    }
  });
}

function bind(): void {
  document.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-act], [data-nav]");
    if (!target) return;
    const nav = target.dataset.nav as Screen | undefined;
    if (nav === "vandaag" || nav === "koers") {
      state.screen = nav;
      state.skipOpen = false;
      state.advanceWarn = false;
      render();
      return;
    }
    void handleAction(target);
  });

  document.addEventListener("input", (event) => {
    const field = event.target as HTMLInputElement;
    if (field.dataset.field === "email") state.email = field.value;
  });
}

async function handleAction(target: HTMLElement): Promise<void> {
  const act = target.dataset.act;
  if (!act) return;

  if (act === "local") {
    await enterApp(createLocalStore());
    return;
  }

  if (act === "magic") {
    if (!client) return;
    await withBusy(async () => {
      const email = state.email.trim();
      if (!email) throw new Error("Vul een e-mailadres in");
      const { error } = await client!.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${window.location.origin}${window.location.pathname}`,
        },
      });
      if (error) throw error;
      state.magicSent = true;
    });
    return;
  }

  if (!store || !snapshot) return;
  const view = loop();
  const today = todayISO();

  if (act === "sleep-inc" || act === "sleep-dec") {
    const current = view.sleep ?? 7;
    const next = Math.max(0, Math.min(14, current + (act === "sleep-inc" ? 0.5 : -0.5)));
    await persistEvent({ date: today, kind: "body_sleep", value: next, skip_reason: null });
    return;
  }

  if (act === "energy") {
    const n = Number(target.dataset.n);
    const value = view.energy === n ? null : n;
    if (value === null) return;
    await persistEvent({ date: today, kind: "body_energy", value, skip_reason: null });
    return;
  }

  if (act === "plus") {
    if (view.setLoggedToday || view.skipToday || view.atB) return;
    await persistEvent({ date: today, kind: "set", value: view.current + 1, skip_reason: null });
    return;
  }

  if (act === "done") {
    if (view.setLoggedToday || view.skipToday) return;
    await persistEvent({ date: today, kind: "done", value: view.current, skip_reason: null });
    return;
  }

  if (act === "skip-open") {
    state.skipOpen = !state.skipOpen;
    render();
    return;
  }

  if (act === "skip") {
    if (view.setLoggedToday) return;
    const reason = target.dataset.reason;
    if (!reason) return;
    await persistEvent({
      date: today,
      kind: "skip",
      value: null,
      skip_reason: reason as (typeof SKIP_REASONS)[number],
    });
    state.skipOpen = false;
    return;
  }

  if (act === "advance") {
    if (!view.suggestedMilestone) return;
    if (shouldWarnConstraint(snapshot.profile.identity_constraint) && !state.advanceWarn) {
      state.advanceWarn = true;
      render();
      return;
    }
    await goAdvance(view.suggestedMilestone);
    return;
  }

  if (act === "advance-go") {
    if (!view.suggestedMilestone) return;
    await goAdvance(view.suggestedMilestone);
    return;
  }

  if (act === "advance-cancel") {
    state.advanceWarn = false;
    render();
    return;
  }

  if (act === "save-ik") {
    const profile = {
      ...snapshot.profile,
      identity_anti: clipField(valueOf("identity_anti"), IDENTITY_LIMITS.identity_anti),
      identity_new: clipField(valueOf("identity_new"), IDENTITY_LIMITS.identity_new),
      identity_constraint: clipField(valueOf("identity_constraint"), IDENTITY_LIMITS.identity_constraint),
      horizon_1y: clipField(valueOf("horizon_1y"), IDENTITY_LIMITS.horizon_1y),
    };
    await withBusy(async () => {
      await store!.saveProfile(profile);
      snapshot!.profile = profile;
    });
    return;
  }

  if (act === "export") {
    downloadExport(snapshot);
    return;
  }

  if (act === "signout") {
    await store.signOut();
    store = null;
    snapshot = null;
    gate = "auth";
    render();
    return;
  }

}

function valueOf(id: string): string | null {
  const el = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[data-id="${id}"]`);
  return el?.value ?? null;
}

async function goAdvance(milestone: number): Promise<void> {
  await withBusy(async () => {
    snapshot!.stage = await store!.advanceStage(snapshot!.stage, milestone);
    snapshot!.rotated = true;
    state.advanceWarn = false;
  });
}

async function persistEvent(
  input: Parameters<Store["addEvent"]>[0],
): Promise<void> {
  await withBusy(async () => {
    const event = await store!.addEvent(input);
    snapshot!.events.push(event);
  });
}
