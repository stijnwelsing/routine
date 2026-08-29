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

function latestSession(events: LogEvent[], date: string): LogEvent | undefined {
  return events
    .filter(
      (event) =>
        event.date === date && (event.kind === "set" || event.kind === "done" || event.kind === "skip"),
    )
    .sort(byCreated)
    .at(-1);
}

export function todaySkip(events: LogEvent[], today: string): SkipReason | null {
  const session = latestSession(events, today);
  return session?.kind === "skip" ? session.skip_reason : null;
}

export function todayDone(events: LogEvent[], today: string): boolean {
  return latestSession(events, today)?.kind === "done";
}

export function todayPlus(events: LogEvent[], today: string): boolean {
  return latestSession(events, today)?.kind === "set";
}

export function setLoggedToday(events: LogEvent[], today: string): boolean {
  const session = latestSession(events, today);
  return session?.kind === "set" || session?.kind === "done";
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

function markDay(
  events: LogEvent[],
  date: string,
  today: string,
  origin: string,
): DayMark {
  if (date < origin) return "empty";
  const session = latestSession(events, date);
  if (session?.kind === "done" || session?.kind === "set") return "done";
  if (session?.kind === "skip") return "skip";
  if (latestOf(events, date, "miss")) return "miss";
  if (date >= today) return "empty";
  return "miss";
}

/** Consecutive done-days. Skip is transparent. Miss breaks. Today without action does not break. */
export function localStreak(
  events: LogEvent[],
  today: string,
  origin = "1970-01-01",
): number {
  let streak = 0;
  let cursor = today;

  for (let i = 0; i < 400; i += 1) {
    const mark = markDay(events, cursor, today, origin);
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
  origin?: string,
): { hits: number; eligible: number } {
  const weekStart = mondayOfWeek(today);
  const start = !origin || origin < weekStart ? weekStart : origin;
  let hits = 0;
  let eligible = 0;

  for (const date of eachDay(start, today)) {
    const mark = markDay(events, date, today, origin ?? start);
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
  plusToday: boolean;
  skipToday: SkipReason | null;
}): string {
  if (input.gearDown) return "Geen etappe-omhoog. Kleinere set of herstel. Geen stop.";
  if (input.atB) return "B staat. Houd dit, kies later een nieuwe B.";
  if (input.milestoneHit) {
    return `${formatReps(input.milestone)} gehaald. Kies zelf de volgende etappe.`;
  }
  if (input.plusToday) return "Set gedaan. Huidige mag omhoog. Etappe blijft.";
  if (input.doneToday) return "Set op het werkgetal. Huidige blijft.";
  if (input.skipToday) return "Overgeslagen. Geen miss. Morgen weer.";
  if (input.stalled) return "Beweging staat stil. Doe de etappe of sla over met reden.";
  return `Eén set. Werk naar ${formatReps(input.milestone)}.`;
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
  const plusToday = todayPlus(events, today);
  const logged = setLoggedToday(events, today);
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
    plusToday,
    setLoggedToday: logged,
    skipToday,
    gearDown,
    milestoneHit,
    atB,
    trend,
    hitrate: weekHitrate(events, today, stage.started_on),
    streak: localStreak(events, today, stage.started_on),
    nextAction: nextActionText({
      current,
      milestone: stage.milestone,
      b: vector.b,
      gearDown,
      milestoneHit,
      atB,
      stalled,
      doneToday,
      plusToday,
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
