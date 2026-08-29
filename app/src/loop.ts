import { addDays, daysBetween, eachDay, mondayOfWeek } from "./dates";
import type { LogEvent, LoopView, SkipReason, Stage, Vector } from "./types";

const ENERGY_LOW = 2;
const SLEEP_FLOOR = 6;

function byCreated(a: LogEvent, b: LogEvent): number {
  return a.created_at.localeCompare(b.created_at);
}

function latestOf(events: LogEvent[], date: string, kind: LogEvent["kind"]): LogEvent | undefined {
  return events
    .filter((event) => event.date === date && event.kind === kind)
    .sort(byCreated)
    .at(-1);
}

export function computeCurrent(a: number, events: LogEvent[]): number {
  const lastSet = events.filter((event) => event.kind === "set").sort(byCreated).at(-1);
  return lastSet?.value ?? a;
}

export function todaySleep(events: LogEvent[], today: string): number | null {
  return latestOf(events, today, "body_sleep")?.value ?? null;
}

export function todayEnergy(events: LogEvent[], today: string): number | null {
  return latestOf(events, today, "body_energy")?.value ?? null;
}

export function todaySkip(events: LogEvent[], today: string): SkipReason | null {
  return latestOf(events, today, "skip")?.skip_reason ?? null;
}

export function todayDone(events: LogEvent[], today: string): boolean {
  return Boolean(latestOf(events, today, "done"));
}

export function isGearDown(sleep: number | null, energy: number | null): boolean {
  return (sleep !== null && sleep < SLEEP_FLOOR) || (energy !== null && energy <= ENERGY_LOW);
}

export function suggestNextMilestone(milestone: number, b: number): number {
  if (milestone >= b) return b;
  const remaining = b - milestone;
  if (remaining <= 5) return b;
  const step = Math.max(1, Math.ceil(remaining / 2));
  return Math.min(b, milestone + step);
}

type DayMark = "done" | "skip" | "miss" | "empty";

function markDay(events: LogEvent[], date: string, today: string): DayMark {
  if (latestOf(events, date, "done")) return "done";
  if (latestOf(events, date, "skip")) return "skip";
  if (latestOf(events, date, "miss")) return "miss";
  if (date >= today) return "empty";
  return "miss";
}

/** Consecutive done-days. Skip is transparent. Miss breaks. Today without action does not break. */
export function localStreak(events: LogEvent[], today: string): number {
  let streak = 0;
  let cursor = today;

  for (let i = 0; i < 400; i += 1) {
    const mark = markDay(events, cursor, today);
    if (mark === "done") streak += 1;
    else if (mark === "skip" || (mark === "empty" && cursor === today)) {
      cursor = addDays(cursor, -1);
      continue;
    } else {
      break;
    }
    cursor = addDays(cursor, -1);
  }

  return streak;
}

export function weekHitrate(
  events: LogEvent[],
  today: string,
): { hits: number; eligible: number } {
  const start = mondayOfWeek(today);
  let hits = 0;
  let eligible = 0;

  for (const date of eachDay(start, today)) {
    const mark = markDay(events, date, today);
    if (mark === "skip" || mark === "empty") continue;
    eligible += 1;
    if (mark === "done") hits += 1;
  }

  return { hits, eligible };
}

export function isStalled(events: LogEvent[], today: string, lookback = 3): boolean {
  const from = addDays(today, -(lookback - 1));
  return !events.some(
    (event) =>
      event.date >= from &&
      event.date <= today &&
      (event.kind === "set" || event.kind === "done"),
  );
}

export function trendWord(input: {
  current: number;
  weekStartCurrent: number;
  gearDown: boolean;
  stalled: boolean;
  milestoneHit: boolean;
}): { arrow: LoopView["trend"]["arrow"]; word: string } {
  if (input.gearDown) return { arrow: "↓", word: "herstel" };
  if (input.milestoneHit && input.current > input.weekStartCurrent) {
    return { arrow: "↑", word: "stijgt" };
  }
  if (input.stalled) return { arrow: "↓", word: "stokt" };
  if (input.current > input.weekStartCurrent) return { arrow: "↑", word: "stijgt" };
  if (input.current < input.weekStartCurrent) return { arrow: "↓", word: "zakt" };
  return { arrow: "→", word: "stabiel" };
}

export function nextActionText(input: {
  current: number;
  milestone: number;
  b: number;
  gearDown: boolean;
  milestoneHit: boolean;
  atB: boolean;
  stalled: boolean;
  doneToday: boolean;
  skipToday: SkipReason | null;
}): string {
  if (input.gearDown) return "Geen verhoging. Kleinere set of herstel.";
  if (input.atB) return "B staat. Houd dit, kies later een nieuwe B.";
  if (input.milestoneHit) {
    return `${formatReps(input.milestone)} gehaald. Kies zelf de volgende etappe.`;
  }
  if (input.doneToday) return "Vandaag staat. Morgen dezelfde lijn.";
  if (input.skipToday) return "Overgeslagen. Geen miss. Morgen weer.";
  if (input.stalled) return "Beweging staat stil. Doe de etappe of sla over met reden.";
  return `Werk naar ${formatReps(input.milestone)}. Niet harder dan het lijf toelaat.`;
}

function formatReps(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function currentAt(a: number, events: LogEvent[], onOrBefore: string): number {
  const lastSet = events
    .filter((event) => event.kind === "set" && event.date <= onOrBefore)
    .sort(byCreated)
    .at(-1);
  return lastSet?.value ?? a;
}

export function computeLoop(
  vector: Vector,
  stage: Stage,
  events: LogEvent[],
  today: string,
): LoopView {
  const current = computeCurrent(vector.a, events);
  const sleep = todaySleep(events, today);
  const energy = todayEnergy(events, today);
  const doneToday = todayDone(events, today);
  const skipToday = todaySkip(events, today);
  const gearDown = isGearDown(sleep, energy);
  const milestoneHit = current >= stage.milestone;
  const atB = current >= vector.b;
  const stalled = isStalled(events, today);
  const weekStart = mondayOfWeek(today);
  const weekStartCurrent = currentAt(vector.a, events, addDays(weekStart, -1));
  const trend = trendWord({
    current,
    weekStartCurrent,
    gearDown,
    stalled,
    milestoneHit,
  });

  return {
    current,
    sleep,
    energy,
    doneToday,
    skipToday,
    gearDown,
    milestoneHit,
    atB,
    trend,
    hitrate: weekHitrate(events, today),
    streak: localStreak(events, today),
    nextAction: nextActionText({
      current,
      milestone: stage.milestone,
      b: vector.b,
      gearDown,
      milestoneHit,
      atB,
      stalled,
      doneToday,
      skipToday,
    }),
    suggestedMilestone:
      milestoneHit && !atB && !gearDown
        ? suggestNextMilestone(stage.milestone, vector.b)
        : null,
  };
}

export function stageWindowDays(stage: Stage, today: string): number {
  if (!stage.deadline) return 0;
  return Math.max(0, daysBetween(today, stage.deadline));
}
