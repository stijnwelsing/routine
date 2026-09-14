import { downloadExport } from "./export";
import { IMPORT_ERROR } from "./import";
import {
  IDENTITY_LIMITS,
  clipField,
  constraintLine,
  horizonLine,
  identityNudgeOnSkip,
  wouldBreakConstraint,
} from "./identity";
import {
  computeCurrent,
  computeLoop,
  setLoggedToday,
  todayDone,
  todayEnergy,
  todayPlus,
  todaySkip,
  todaySleep,
  todayWake,
  todayMeal,
  lastWeight,
  lastWake,
  lastMeal,
  nudgeWeight,
  nudgeWake,
  nudgeMeal,
  parseWeight,
  parseWake,
  parseMeal,
  formatWake,
  formatMeal,
  todayActionEvent,
  wakeAtOnDay,
  mealAtOnDay,
} from "./loop";
import { formatLong, formatShort, todayISO, WEEKDAYS } from "./dates";
import {
  pendingMisses,
  reviewPrimaryId,
  weekReview,
  type ItemDay,
  type WeekReview,
} from "./review";
import {
  ITEM_LABEL_LIMIT,
  ITEM_TIMING_LIMIT,
  USER_ITEM_KINDS,
  USER_ITEM_KIND_LABEL,
  eventsForItem,
  formatWeekdays,
  formatWork,
  hasCurrent,
  isSeedSuggestion,
  isUserAddedItem,
  isUserItemKind,
  isWeeklyItem,
  kindFromItem,
  loopEvents,
  primaryItem,
  timingInputValue,
  todayActions,
  todayConstraints,
  todayLater,
  todayPreferences,
  todaySociaal,
  todayStofjes,
  userAddedItems,
  type UserItemKind,
} from "./items";
import { defaultTemplate, hasTemplate } from "./templates";
import {
  AGE_BANDS,
  GOALS,
  MAX_START,
  activeLoadNote,
  isAgeBand,
  isGoalId,
  laterActiveItems,
  laterActiveLoadItems,
  laterParkedItems,
  needsOnboarding,
  onboardStep,
  suggestStartItems,
  toggleGoal,
  toggleStartId,
} from "./goals";
import { lineDots, linePointsAttr, progressView, type WeightPoint } from "./progress";
import { addTheme, normalizeThemes, themePickerHtml, toggleTheme } from "./themes";
import { CONFIRM_BEAT_MS, todayConfirm } from "./confirm";
import {
  conditionNote,
  isConstraint,
  isPreference,
  isVisibleToday,
  timingContext,
  timingNote,
  windowNote,
} from "./timing";
import { createLocalStore, type Store } from "./store";
import { energyDots, icon, mountSprite, statusIcon, wordmarkHtml } from "./brand";
import { SKIP_REASONS, isScreen, isSkipReason, type Item, type Screen, type Snapshot } from "./types";

const root = () => document.querySelector<HTMLElement>("#app")!;

interface AppState {
  screen: Screen;
  skipItemId: string | null;
  missKey: string | null;
  detailItemId: string | null;
  advanceWarn: boolean;
  busy: boolean;
  error: string | null;
  startIds: string[];
  addKind: UserItemKind;
  addLabel: string;
  addTiming: string;
  editKind: UserItemKind;
  editLabel: string;
  editTiming: string;
  removeAsk: boolean;
  importPaste: string;
  confirmBeats: Record<string, number>;
}

const state: AppState = {
  screen: "vandaag",
  skipItemId: null,
  missKey: null,
  detailItemId: null,
  advanceWarn: false,
  busy: false,
  error: null,
  startIds: [],
  addKind: "gedrag",
  addLabel: "",
  addTiming: "",
  editKind: "gedrag",
  editLabel: "",
  editTiming: "",
  removeAsk: false,
  importPaste: "",
  confirmBeats: {},
};

const confirmTimers = new Map<string, number>();

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

function itemDay(item: Item, date = todayISO()) {
  if (!snapshot) throw new Error("geen snapshot");
  const primary = primaryItem(snapshot.items);
  const ev = eventsForItem(snapshot.events, item, primary?.id);
  const current = item.a === null ? null : computeCurrent(item.a, ev);
  return {
    done: todayDone(ev, date),
    plus: todayPlus(ev, date),
    skip: todaySkip(ev, date),
    logged: setLoggedToday(ev, date),
    current,
  };
}

function missKey(itemId: string, date: string): string {
  return `${itemId}:${date}`;
}

function nowContext(today = todayISO()) {
  const events = snapshot?.events ?? [];
  return timingContext({
    today,
    now: new Date(),
    wakeAt: wakeAtOnDay(today, todayWake(events, today)),
    mealAt: mealAtOnDay(today, todayMeal(events, today)),
    sleepSet: todaySleep(events, today) !== null,
    energySet: todayEnergy(events, today) !== null,
  });
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
    <nav class="nav nav-4">
      <button data-nav="vandaag" class="${state.screen === "vandaag" ? "active" : ""}">${icon("day")}Vandaag</button>
      <button data-nav="koers" class="${state.screen === "koers" ? "active" : ""}">${icon("mark")}Koers</button>
      <button data-nav="voortgang" class="${state.screen === "voortgang" ? "active" : ""}">${icon("line")}Voortgang</button>
      <button data-nav="profiel" class="${state.screen === "profiel" ? "active" : ""}">${icon("me")}Profiel</button>
    </nav>`;

  if (state.detailItemId) {
    const item = snapshot.items.find((row) => row.id === state.detailItemId);
    if (item) {
      root().innerHTML = `
      ${header}
      ${detailView(item)}
      ${state.error ? `<p class="error" style="padding:0 18px">${escapeHtml(state.error)}</p>` : ""}
      ${nav}`;
      return;
    }
    state.detailItemId = null;
  }

  if (state.screen === "vandaag") {
    const today = todayISO();
    const ctx = nowContext(today);
    const actions = todayActions(snapshot.items, today).filter((item) => isVisibleToday(item, ctx));
    const rules = todayConstraints(snapshot.items, today);
    const stofjes = todayStofjes(snapshot.items, today).filter((item) => isVisibleToday(item, ctx));
    const sociaal = todaySociaal(snapshot.items, today).filter((item) => isVisibleToday(item, ctx));
    const later = todayLater(snapshot.items, today);
    const prefs = todayPreferences(snapshot.items, today);
    const pending = pendingMisses(snapshot.items, snapshot.events, today, reviewPrimaryId(snapshot.items));
    root().innerHTML = `
      ${header}
      ${store.mode === "local" ? `<div class="banner">Lokaal — geen Supabase. +1 / Done / Skip blijven op dit apparaat.</div>` : ""}
      ${view.gearDown ? `<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>` : ""}
      <div class="sec-hd">Lijf</div>
      <div class="card split">
        <div class="note" style="margin-top:0">Optioneel. Blokkeert de dag niet.</div>
        <div class="row">
          <div class="lbl lbl-ico">${icon("moon")} Slaap</div>
          <div class="num-row">
            <button class="nb" data-act="sleep-dec" aria-label="Slaap omlaag">−</button>
            <div class="ndisp">${view.sleep === null ? "—" : view.sleep.toFixed(1)}</div>
            <button class="nb" data-act="sleep-inc" aria-label="Slaap omhoog">+</button>
          </div>
        </div>
        <div class="row">
          <div class="lbl">Opstaan</div>
          <div class="num-row">
            <button class="nb" data-act="wake-dec" aria-label="Opstaan eerder">−</button>
            <div class="nwrap">
              <input
                class="ninp ninp-time"
                data-id="wake"
                type="time"
                enterkeyhint="done"
                aria-label="Opstaan-tijd"
                value="${view.wake === null ? "" : formatWake(view.wake)}"
              >
            </div>
            <button class="nb" data-act="wake-inc" aria-label="Opstaan later">+</button>
          </div>
        </div>
        <div class="row">
          <div class="lbl">Maaltijd</div>
          <div class="num-row">
            <button class="nb" data-act="meal-dec" aria-label="Maaltijd eerder">−</button>
            <div class="nwrap">
              <input
                class="ninp ninp-time"
                data-id="meal"
                type="time"
                enterkeyhint="done"
                aria-label="Maaltijd-tijd"
                value="${view.meal === null ? "" : formatMeal(view.meal)}"
              >
            </div>
            <button class="nb" data-act="meal-inc" aria-label="Maaltijd later">+</button>
          </div>
        </div>
        <div class="row">
          <div class="lbl">Gewicht</div>
          <div class="num-row">
            <button class="nb" data-act="weight-dec" aria-label="Gewicht omlaag">−</button>
            <div class="nwrap">
              <input
                class="ninp"
                data-id="weight"
                type="text"
                inputmode="decimal"
                enterkeyhint="done"
                aria-label="Gewicht in kilogram"
                placeholder="—"
                value="${view.weight === null ? "" : view.weight.toFixed(1)}"
              >
              <div class="nunit">kg</div>
            </div>
            <button class="nb" data-act="weight-inc" aria-label="Gewicht omhoog">+</button>
          </div>
        </div>
        <div>
          <div class="lbl">Energie</div>
          <div class="dots">${energyDots(view.energy)}</div>
        </div>
      </div>
      ${
        prefs.length
          ? `<div class="sec-hd">Dag</div>
      <div class="card quiet">
        <div class="day-tags">${prefs.map((item) => dayTag(item)).join("")}</div>
      </div>`
          : ""
      }
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
      ${
        sociaal.length
          ? `<div class="sec-hd">Sociaal</div>${sociaal.map((item) => stofCard(item)).join("")}`
          : ""
      }
      ${
        pending.length
          ? `<div class="sec-hd">Niet gedaan</div>
      <div class="card">
        <div class="note" style="margin-top:0">Geen +1, Done of Skip. Korte reden.</div>
        ${pending.map((row) => missRow(row)).join("")}
      </div>`
          : ""
      }
      <div class="sec-hd">Vandaag</div>
      ${actions.map((item) => itemCard(item, view)).join("")}
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Niet in Vandaag. Terughalen laat het log staan.</div>
        ${later.map((item) => laterRow(item)).join("")}
        <button class="btn ghost later-add" data-nav="profiel">Eigen item</button>
      </div>
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
    root().innerHTML = `
      ${header}
      ${view.gearDown ? `<div class="banner hot">Lijf vraagt tempo omlaag. Etappe gaat niet omhoog.</div>` : ""}
      ${themeSection(snapshot.profile.themes, "Tik een suggestie of typ zelf. Geen vaste lijst. Later aan te passen.")}
      ${weekBlock(weekReview(snapshot.items, snapshot.events, todayISO(), reviewPrimaryId(snapshot.items)))}
      ${laterManageCard(laterParkedItems(snapshot.items), "Niet in Vandaag. Terughalen laat het log staan.")}
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
            <div class="lbl">Rem</div>
            <div class="val" style="font-size:1.1rem">${escapeHtml(vector.pace_constraint || "—")}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="lbl">Volgende actie</div>
        <div class="action-line">${escapeHtml(view.nextAction)}</div>
      </div>
      ${advanceBlock(view)}
      ${horizonNudge(snapshot)}
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
      ${ioCard()}
      ${state.error ? `<p class="error" style="padding:0 18px">${escapeHtml(state.error)}</p>` : ""}
      ${nav}`;
    return;
  }

  if (state.screen === "voortgang") {
    const progress = progressView(
      snapshot.items,
      snapshot.events,
      todayISO(),
      snapshot.vector.a,
      reviewPrimaryId(snapshot.items),
    );
    root().innerHTML = `
      ${header}
      ${weekBlock(progress.week)}
      <div class="sec-hd">Lijn</div>
      <div class="card">
        <div class="note" style="margin-top:0">Huidige deze week. Geen score.</div>
        ${progressLineSvg(progress.line.map((point) => point.current), todayISO(), progress.line)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Nu</div><div class="val">${fmt(view.current)}</div></div>
          <div><div class="lbl">Gedaan</div><div class="val">${progress.hits}</div></div>
        </div>
      </div>
      ${weightBlock(progress.weight)}
      ${state.error ? `<p class="error" style="padding:0 18px">${escapeHtml(state.error)}</p>` : ""}
      ${nav}`;
    return;
  }

  if (state.screen === "profiel") {
    const goals = snapshot.profile.goals ?? [];
    const age = snapshot.profile.age_band;
    const activeItems = laterActiveItems(snapshot.items);
    const parkedItems = laterParkedItems(snapshot.items);
    const loadNote = activeLoadNote(laterActiveLoadItems(snapshot.items).length);
    root().innerHTML = `
      ${header}
      <div class="sec-hd">Doelen</div>
      <div class="card">
        <div class="note" style="margin-top:0">Later aan te passen. Geen wipe.</div>
        <div class="chips">${GOALS.map(
          (goal) =>
            `<button class="chip pick ${goals.includes(goal.id) ? "on" : ""}" data-act="onboard-goal" data-goal="${goal.id}">${goal.label}</button>`,
        ).join("")}</div>
      </div>
      <div class="sec-hd">Leeftijd</div>
      <div class="card">
        <div class="note" style="margin-top:0">Alleen een band. Geen geboortedatum.</div>
        <div class="chips">${AGE_BANDS.map(
          (band) =>
            `<button class="chip pick ${age === band ? "on" : ""}" data-act="onboard-age" data-age="${band}">${band}</button>`,
        ).join("")}</div>
      </div>
      ${themeSection(snapshot.profile.themes, "Tik een suggestie of typ zelf. Later aan te passen.")}
      <div class="sec-hd">Nu</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">${loadNote ?? "In Vandaag. Parkeren laat het log staan."}</div>
        ${
          activeItems.length
            ? activeItems.map((item) => laterEditRow(item)).join("")
            : `<div class="note">Niets in Nu.</div>`
        }
      </div>
      ${laterManageCard(parkedItems, "Niet in Vandaag. Terughalen laat het log staan.")}
      ${ownItemsCard(snapshot.items)}
      ${addItemCard()}
      ${ioCard()}
      ${state.error ? `<p class="error" style="padding:0 18px">${escapeHtml(state.error)}</p>` : ""}
      ${nav}`;
    return;
  }
}

function clearConfirm(itemId: string): void {
  const timer = confirmTimers.get(itemId);
  if (timer) window.clearTimeout(timer);
  confirmTimers.delete(itemId);
  if (!(itemId in state.confirmBeats)) return;
  const next = { ...state.confirmBeats };
  delete next[itemId];
  state.confirmBeats = next;
}

function armConfirm(itemId: string): void {
  clearConfirm(itemId);
  state.confirmBeats = { ...state.confirmBeats, [itemId]: Date.now() };
  confirmTimers.set(
    itemId,
    window.setTimeout(() => {
      confirmTimers.delete(itemId);
      if (!(itemId in state.confirmBeats)) return;
      const next = { ...state.confirmBeats };
      delete next[itemId];
      state.confirmBeats = next;
      render();
    }, CONFIRM_BEAT_MS),
  );
}

function liveConfirm(item: Item) {
  const started = state.confirmBeats[item.id];
  if (!started) return null;
  const elapsed = Date.now() - started;
  if (elapsed >= CONFIRM_BEAT_MS) return null;
  const day = itemDay(item);
  const confirm = todayConfirm({
    plus: day.plus,
    done: day.done,
    skip: day.skip,
    type: item.type,
    track: hasCurrent(item),
  });
  if (!confirm) return null;
  return { confirm, elapsed };
}

function confirmClass(item: Item, beat: "check" | "fade"): string {
  const live = liveConfirm(item);
  if (!live || live.confirm.beat !== beat) return "";
  return ` beat-${beat}`;
}

function confirmMark(item: Item, beat: "check" | "fade"): string {
  const live = liveConfirm(item);
  if (!live || live.confirm.beat !== beat) return "";
  return ` data-confirm="${beat}" style="animation-delay:-${live.elapsed}ms"`;
}

function confirmStatus(item: Item): string {
  const live = liveConfirm(item);
  if (!live) return "";
  return `<span class="sr-only" role="status" data-confirm="${live.confirm.beat}">${escapeHtml(live.confirm.text)}</span>`;
}

function undoLine(item: Item): string {
  if (!snapshot) return "";
  const primary = primaryItem(snapshot.items);
  const action = todayActionEvent(eventsForItem(snapshot.events, item, primary?.id), todayISO());
  if (!action) return "";
  return `<button class="undo" type="button" data-act="undo" data-item="${item.id}">Ongedaan</button>`;
}

function afterAction(item: Item): string {
  return `${confirmStatus(item)}${undoLine(item)}`;
}

function stofCard(item: Item): string {
  const day = itemDay(item);
  const taken = day.logged || Boolean(day.skip);
  const doneLabel = item.type === "medicijn" ? "Genomen" : "Done";
  const note = timingNote(item);
  return `
      <div class="card stof">
        ${itemTitle(item)}
        ${note ? `<div class="note">${escapeHtml(note)}</div>` : ""}
        <div class="actions actions-two">
          <button class="btn ico-btn ${day.done ? "track" : ""}${confirmClass(item, "check")}" data-act="done" data-item="${item.id}" ${taken ? "disabled" : ""}${confirmMark(item, "check")}>${icon("done")}<span>${doneLabel}</span></button>
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
        ${wontNudge(day.skip)}
        ${afterAction(item)}
      </div>`;
}

function reasonChips(itemId: string, date: string, selected: string | null, act: "skip" | "miss"): string {
  return `<div class="chips">${SKIP_REASONS.map(
    (reason) =>
      `<button class="chip ${selected === reason ? "on" : ""}" data-act="${act}" data-item="${itemId}" data-date="${date}" data-reason="${reason}">${reason}</button>`,
  ).join("")}</div>`;
}

function missRow(row: ItemDay): string {
  const open = state.missKey === missKey(row.item.id, row.date) || Boolean(row.reason);
  return `
      <div class="miss-row">
        <button class="miss-item" data-act="miss-open" data-item="${row.item.id}" data-date="${row.date}">
          <span class="ex-nm">${escapeHtml(row.item.label)}</span>
          <span class="note">${row.reason ? escapeHtml(row.reason) : formatShort(row.date)}</span>
        </button>
        ${open ? reasonChips(row.item.id, row.date, row.reason, "miss") : ""}
      </div>`;
}

function weekCounts(view: WeekReview): string {
  const parts: string[] = [];
  if (view.hits) parts.push(`${view.hits} gedaan`);
  if (view.skips) parts.push(`${view.skips} overgeslagen`);
  if (view.misses) parts.push(`${view.misses} niet gedaan`);
  if (parts.length === 0) return "Nog geen dagen deze week.";
  return parts.join(" · ");
}

function weekMark(mark: WeekReview["days"][number]["mark"]): string {
  if (mark === "skip") return "–";
  if (mark === "miss") return "×";
  return "·";
}

function weekBlock(view: WeekReview): string {
  return `
      <div class="sec-hd">Week</div>
      <div class="card">
        <div class="note" style="margin-top:0">${escapeHtml(view.range)}</div>
        <div class="week-strip" aria-label="Weekoverzicht">
          ${view.days
            .map(
              (day) =>
                `<div class="week-day ${day.mark}${day.date === todayISO() ? " today" : ""}">
            <span class="week-lbl">${day.label}</span>
            <span class="week-mark">${weekMark(day.mark)}</span>
          </div>`,
            )
            .join("")}
        </div>
        <div class="note">${escapeHtml(weekCounts(view))}</div>
        ${view.note ? `<div class="week-note">${escapeHtml(view.note)}</div>` : ""}
        ${
          view.missRows.length
            ? view.missRows.map((row) => missRow(row)).join("")
            : ""
        }
      </div>`;
}

function canOpenDetail(item: Item): boolean {
  return hasTemplate(item) || isUserAddedItem(item) || isWeeklyItem(item);
}

function laterName(item: Item): string {
  if (canOpenDetail(item)) {
    return `<button class="ex-nm tap" data-act="detail-open" data-item="${item.id}">${escapeHtml(item.label)}</button>`;
  }
  return `<div class="ex-nm">${escapeHtml(item.label)}</div>`;
}

function weekdayEditor(item: Item): string {
  if (!isWeeklyItem(item)) return "";
  const days = item.weekdays ?? [];
  return `
      <div class="weekday-edit">
        <div class="lbl">Dagen</div>
        <div class="chips weekday-chips">
          ${WEEKDAYS.map(
            (day) =>
              `<button class="chip pick ${days.includes(day.iso) ? "on" : ""}" data-act="weekday-toggle" data-item="${item.id}" data-day="${day.iso}">${day.short}</button>`,
          ).join("")}
        </div>
        <div class="note">${days.length ? "Alleen op die dagen." : "Leeg = niet op Vandaag."}</div>
      </div>`;
}

function laterRow(item: Item): string {
  return `
      <div class="later-block">
        <div class="later-row">
          ${laterName(item)}
          <button class="btn ghost later-now" data-act="later-now" data-item="${item.id}">Nu</button>
        </div>
        ${weekdayEditor(item)}
      </div>`;
}

function laterManageCard(parked: Item[], note: string): string {
  return `
      <div class="sec-hd">Later</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">${escapeHtml(note)}</div>
        ${
          parked.length
            ? parked.map((item) => laterRow(item)).join("")
            : `<div class="note">Niets in Later.</div>`
        }
      </div>`;
}

function laterEditRow(item: Item): string {
  const parked = item.later;
  const days = formatWeekdays(item.weekdays);
  const place = parked ? "Later" : "Nu";
  return `
      <div class="later-block">
        <div class="later-row">
          <div>
            ${laterName(item)}
            <div class="note" style="margin-top:4px">${place}${days ? ` · ${escapeHtml(days)}` : ""}</div>
          </div>
          <button class="btn ghost later-now" data-act="${parked ? "later-now" : "later-park"}" data-item="${item.id}">${parked ? "Nu" : "Later"}</button>
        </div>
        ${weekdayEditor(item)}
      </div>`;
}

function ownItemRow(item: Item): string {
  const kind = USER_ITEM_KIND_LABEL[kindFromItem(item)];
  const when = timingInputValue(item);
  return `
      <div class="later-row">
        <div>
          <button class="ex-nm tap" data-act="detail-open" data-item="${item.id}">${escapeHtml(item.label)}</button>
          <div class="note" style="margin-top:4px">${escapeHtml(kind)}${when ? ` · ${escapeHtml(when)}` : ""}</div>
        </div>
        <button class="btn ghost later-now" data-act="detail-open" data-item="${item.id}">Wijzig</button>
      </div>`;
}

function ownItemsCard(items: Item[]): string {
  const own = userAddedItems(items);
  if (own.length === 0) return "";
  return `
      <div class="sec-hd">Eigen items</div>
      <div class="card later-box">
        <div class="note" style="margin-top:0">Label, type of tijd. Weg haalt het uit Vandaag. Log blijft.</div>
        ${own.map((item) => ownItemRow(item)).join("")}
      </div>`;
}

function wontNudge(skipToday: ReturnType<typeof itemDay>["skip"]): string {
  if (!snapshot) return "";
  const line = identityNudgeOnSkip(snapshot.profile.identity_new, snapshot.events, skipToday);
  if (!line) return "";
  return `<div class="nudge">${escapeHtml(line)}</div>`;
}

function horizonNudge(snap: Snapshot): string {
  const line = horizonLine(snap.profile.horizon_1y, snap.rotated);
  if (!line) return "";
  return `<div class="nudge-line">${escapeHtml(line)}</div>`;
}

function constraintCheck(next: number | null): string {
  if (!snapshot || !wouldBreakConstraint(snapshot.profile.identity_constraint, next)) return "";
  const line = constraintLine(snapshot.profile.identity_constraint);
  if (!line) return "";
  return `<div class="check">${escapeHtml(line)}</div>`;
}

function advanceControls(view: ReturnType<typeof loop>): string {
  if (!view.suggestedMilestone) return "";
  const next = fmt(view.suggestedMilestone);
  const warn =
    state.advanceWarn && wouldBreakConstraint(snapshot!.profile.identity_constraint, view.suggestedMilestone);
  return `
        <div class="note" style="margin-top:0">Etappe gehaald. Niet automatisch verder. Voorstel: ${next}.</div>
        ${warn ? constraintCheck(view.suggestedMilestone) : ""}
        ${
          warn
            ? `<div class="stack" style="margin-top:10px">
                 <button class="btn primary" data-act="advance-go">Volgende etappe ${next}</button>
                 <button class="btn ghost" data-act="advance-cancel">Niet nu</button>
               </div>`
            : `<div class="stack" style="margin-top:10px">
                 <button class="btn primary" data-act="advance" data-n="${view.suggestedMilestone}">Volgende etappe ${next}</button>
               </div>`
        }`;
}

function advanceBlock(view: ReturnType<typeof loop>): string {
  if (!view.suggestedMilestone) return "";
  return `
      <div class="card">
        ${advanceControls(view)}
      </div>`;
}

function ioCard(): string {
  return `
      <div class="card stack io-card">
        <button class="btn ghost ico-btn" data-act="export">${icon("export")}<span>Exporteer JSON</span></button>
        <div class="note" style="margin-top:4px">Voegt toe. Bestaande rijen blijven.</div>
        <button class="btn ghost ico-btn" data-act="import-pick">${icon("import")}<span>Kies bestand</span></button>
        <input data-id="import-file" class="import-file" type="file" accept="application/json,.json" />
        <div class="field">
          <div class="lbl">Of plak JSON</div>
          <textarea data-id="import-paste" placeholder='{"key":"routine_loop_v6"}'>${escapeHtml(state.importPaste)}</textarea>
        </div>
        <button class="btn ghost ico-btn" data-act="import-go">${icon("import")}<span>Importeer JSON</span></button>
      </div>`;
}

function addItemCard(): string {
  return `
      <div class="sec-hd">Eigen item</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Label, type, optioneel tijdstip. Geen dosis. Bestaande items blijven.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="item-label" type="text" maxlength="${ITEM_LABEL_LIMIT}" placeholder="Bijv. Avondwandeling" autocomplete="off" enterkeyhint="done" value="${escapeHtml(state.addLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${USER_ITEM_KINDS.map(
          (kind) =>
            `<button class="chip pick ${state.addKind === kind ? "on" : ""}" data-act="item-kind" data-kind="${kind}">${USER_ITEM_KIND_LABEL[kind]}</button>`,
        ).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="item-timing" type="text" maxlength="${ITEM_TIMING_LIMIT}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${escapeHtml(state.addTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-add">Voeg toe</button>
        </div>
      </div>`;
}

function weightRangeNote(points: WeightPoint[]): string {
  if (points.length === 0) return "";
  const first = formatShort(points[0].date);
  const last = formatShort(points[points.length - 1].date);
  return first === last ? first : `${first} – ${last}`;
}

function weightLineSvg(points: WeightPoint[]): string {
  const width = 294;
  const height = 72;
  const dots = lineDots(
    points.map((point) => point.kg),
    width,
    height,
  );
  if (dots.length === 0) return "";
  const last = dots.length - 1;
  const marks = dots
    .map((dot, i) => {
      const now = i === last;
      return `<circle class="${now ? "prog-dot now" : "prog-dot"}" cx="${dot.x.toFixed(1)}" cy="${dot.y.toFixed(1)}" r="${now ? 3.2 : 2.2}" />`;
    })
    .join("");
  return `
        <svg class="prog-line" viewBox="0 0 ${width} ${height}" aria-hidden="true">
          <polyline class="prog-path" points="${linePointsAttr(dots)}" />
          ${marks}
        </svg>`;
}

/** Silent when there are no kg points. No BMI, no goal, no ask. */
function weightBlock(points: WeightPoint[]): string {
  if (points.length === 0) return "";
  const last = points[points.length - 1];
  return `
      <div class="sec-hd">Gewicht</div>
      <div class="card">
        <div class="note" style="margin-top:0">${escapeHtml(weightRangeNote(points))}</div>
        ${weightLineSvg(points)}
        <div class="kv" style="margin-top:12px">
          <div><div class="lbl">Laatst</div><div class="val">${last.kg.toFixed(1)} kg</div></div>
        </div>
      </div>`;
}

function progressLineSvg(
  values: number[],
  today: string,
  points: { date: string; mark: string }[],
): string {
  const width = 294;
  const height = 72;
  const dots = lineDots(values, width, height);
  if (dots.length === 0) return `<div class="note">Nog geen lijn.</div>`;
  const marks = dots
    .map((dot, i) => {
      const todayDot = points[i]?.date === today;
      const miss = points[i]?.mark === "miss";
      const cls = miss ? "prog-dot miss" : todayDot ? "prog-dot now" : "prog-dot";
      return `<circle class="${cls}" cx="${dot.x.toFixed(1)}" cy="${dot.y.toFixed(1)}" r="${todayDot ? 3.2 : 2.2}" />`;
    })
    .join("");
  return `
        <svg class="prog-line" viewBox="0 0 ${width} ${height}" aria-hidden="true">
          <polyline class="prog-path" points="${linePointsAttr(dots)}" />
          ${marks}
        </svg>`;
}

function themeSection(themes: unknown, note: string): string {
  return `
      <section class="theme-sec" data-sec="themes">
        <div class="sec-hd">Thema's</div>
        <div class="card">
          <div class="ex-nm">Trainingsrichting</div>
          <div class="note">${escapeHtml(note)}</div>
          ${themePickerHtml(themes)}
        </div>
      </section>`;
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
        <div class="note">Eerst doelen. Types (gedrag, regel, medicijn, supplement, sociaal) komen daarna.</div>
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
        ${themePickerHtml(themes)}
        <div class="stack" style="margin-top:16px">
          <button class="btn primary" data-act="onboard-themes-done">Verder</button>
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

function itemTitle(item: Item): string {
  if (!canOpenDetail(item)) {
    return `<div class="ex-nm">${escapeHtml(item.label)}</div>`;
  }
  return `<button class="ex-nm tap" data-act="detail-open" data-item="${item.id}">${escapeHtml(item.label)}</button>`;
}

function dayTag(item: Item): string {
  return `<button class="chip pick" data-act="detail-open" data-item="${item.id}">${escapeHtml(item.label)}</button>`;
}

function detailView(item: Item): string {
  const template = defaultTemplate(item);
  const note = timingNote(item);
  const window = windowNote(item.timing);
  const cond = conditionNote(item.timing);
  const work = formatWork(item);
  const pref = isPreference(item);
  const rule = isConstraint(item);
  const own = isUserAddedItem(item);
  return `
      <button class="btn ghost detail-back" data-act="detail-close">Terug</button>
      <div class="sec-hd">Detail</div>
      <div class="card">
        <div class="ex-nm">${escapeHtml(item.label)}</div>
        ${window ? `<div class="note">${escapeHtml(window)}</div>` : ""}
        ${cond ? `<div class="note">${escapeHtml(cond)}</div>` : ""}
        ${note && !cond ? `<div class="note">${escapeHtml(note)}</div>` : ""}
        ${work ? `<div class="work">${escapeHtml(work)}</div>` : ""}
        ${pref ? `<div class="note">Voorkeur. Geen regel.</div>` : ""}
        ${rule && !note && !window && !cond ? `<div class="note">Regel. Geen afvinken.</div>` : ""}
        ${afterAction(item)}
        ${weekdayEditor(item)}
      </div>
      ${
        template
          ? `<div class="sec-hd">Bron</div>
      <div class="card quiet">
        <div class="src-tag">${escapeHtml(template)}</div>
      </div>`
          : ""
      }
      ${own ? ownLaterCard(item) : seedParkCard(item)}
      ${own ? editItemCard() : ""}`;
}

function editItemCard(): string {
  return `
      <div class="sec-hd">Wijzig</div>
      <div class="card add-item">
        <div class="note" style="margin-top:0">Zelfde item. Geen dosis. Log blijft.</div>
        <div class="field">
          <div class="lbl">Naam</div>
          <input data-id="edit-label" type="text" maxlength="${ITEM_LABEL_LIMIT}" placeholder="Naam" autocomplete="off" enterkeyhint="done" value="${escapeHtml(state.editLabel)}" />
        </div>
        <div class="lbl">Type</div>
        <div class="chips">${USER_ITEM_KINDS.map(
          (kind) =>
            `<button class="chip pick ${state.editKind === kind ? "on" : ""}" data-act="edit-kind" data-kind="${kind}">${USER_ITEM_KIND_LABEL[kind]}</button>`,
        ).join("")}</div>
        <div class="field" style="margin-top:12px">
          <div class="lbl">Tijd</div>
          <input data-id="edit-timing" type="text" maxlength="${ITEM_TIMING_LIMIT}" placeholder="22:00 of ochtend" autocomplete="off" enterkeyhint="done" value="${escapeHtml(state.editTiming)}" />
        </div>
        <div class="stack">
          <button class="btn primary" data-act="item-save">Bewaar</button>
          ${
            state.removeAsk
              ? `<div class="note">Weg uit Vandaag. Log blijft.</div>
          <button class="btn primary" data-act="item-remove">Bevestig</button>
          <button class="btn ghost" data-act="item-remove-cancel">Niet nu</button>`
              : `<button class="btn ghost" data-act="item-remove-ask">Weg</button>`
          }
        </div>
      </div>`;
}

function ownLaterCard(item: Item): string {
  if (item.later) {
    return `
      <div class="card quiet">
        <div class="note" style="margin-top:0">In Later. Weg is apart. Log blijft.</div>
        <div class="stack">
          <button class="btn ghost" data-act="later-now" data-item="${item.id}">Nu</button>
        </div>
      </div>`;
  }
  return `
      <div class="card quiet">
        <div class="note" style="margin-top:0">Parkeren haalt het uit Vandaag. Weg is apart. Log blijft.</div>
        <div class="stack">
          <button class="btn ghost" data-act="later-park" data-item="${item.id}">Naar Later</button>
        </div>
      </div>`;
}

function seedParkCard(item: Item): string {
  if (!isSeedSuggestion(item)) return "";
  if (item.later) {
    return `
      <div class="card quiet">
        <div class="note" style="margin-top:0">Suggestie in Later. Niet wissen.</div>
        <div class="stack">
          <button class="btn ghost" data-act="later-now" data-item="${item.id}">Nu</button>
        </div>
      </div>`;
  }
  return `
      <div class="card quiet">
        <div class="note" style="margin-top:0">Suggestie. Niet wissen, wel parkeren.</div>
        <div class="stack">
          <button class="btn ghost" data-act="later-park" data-item="${item.id}">Naar Later</button>
        </div>
      </div>`;
}

function ruleLine(item: Item): string {
  const note = timingNote(item);
  return `
      <div class="card quiet">
        ${itemTitle(item)}
        ${note ? `<div class="note">${escapeHtml(note)}</div>` : `<div class="note">Regel. Geen afvinken.</div>`}
      </div>`;
}

function itemCard(
  item: Item,
  view: ReturnType<typeof loop>,
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
        ${itemTitle(item)}
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
              ? `<button class="btn ico-btn ${day.plus ? "on" : ""}${confirmClass(item, "fade")}" data-act="plus" data-item="${item.id}" ${plusBlocked ? "disabled" : ""}${confirmMark(item, "fade")}>${icon("plus")}<span>+1</span></button>`
              : ""
          }
          <button class="btn ico-btn ${day.done ? "track" : ""}${confirmClass(item, "check")}" data-act="done" data-item="${item.id}" ${setTaken ? "disabled" : ""}${confirmMark(item, "check")}>${icon("done")}<span>Done</span></button>
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
        ${afterAction(item)}
        ${showAdvance ? advanceControls(view) : ""}
        ${wontNudge(day.skip)}
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
    if (!(el instanceof HTMLInputElement)) return;
    if (el.dataset.id === "theme-custom") {
      event.preventDefault();
      void persistCustomTheme();
      return;
    }
    if (el.dataset.id === "item-label" || el.dataset.id === "item-timing") {
      event.preventDefault();
      void persistCustomItem();
      return;
    }
    if (el.dataset.id === "edit-label" || el.dataset.id === "edit-timing") {
      event.preventDefault();
      void persistEditItem();
      return;
    }
    if (el.dataset.id === "weight") {
      event.preventDefault();
      void persistWeightInput(el.value);
      return;
    }
    if (el.dataset.id === "wake") {
      event.preventDefault();
      void persistWakeInput(el.value);
      return;
    }
    if (el.dataset.id === "meal") {
      event.preventDefault();
      void persistMealInput(el.value);
    }
  });

  document.addEventListener("change", (event) => {
    const el = event.target as HTMLElement;
    if (!(el instanceof HTMLInputElement)) return;
    if (el.dataset.id === "weight") {
      void persistWeightInput(el.value);
    }
    if (el.dataset.id === "wake") {
      void persistWakeInput(el.value);
    }
    if (el.dataset.id === "meal") {
      void persistMealInput(el.value);
    }
    if (el.dataset.id === "import-file" && el.files?.[0]) {
      const file = el.files[0];
      el.value = "";
      void file.text().then((text) => runImport(text));
    }
  });

  document.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-act], [data-nav]");
    if (!target) return;
    const nav = target.dataset.nav;
    if (isScreen(nav)) {
      state.screen = nav;
      state.skipItemId = null;
      state.missKey = null;
      state.detailItemId = null;
      state.advanceWarn = false;
      state.error = null;
      render();
      return;
    }
    void handleAction(target);
  });
}

async function handleAction(target: HTMLElement): Promise<void> {
  const act = target.dataset.act;
  if (!act) return;

  const importDraft = valueOf("import-paste");
  if (importDraft !== null) state.importPaste = importDraft;

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

  if (act === "weight-inc" || act === "weight-dec") {
    const next = nudgeWeight(
      view.weight,
      lastWeight(snapshot.events),
      act === "weight-inc" ? 0.1 : -0.1,
    );
    if (view.weight === next) return;
    await persistEvent({ date: today, kind: "body_weight", value: next, skip_reason: null, item_id: null });
    return;
  }

  if (act === "wake-inc" || act === "wake-dec") {
    const next = nudgeWake(
      view.wake,
      lastWake(snapshot.events),
      act === "wake-inc" ? 15 : -15,
    );
    if (view.wake === next) return;
    await persistEvent({ date: today, kind: "body_wake", value: next, skip_reason: null, item_id: null });
    return;
  }

  if (act === "meal-inc" || act === "meal-dec") {
    const next = nudgeMeal(
      view.meal,
      lastMeal(snapshot.events),
      act === "meal-inc" ? 15 : -15,
    );
    if (view.meal === next) return;
    await persistEvent({ date: today, kind: "body_meal", value: next, skip_reason: null, item_id: null });
    return;
  }

  if (act === "plus") {
    const item = snapshot.items.find((row) => row.id === target.dataset.item);
    if (!item || !hasCurrent(item)) return;
    const day = itemDay(item);
    if (day.logged || day.skip || (item.b !== null && day.current !== null && day.current >= item.b)) {
      return;
    }
    await persistEvent(
      {
        date: today,
        kind: "set",
        value: (day.current ?? item.a ?? 0) + 1,
        skip_reason: null,
        item_id: item.id,
      },
      item.id,
    );
    return;
  }

  if (act === "done") {
    const item = snapshot.items.find((row) => row.id === target.dataset.item);
    if (!item) return;
    const day = itemDay(item);
    if (day.logged || day.skip) return;
    await persistEvent(
      {
        date: today,
        kind: "done",
        value: day.current ?? item.a,
        skip_reason: null,
        item_id: item.id,
      },
      item.id,
    );
    return;
  }

  if (act === "detail-open") {
    const itemId = target.dataset.item ?? null;
    const item = itemId ? snapshot.items.find((row) => row.id === itemId) : undefined;
    if (!item) return;
    hydrateEdit(item);
    state.detailItemId = item.id;
    render();
    return;
  }

  if (act === "detail-close") {
    state.detailItemId = null;
    render();
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
    if (!isSkipReason(reason)) return;
    await persistEvent({
      date: today,
      kind: "skip",
      value: null,
      skip_reason: reason,
      item_id: item.id,
    });
    state.skipItemId = null;
    return;
  }

  if (act === "undo") {
    const item = snapshot.items.find((row) => row.id === target.dataset.item);
    if (!item) return;
    const primary = primaryItem(snapshot.items);
    const action = todayActionEvent(eventsForItem(snapshot.events, item, primary?.id), today);
    if (!action) return;
    clearConfirm(item.id);
    await persistUndo(action.id);
    state.skipItemId = null;
    return;
  }

  if (act === "miss-open") {
    const itemId = target.dataset.item;
    const date = target.dataset.date;
    if (!itemId || !date) return;
    const key = missKey(itemId, date);
    state.missKey = state.missKey === key ? null : key;
    render();
    return;
  }

  if (act === "miss") {
    const item = snapshot.items.find((row) => row.id === target.dataset.item);
    const date = target.dataset.date;
    const reason = target.dataset.reason;
    if (!item || !date || date >= today || !isSkipReason(reason)) return;
    const day = itemDay(item, date);
    if (day.logged || day.skip) return;
    await persistEvent({
      date,
      kind: "miss",
      value: null,
      skip_reason: reason,
      item_id: item.id,
    });
    state.missKey = null;
    return;
  }

  if (act === "advance") {
    if (!view.suggestedMilestone) return;
    if (wouldBreakConstraint(snapshot.profile.identity_constraint, view.suggestedMilestone) && !state.advanceWarn) {
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
    await persistThemeList(toggleTheme(normalizeThemes(snapshot.profile.themes), label));
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
    render();
    return;
  }

  if (act === "onboard-themes-done") {
    await persistThemeList(snapshot.profile.themes ?? [], true);
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

  if (act === "later-now" || act === "later-park") {
    const id = target.dataset.item;
    if (!id) return;
    await withBusy(async () => {
      await store!.setItemLater(id, act === "later-park");
      snapshot = await store!.load();
    });
    return;
  }

  if (act === "weekday-toggle") {
    const id = target.dataset.item;
    const day = Number(target.dataset.day);
    if (!id || !Number.isInteger(day)) return;
    await withBusy(async () => {
      await store!.toggleItemWeekday(id, day);
      snapshot = await store!.load();
    });
    return;
  }

  if (act === "item-kind") {
    const kind = target.dataset.kind;
    if (!isUserItemKind(kind)) return;
    rememberAddDraft();
    state.addKind = kind;
    render();
    return;
  }

  if (act === "item-add") {
    await persistCustomItem();
    return;
  }

  if (act === "edit-kind") {
    const kind = target.dataset.kind;
    if (!isUserItemKind(kind)) return;
    rememberEditDraft();
    state.editKind = kind;
    render();
    return;
  }

  if (act === "item-save") {
    await persistEditItem();
    return;
  }

  if (act === "item-remove-ask") {
    rememberEditDraft();
    state.removeAsk = true;
    render();
    return;
  }

  if (act === "item-remove-cancel") {
    state.removeAsk = false;
    render();
    return;
  }

  if (act === "item-remove") {
    const id = state.detailItemId;
    if (!id) return;
    await withBusy(async () => {
      await store!.removeItem(id);
      snapshot = await store!.load();
      state.detailItemId = null;
      state.removeAsk = false;
      state.screen = "profiel";
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

  if (act === "import-pick") {
    document.querySelector<HTMLInputElement>("[data-id=import-file]")?.click();
    return;
  }

  if (act === "import-go") {
    await runImport(state.importPaste);
    return;
  }
}

async function runImport(raw: string): Promise<void> {
  const text = raw.trim();
  if (!text) {
    state.error = IMPORT_ERROR;
    render();
    return;
  }
  await withBusy(async () => {
    snapshot = await store!.importJson(text);
    state.importPaste = "";
  });
}

function rememberAddDraft(): void {
  state.addLabel = valueOf("item-label") ?? state.addLabel;
  state.addTiming = valueOf("item-timing") ?? state.addTiming;
}

function rememberEditDraft(): void {
  state.editLabel = valueOf("edit-label") ?? state.editLabel;
  state.editTiming = valueOf("edit-timing") ?? state.editTiming;
}

function hydrateEdit(item: Item): void {
  state.editLabel = item.label;
  state.editKind = kindFromItem(item);
  state.editTiming = timingInputValue(item);
  state.removeAsk = false;
}

async function persistEditItem(): Promise<void> {
  if (!store || !snapshot || !state.detailItemId) return;
  rememberEditDraft();
  await withBusy(async () => {
    const item = await store!.updateItem({
      id: state.detailItemId!,
      label: state.editLabel,
      kind: state.editKind,
      timing: state.editTiming,
    });
    snapshot = await store!.load();
    hydrateEdit(item);
    state.detailItemId = item.id;
  });
}

async function persistCustomItem(): Promise<void> {
  if (!store || !snapshot) return;
  rememberAddDraft();
  await withBusy(async () => {
    await store!.addItem({
      label: state.addLabel,
      kind: state.addKind,
      timing: state.addTiming,
    });
    snapshot = await store!.load();
    state.addLabel = "";
    state.addTiming = "";
  });
}

async function persistCustomTheme(): Promise<void> {
  if (!snapshot) return;
  const raw = valueOf("theme-custom") ?? "";
  const current = normalizeThemes(snapshot.profile.themes);
  const next = addTheme(current, raw);
  if (next.length === current.length && next.every((theme, i) => theme === current[i])) return;
  await persistThemeList(next);
}

async function persistThemeList(themes: string[], markStep = false): Promise<void> {
  if (!store || !snapshot) return;
    const clean = normalizeThemes(themes);
    const profile = { ...snapshot.profile, themes: clean };
    const finish = markStep || !needsOnboarding(snapshot);
    await withBusy(async () => {
      if (finish) {
        await store!.saveThemes(clean);
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
  confirmItemId?: string,
): Promise<void> {
  await withBusy(async () => {
    const event = await store!.addEvent(input);
    snapshot!.events.push(event);
    if (confirmItemId) armConfirm(confirmItemId);
  });
}

async function persistUndo(eventId: string): Promise<void> {
  await withBusy(async () => {
    await store!.removeEvent(eventId);
    snapshot!.events = snapshot!.events.filter((event) => event.id !== eventId);
  });
}

async function persistWeightInput(raw: string): Promise<void> {
  if (!store || !snapshot) return;
  const value = parseWeight(raw);
  if (value === null) return;
  if (loop().weight === value) return;
  await persistEvent({
    date: todayISO(),
    kind: "body_weight",
    value,
    skip_reason: null,
    item_id: null,
  });
}

async function persistWakeInput(raw: string): Promise<void> {
  if (!store || !snapshot) return;
  const value = parseWake(raw);
  if (value === null) return;
  if (loop().wake === value) return;
  await persistEvent({
    date: todayISO(),
    kind: "body_wake",
    value,
    skip_reason: null,
    item_id: null,
  });
}

async function persistMealInput(raw: string): Promise<void> {
  if (!store || !snapshot) return;
  const value = parseMeal(raw);
  if (value === null) return;
  if (loop().meal === value) return;
  await persistEvent({
    date: todayISO(),
    kind: "body_meal",
    value,
    skip_reason: null,
    item_id: null,
  });
}
