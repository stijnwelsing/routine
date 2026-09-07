import { isoWeekday, parseISO } from "./dates";
import type { Item, ItemRole, Timing, TimingAnchor, TimingContext, TimingPhase } from "./types";

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
  return item.role === "constraint";
}

export function isAction(item: Item): boolean {
  return item.role !== "constraint";
}

export function timingPhase(item: Item, ctx: TimingContext): TimingPhase {
  if (isConstraint(item)) return "silent";
  if (!dueByFrequency(item, ctx.today)) return "hidden";
  const timing = item.timing;
  if (!timing.mode) return "due";
  const open = opensAt(timing, ctx);
  if (timing.mode === "relative" && !open) return "due";
  if (open && ctx.now < open) return "wait";
  const close = closesAt(timing, open);
  if (close && ctx.now > close) return "closed";
  return "due";
}

export function timingNote(item: Item): string | null {
  const timing = item.timing;
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
  if (item.label.trim().toLowerCase() === "low carb") return "preference";
  return null;
}
