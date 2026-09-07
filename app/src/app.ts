import { downloadExport } from "./export";
import {
  IDENTITY_LIMITS,
  clipField,
  identityNudge,
  shouldPromptHorizon,
  shouldWarnConstraint,
} from "./identity";
import {
  computeCurrent,
  computeLoop,
  setLoggedToday,
  todayDone,
  todayPlus,
  todaySkip,
} from "./loop";
import { formatLong, formatShort, todayISO } from "./dates";
import {
  dueItems,
  eventsForItem,
  formatWork,
  hasCurrent,
  loopEvents,
  primaryItem,
} from "./items";
import { createLocalStore, type Store } from "./store";
import { energyDots, icon, mountSprite, statusIcon, wordmarkHtml } from "./brand";
import { SKIP_REASONS, type Item, type Screen, type Snapshot } from "./types";

const root = () => document.querySelector<HTMLElement>("#app")!;

interface AppState {
  screen: Screen;
  skipItemId: string | null;
  advanceWarn: boolean;
  busy: boolean;
  error: string | null;
}

const state: AppState = {
  screen: "vandaag",
  skipItemId: null,
  advanceWarn: false,
  busy: false,
  error: null,
};

let store: Store | null = null;
let snapshot: Snapshot | null = null;

function loop() {
  if (!snapshot) throw new Error("geen snapshot");
  const primary = primaryItem(snapshot.items);
  return computeLoop(
    snapshot.vector,
    snapshot.stage,
    loopEvents(snapshot.events, primary),
    todayISO(),
  );
}

function itemDay(item: Item) {
  if (!snapshot) throw new Error("geen snapshot");
  const today = todayISO();
  const primary = primaryItem(snapshot.items);
  const ev = eventsForItem(snapshot.events, item, primary?.id);
  const current = item.a === null ? null : computeCurrent(item.a, ev);
  return {
    done: todayDone(ev, today),
    plus: todayPlus(ev, today),
    skip: todaySkip(ev, today),
    logged: setLoggedToday(ev, today),
    current,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function render(): void {
  if (!snapshot || !store) return;
  const view = loop();
  const { vector, stage } = snapshot;
  const modeLabel = store.mode === "local" ? "Lokaal" : "Supabase";

  const header = `
    <div class="hdr">
      <div>
        ${wordmarkHtml()}
        <div class="date-s">${formatLong(todayISO())}</div>
      </div>
      <div class="mode-pill">${modeLabel}</div>
    </div>`;

  const nav = `
    <nav class="nav">
      <button data-nav="vandaag" class="${state.screen === "vandaag" ? "active" : ""}">${icon("day")}Vandaag</button>
      <button data-nav="koers" class="${state.screen === "koers" ? "active" : ""}">${icon("mark")}Koers</button>
    </nav>`;

  if (state.screen === "vandaag") {
    const nudge = identityNudge(snapshot.profile.identity_new, snapshot.events);
    const today = dueItems(snapshot.items, todayISO());
    root().innerHTML = `
      ${header}
      ${store.mode === "local" ? `<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>` : ""}
      ${view.gearDown ? `<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>` : ""}
      <div class="sec-hd">Lijf</div>
      <div class="card split">
        <div class="row">
          <div>
            <div class="lbl lbl-ico">${icon("moon")} Slaap</div>
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
          <div class="dots">${energyDots(view.energy)}</div>
        </div>
      </div>
      <div class="sec-hd">Vandaag</div>
      ${today.map((item) => itemCard(item, view, nudge)).join("")}
      <div class="sec-hd">Koers</div>
      <div class="card">
        <div class="koers-one">
          ${statusIcon(view.trend.word)}
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
            <div class="val status">${statusIcon(view.trend.word)} ${view.trend.word}</div>
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
      <div class="sec-hd">${icon("ik")} Ik</div>
      <div class="card">
        <div class="field">
          <div class="lbl">Leven dat ik weiger</div>
          <textarea data-id="identity_anti" maxlength="${IDENTITY_LIMITS.identity_anti}">${escapeHtml(snapshot.profile.identity_anti ?? "")}</textarea>
        </div>
        <div class="field">
          <div class="lbl">Wie ik word</div>
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
        <button class="btn ghost ico-btn" data-act="export">${icon("export")}<span>Exporteer JSON</span></button>
      </div>
      ${state.error ? `<p class="error" style="padding:0 18px">${escapeHtml(state.error)}</p>` : ""}
      ${nav}`;
    return;
  }
}

function itemCard(
  item: Item,
  view: ReturnType<typeof loop>,
  nudge: string | null,
): string {
  const day = itemDay(item);
  const track = hasCurrent(item);
  const setTaken = day.logged || Boolean(day.skip);
  const atB = track && day.current !== null && item.b !== null && day.current >= item.b;
  const plusBlocked = setTaken || atB;
  const primary = track;
  const work = formatWork(item);
  const showAdvance = primary && view.suggestedMilestone && item.id === snapshot!.vector.id;
  return `
      <div class="card">
        <div class="ex-nm">${escapeHtml(item.label)}</div>
        ${
          track
            ? `<div class="track">
          <span class="now">${fmt(day.current ?? item.a ?? 0)}</span>
          <span>→</span>
          <span class="mid">${fmt(item.milestone ?? 0)}</span>
          <span>→</span>
          <span class="end">${fmt(item.b ?? 0)}</span>
        </div>`
            : work
              ? `<div class="work">${escapeHtml(work)}</div>`
              : ""
        }
        <div class="actions ${track ? "" : "actions-two"}">
          ${
            track
              ? `<button class="btn ico-btn ${day.plus ? "on" : ""}" data-act="plus" data-item="${item.id}" ${plusBlocked ? "disabled" : ""}>${icon("plus")}<span>+1</span></button>`
              : ""
          }
          <button class="btn ico-btn ${day.done ? "track" : ""}" data-act="done" data-item="${item.id}" ${setTaken ? "disabled" : ""}>${icon("done")}<span>Done</span></button>
          <button class="btn ico-btn skip ${day.skip ? "on" : ""}" data-act="skip-open" data-item="${item.id}" ${day.logged ? "disabled" : ""}>${icon("skip")}<span>Skip</span></button>
        </div>
        ${
          state.skipItemId === item.id || day.skip
            ? `<div class="chips">${SKIP_REASONS.map(
                (reason) =>
                  `<button class="chip ${day.skip === reason ? "on" : ""}" data-act="skip" data-item="${item.id}" data-reason="${reason}">${reason}</button>`,
              ).join("")}</div>`
            : ""
        }
        ${
          showAdvance
            ? `<div class="note">Etappe gehaald. Niet automatisch verder. Voorstel: ${fmt(view.suggestedMilestone!)}.</div>
               ${
                 state.advanceWarn && snapshot!.profile.identity_constraint
                   ? `<div class="banner">Check: ${escapeHtml(snapshot!.profile.identity_constraint)}. Geen blokkade.</div>
                      <div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance-go">Toch verder ${fmt(view.suggestedMilestone!)}</button>
                        <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
                      </div>`
                   : `<div class="stack" style="margin-top:10px">
                        <button class="btn primary" data-act="advance" data-n="${view.suggestedMilestone}">Volgende etappe ${fmt(view.suggestedMilestone!)}</button>
                      </div>`
               }`
            : ""
        }
        ${primary && nudge ? `<div class="note">${escapeHtml(nudge)}</div>` : ""}
      </div>`;
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
  state.screen = "vandaag";
  render();
}

export async function start(): Promise<void> {
  mountSprite();
  bind();
  await enterApp(createLocalStore());
}

function bind(): void {
  document.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-act], [data-nav]");
    if (!target) return;
    const nav = target.dataset.nav as Screen | undefined;
    if (nav === "vandaag" || nav === "koers") {
      state.screen = nav;
      state.skipItemId = null;
      state.advanceWarn = false;
      render();
      return;
    }
    void handleAction(target);
  });
}

async function handleAction(target: HTMLElement): Promise<void> {
  const act = target.dataset.act;
  if (!act) return;

  if (!store || !snapshot) return;
  const view = loop();
  const today = todayISO();

  if (act === "sleep-inc" || act === "sleep-dec") {
    const current = view.sleep ?? 7;
    const next = Math.max(0, Math.min(14, current + (act === "sleep-inc" ? 0.5 : -0.5)));
    await persistEvent({ date: today, kind: "body_sleep", value: next, skip_reason: null, item_id: null });
    return;
  }

  if (act === "energy") {
    const n = Number(target.dataset.n);
    const value = view.energy === n ? null : n;
    if (value === null) return;
    await persistEvent({ date: today, kind: "body_energy", value, skip_reason: null, item_id: null });
    return;
  }

  if (act === "plus") {
    const item = snapshot.items.find((row) => row.id === target.dataset.item);
    if (!item || !hasCurrent(item)) return;
    const day = itemDay(item);
    if (day.logged || day.skip || (item.b !== null && day.current !== null && day.current >= item.b)) {
      return;
    }
    await persistEvent({
      date: today,
      kind: "set",
      value: (day.current ?? item.a ?? 0) + 1,
      skip_reason: null,
      item_id: item.id,
    });
    return;
  }

  if (act === "done") {
    const item = snapshot.items.find((row) => row.id === target.dataset.item);
    if (!item) return;
    const day = itemDay(item);
    if (day.logged || day.skip) return;
    await persistEvent({
      date: today,
      kind: "done",
      value: day.current ?? item.a,
      skip_reason: null,
      item_id: item.id,
    });
    return;
  }

  if (act === "skip-open") {
    const itemId = target.dataset.item ?? null;
    state.skipItemId = state.skipItemId === itemId ? null : itemId;
    render();
    return;
  }

  if (act === "skip") {
    const item = snapshot.items.find((row) => row.id === target.dataset.item);
    if (!item) return;
    const day = itemDay(item);
    if (day.logged) return;
    const reason = target.dataset.reason;
    if (!reason) return;
    await persistEvent({
      date: today,
      kind: "skip",
      value: null,
      skip_reason: reason as (typeof SKIP_REASONS)[number],
      item_id: item.id,
    });
    state.skipItemId = null;
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
}

function valueOf(id: string): string | null {
  const el = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[data-id="${id}"]`);
  return el?.value ?? null;
}

async function goAdvance(milestone: number): Promise<void> {
  await withBusy(async () => {
    snapshot!.stage = await store!.advanceStage(snapshot!.stage, milestone);
    snapshot!.items = snapshot!.items.map((item) =>
      item.id === snapshot!.stage.vector_id ? { ...item, milestone } : item,
    );
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
