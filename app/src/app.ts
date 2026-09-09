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
  eventsForItem,
  formatWork,
  hasCurrent,
  loopEvents,
  primaryItem,
  todayActions,
  todayConstraints,
  todayLater,
  todayStofjes,
} from "./items";
import {
  AGE_BANDS,
  GOALS,
  MAX_START,
  isAgeBand,
  isGoalId,
  needsOnboarding,
  onboardStep,
  suggestStartItems,
  toggleGoal,
  toggleStartId,
} from "./goals";
import { THEME_LIMIT, THEME_SUGGESTIONS, addTheme, toggleTheme } from "./themes";
import { timingNote } from "./timing";
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
  startIds: string[];
}

const state: AppState = {
  screen: "vandaag",
  skipItemId: null,
  advanceWarn: false,
  busy: false,
  error: null,
  startIds: [],
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
  const setup = onboardStep(snapshot);
  if (setup) {
    root().innerHTML = onboardView(setup);
    return;
  }
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
    const today = todayISO();
    const actions = todayActions(snapshot.items, today);
    const rules = todayConstraints(snapshot.items, today);
    const stofjes = todayStofjes(snapshot.items, today);
    const later = todayLater(snapshot.items, today);
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
      ${
        rules.length
          ? `<div class="sec-hd">Regel</div>${rules.map((item) => ruleLine(item)).join("")}`
          : ""
      }
      ${
        stofjes.length
          ? `<div class="sec-hd">Stofjes</div>${stofjes.map((item) => stofCard(item)).join("")}`
          : ""
      }
      <div class="sec-hd">Vandaag</div>
      ${actions.map((item) => itemCard(item, view, nudge)).join("")}
      ${
        later.length
          ? `<div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in je start. Blijft bewaard.</div>
        ${later.map((item) => laterRow(item)).join("")}
      </div>`
          : ""
      }
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
      <div class="sec-hd">Thema's</div>
      <div class="card">
        <div class="ex-nm">Trainingsrichting</div>
        <div class="note">Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.</div>
        ${themePicker(snapshot.profile.themes ?? [])}
      </div>
      <div class="card stack">
        <button class="btn ghost ico-btn" data-act="export">${icon("export")}<span>Exporteer JSON</span></button>
      </div>
      ${state.error ? `<p class="error" style="padding:0 18px">${escapeHtml(state.error)}</p>` : ""}
      ${nav}`;
    return;
  }
}

function stofCard(item: Item): string {
  const day = itemDay(item);
  const taken = day.logged || Boolean(day.skip);
  const doneLabel = item.type === "medicijn" ? "Genomen" : "Done";
  const note = timingNote(item);
  return `
      <div class="card stof">
        <div class="ex-nm">${escapeHtml(item.label)}</div>
        ${note ? `<div class="note">${escapeHtml(note)}</div>` : ""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${day.done ? "track" : ""}" data-act="done" data-item="${item.id}" ${taken ? "disabled" : ""}>${icon("done")}<span>${doneLabel}</span></button>
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
      </div>`;
}

function laterRow(item: Item): string {
  return `
      <div class="later-row">
        <div class="ex-nm">${escapeHtml(item.label)}</div>
        <button class="btn ghost later-now" data-act="later-now" data-item="${item.id}">Nu</button>
      </div>`;
}

function themePicker(themes: string[]): string {
  const selected = new Set(themes.map((theme) => theme.toLowerCase()));
  const extras = themes.filter(
    (theme) => !THEME_SUGGESTIONS.some((row) => row.toLowerCase() === theme.toLowerCase()),
  );
  const chips = [...THEME_SUGGESTIONS, ...extras];
  return `
        <div class="chips">${chips
          .map((label) => {
            const on = selected.has(label.toLowerCase());
            return `<button class="chip pick ${on ? "on" : ""}" data-act="theme-toggle" data-theme="${escapeHtml(label)}">${escapeHtml(label)}</button>`;
          })
          .join("")}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${THEME_LIMIT}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`;
}

function onboardView(step: "goals" | "age" | "themes" | "start"): string {
  if (!snapshot) return "";
  const goals = snapshot.profile.goals ?? [];
  const age = snapshot.profile.age_band;
  const picks = suggestStartItems(snapshot.items, goals);
  const startIds = state.startIds;
  const header = `
    <div class="hdr">
      <div>
        ${wordmarkHtml()}
        <div class="date-s">Start</div>
      </div>
    </div>`;

  if (step === "goals") {
    return `
      ${header}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="ex-nm">Wat is je richting?</div>
        <div class="note">Eerst doelen. Types (gedrag, regel, medicijn, supplement) komen daarna.</div>
        <div class="chips">${GOALS.map(
          (goal) =>
            `<button class="chip pick ${goals.includes(goal.id) ? "on" : ""}" data-act="onboard-goal" data-goal="${goal.id}">${goal.label}</button>`,
        ).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${goals.length === 0 ? "disabled" : ""}>Verder</button>
        </div>
      </div>`;
  }

  if (step === "age") {
    return `
      ${header}
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="ex-nm">Kies een band</div>
        <div class="note">Geen geboortedatum. Alleen een band.</div>
        <div class="chips">${AGE_BANDS.map(
          (band) =>
            `<button class="chip pick ${age === band ? "on" : ""}" data-act="onboard-age" data-age="${band}">${band}</button>`,
        ).join("")}</div>
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next" ${age ? "" : "disabled"}>Verder</button>
        </div>
      </div>`;
  }

  if (step === "themes") {
    const themes = snapshot.profile.themes ?? [];
    return `
      ${header}
      <div class="sec-hd">Thema's</div>
      <div class="card">
        <div class="ex-nm">Trainingsrichting</div>
        <div class="note">Tik een suggestie of typ zelf. Mag leeg. Later aan te passen.</div>
        ${themePicker(themes)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-next">Verder</button>
        </div>
      </div>`;
  }

  return `
    ${header}
    <div class="sec-hd">Start</div>
    <div class="card">
      <div class="ex-nm">Max ${MAX_START} nu</div>
      <div class="note">De rest gaat naar Later. Later blijft zichtbaar.</div>
      <div class="chips">${picks
        .map((item) => {
          const on = startIds.includes(item.id);
          return `<button class="chip pick ${on ? "on" : ""}" data-act="onboard-start" data-item="${item.id}">${escapeHtml(item.label)}</button>`;
        })
        .join("")}</div>
      <div class="note">${startIds.length} / ${MAX_START} gekozen</div>
      <div class="stack" style="margin-top:16px">
        <button class="btn primary" data-act="onboard-done" ${startIds.length === 0 ? "disabled" : ""}>Naar Vandaag</button>
      </div>
    </div>`;
}

function ruleLine(item: Item): string {
  const note = timingNote(item);
  return `
      <div class="card quiet">
        <div class="ex-nm">${escapeHtml(item.label)}</div>
        ${note ? `<div class="note">${escapeHtml(note)}</div>` : `<div class="note">Regel. Geen afvinken.</div>`}
      </div>`;
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
  const note = timingNote(item);
  const showAdvance = primary && view.suggestedMilestone && item.id === snapshot!.vector.id;
  return `
      <div class="card">
        <div class="ex-nm">${escapeHtml(item.label)}</div>
        ${note && !work && !track ? `<div class="note">${escapeHtml(note)}</div>` : ""}
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
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const el = event.target as HTMLElement;
    if (!(el instanceof HTMLInputElement) || el.dataset.id !== "theme-custom") return;
    event.preventDefault();
    void persistCustomTheme();
  });

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

  if (act === "onboard-goal") {
    const id = target.dataset.goal;
    if (!id || !isGoalId(id)) return;
    const profile = { ...snapshot.profile, goals: toggleGoal(snapshot.profile.goals ?? [], id) };
    await withBusy(async () => {
      await store!.saveProfile(profile);
      snapshot!.profile = profile;
    });
    return;
  }

  if (act === "onboard-age") {
    const band = target.dataset.age;
    if (!band || !isAgeBand(band)) return;
    const profile = { ...snapshot.profile, age_band: band };
    await withBusy(async () => {
      await store!.saveProfile(profile);
      snapshot!.profile = profile;
    });
    return;
  }

  if (act === "theme-toggle") {
    const label = target.dataset.theme;
    if (!label) return;
    await persistThemeList(toggleTheme(snapshot.profile.themes ?? [], label));
    return;
  }

  if (act === "theme-add") {
    await persistCustomTheme();
    return;
  }

  if (act === "onboard-start") {
    const id = target.dataset.item;
    if (!id) return;
    state.startIds = toggleStartId(state.startIds, id);
    render();
    return;
  }

  if (act === "onboard-next") {
    if (onboardStep(snapshot) === "themes") {
      await persistThemeList(snapshot.profile.themes ?? [], true);
      return;
    }
    render();
    return;
  }

  if (act === "onboard-done") {
    const age = snapshot.profile.age_band;
    const goals = snapshot.profile.goals ?? [];
    if (!age || goals.length === 0 || state.startIds.length === 0) return;
    await withBusy(async () => {
      await store!.saveOnboarding({ goals, age_band: age, startIds: state.startIds });
      snapshot = await store!.load();
      state.screen = "vandaag";
    });
    return;
  }

  if (act === "later-now") {
    const id = target.dataset.item;
    if (!id) return;
    await withBusy(async () => {
      await store!.setItemLater(id, false);
      snapshot = await store!.load();
    });
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

async function persistCustomTheme(): Promise<void> {
  if (!snapshot) return;
  const raw = valueOf("theme-custom") ?? "";
  const next = addTheme(snapshot.profile.themes ?? [], raw);
  if (next === snapshot.profile.themes) return;
  await persistThemeList(next);
}

async function persistThemeList(themes: string[], markStep = false): Promise<void> {
  if (!store || !snapshot) return;
  const profile = { ...snapshot.profile, themes };
  const finish = markStep || !needsOnboarding(snapshot);
  await withBusy(async () => {
    if (finish) {
      await store!.saveThemes(themes);
      snapshot = await store!.load();
      return;
    }
    await store!.saveProfile(profile);
    snapshot!.profile = profile;
  });
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
