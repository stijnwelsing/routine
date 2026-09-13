import { isoWeekday, parseISO } from "./dates";
import type { Item, ItemRole, Timing, TimingAnchor, TimingContext, TimingPhase } from "./types";

export type ConditionGate = "body" | "energy" | "sleep";

export function emptyTiming(): Timing {
  return {
    mode: null,
    clock: null,
    anchor: null,
    offset_min: null,
    window_min: null,
    frequency: null,
    condition: null,
  };
}

/** Old snapshots have no timing object. Missing fields stay null. */
export function normalizeTiming(raw: Partial<Timing> | null | undefined): Timing {
  return {
    mode: raw?.mode ?? null,
    clock: raw?.clock ?? null,
    anchor: raw?.anchor ?? null,
    offset_min: raw?.offset_min ?? null,
    window_min: raw?.window_min ?? null,
    frequency: raw?.frequency ?? null,
    condition: raw?.condition ?? null,
  };
}

function labelKey(label: string): string {
  return label.trim().toLowerCase().normalize("NFC");
}

/** Lock window + condition on one seed label. Never rewrite other rows. */
export function lockedTiming(label: string): Partial<Timing> | null {
  if (labelKey(label) === "korte rust") {
    return {
      mode: "clock",
      clock: "08:00",
      window_min: 840,
      frequency: "daily",
      condition: "body",
    };
  }
  return null;
}

/** Fill lock timing on leftover rows with that label. */
export function applyLockedTiming(timing: Timing, label: string): Timing {
  const lock = lockedTiming(label);
  if (!lock) return timing;
  return { ...timing, ...lock };
}

export function timingContext(partial: Partial<TimingContext> & Pick<TimingContext, "today">): TimingContext {
  return {
    now: partial.now ?? new Date(),
    today: partial.today,
    wakeAt: partial.wakeAt ?? null,
    mealAt: partial.mealAt ?? null,
    sleepSet: Boolean(partial.sleepSet),
    energySet: Boolean(partial.energySet),
  };
}

export function conditionGate(condition: string | null | undefined): ConditionGate | null {
  const key = condition?.trim().toLowerCase();
  if (key === "body" || key === "energy|sleep") return "body";
  if (key === "energy") return "energy";
  if (key === "sleep") return "sleep";
  return null;
}

export function conditionMet(timing: Timing, ctx: TimingContext): boolean {
  const gate = conditionGate(timing.condition);
  if (!gate) return true;
  const sleep = Boolean(ctx.sleepSet);
  const energy = Boolean(ctx.energySet);
  if (gate === "energy") return energy;
  if (gate === "sleep") return sleep;
  return sleep || energy;
}

export function clockOnDay(today: string, clock: string): Date | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(clock);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  const date = parseISO(today);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function anchorTime(anchor: TimingAnchor, ctx: TimingContext): Date | null {
  if (anchor === "wake") return ctx.wakeAt;
  if (anchor === "meal") return ctx.mealAt;
  return null;
}

export function opensAt(timing: Timing, ctx: TimingContext): Date | null {
  if (timing.mode === "clock" && timing.clock) {
    return clockOnDay(ctx.today, timing.clock);
  }
  if (timing.mode === "relative" && timing.anchor && timing.offset_min !== null) {
    const base = anchorTime(timing.anchor, ctx);
    if (!base) return null;
    return new Date(base.getTime() + timing.offset_min * 60_000);
  }
  return null;
}

export function closesAt(timing: Timing, open: Date | null): Date | null {
  if (!open || timing.window_min === null) return null;
  return new Date(open.getTime() + timing.window_min * 60_000);
}

export function dueByFrequency(item: Item, today: string): boolean {
  const weekly = item.timing.frequency === "weekly" || item.type === "weekly";
  if (weekly) {
    const days = item.weekdays ?? [];
    if (days.length === 0) return false;
    return days.includes(isoWeekday(today));
  }
  return true;
}

export function isConstraint(item: Item): boolean {
  return defaultRole(item) === "constraint";
}

export function isPreference(item: Pick<Item, "role" | "label">): boolean {
  return defaultRole(item) === "preference";
}

export function isAction(item: Item): boolean {
  return !isConstraint(item) && !isPreference(item);
}

export function timingPhase(item: Item, ctx: TimingContext): TimingPhase {
  if (isConstraint(item)) return "silent";
  if (!dueByFrequency(item, ctx.today)) return "hidden";
  if (!conditionMet(item.timing, ctx)) return "hidden";
  const timing = item.timing;
  if (!timing.mode) return "due";
  const open = opensAt(timing, ctx);
  if (timing.mode === "relative" && !open) return "due";
  if (open && ctx.now < open) return "wait";
  const close = closesAt(timing, open);
  if (close && ctx.now > close) return "closed";
  return "due";
}

/** Today stays quiet: hide when not relevant. Clock-only wait stays visible. */
export function isVisibleToday(item: Item, ctx: TimingContext): boolean {
  const phase = timingPhase(item, ctx);
  if (phase === "hidden" || phase === "closed") return false;
  if (phase === "wait" && item.timing.window_min !== null) return false;
  return true;
}

function formatClock(date: Date): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

/** Detail only. Today does not show the window. */
export function windowNote(timing: Timing): string | null {
  if (timing.window_min === null) return null;
  if (timing.mode === "clock" && timing.clock) {
    const open = clockOnDay("2000-01-01", timing.clock);
    if (!open) return null;
    const close = closesAt(timing, open);
    if (!close) return null;
    return `${formatClock(open)}–${formatClock(close)}`;
  }
  return `${timing.window_min} min`;
}

/** Detail only. Structured gates stay off the Today list. */
export function conditionNote(timing: Timing): string | null {
  const gate = conditionGate(timing.condition);
  if (gate === "body") return "na slaap of energie";
  if (gate === "energy") return "na energie";
  if (gate === "sleep") return "na slaap";
  return null;
}

export function timingNote(item: Item): string | null {
  const timing = item.timing;
  if (conditionGate(timing.condition)) return null;
  if (timing.condition) return timing.condition;
  if (timing.mode === "relative" && timing.anchor === "wake" && timing.offset_min !== null) {
    return `${timing.offset_min} min na opstaan`;
  }
  if (timing.mode === "relative" && timing.anchor === "meal") return "na eten";
  if (timing.mode === "clock" && timing.clock) return timing.clock;
  return null;
}

export function defaultRole(item: Pick<Item, "role" | "label">): ItemRole | null {
  if (item.role) return item.role;
  const key = labelKey(item.label);
  if (key === "low carb") return "preference";
  if (key === "cafeïne 90 min na opstaan") return "constraint";
  if (key === "scherm uit 22:00") return "constraint";
  return null;
}
