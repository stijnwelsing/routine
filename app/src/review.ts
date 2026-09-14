import { addDays, eachDay, formatShort, mondayOfWeek, parseISO, weekdayShort } from "./dates";
import { eventsForItem, primaryItem, todayActions, todaySociaal, todayStofjes } from "./items";
import { todayEnergy, todayMeal, todaySleep, todayWake, mealAtOnDay, wakeAtOnDay } from "./loop";
import { isVisibleToday, timingContext } from "./timing";
import type { Item, LogEvent, SkipReason } from "./types";

function hasSessionHistory(
  events: LogEvent[],
  item: Item,
  primaryId: string | undefined,
  before: string,
): boolean {
  return eventsForItem(events, item, primaryId).some(
    (event) =>
      (event.kind === "set" || event.kind === "done" || event.kind === "skip" || event.kind === "miss") &&
      event.date < before,
  );
}

export type ItemDayMark = "hit" | "skip" | "miss" | "open" | "idle";

export interface ItemDay {
  item: Item;
  date: string;
  mark: ItemDayMark;
  reason: SkipReason | null;
}

export interface WeekDay {
  date: string;
  label: string;
  mark: ItemDayMark;
  hits: number;
  misses: number;
  skips: number;
}

export interface WeekReview {
  start: string;
  end: string;
  range: string;
  days: WeekDay[];
  hits: number;
  misses: number;
  skips: number;
  missRows: ItemDay[];
  note: string | null;
}

function byCreated(a: LogEvent, b: LogEvent): number {
  return a.created_at.localeCompare(b.created_at);
}

function latestOf(events: LogEvent[], date: string, kind: LogEvent["kind"]): LogEvent | undefined {
  return events
    .filter((event) => event.date === date && event.kind === kind)
    .sort(byCreated)
    .at(-1);
}

function latestSession(events: LogEvent[], date: string): LogEvent | undefined {
  return events
    .filter(
      (event) =>
        event.date === date &&
        (event.kind === "set" || event.kind === "done" || event.kind === "skip" || event.kind === "miss"),
    )
    .sort(byCreated)
    .at(-1);
}

function reviewContext(date: string, events: LogEvent[] = []): ReturnType<typeof timingContext> {
  const midday = parseISO(date);
  midday.setHours(12, 0, 0, 0);
  return timingContext({
    today: date,
    now: midday,
    wakeAt: wakeAtOnDay(date, todayWake(events, date)),
    mealAt: mealAtOnDay(date, todayMeal(events, date)),
    sleepSet: todaySleep(events, date) !== null,
    energySet: todayEnergy(events, date) !== null,
  });
}

/** Action items that can take +1 / Done / Skip that day. Later and regels stay out. */
export function reviewableItems(items: Item[], date: string, events: LogEvent[] = []): Item[] {
  const ctx = reviewContext(date, events);
  return [...todayActions(items, date), ...todayStofjes(items, date), ...todaySociaal(items, date)].filter(
    (item) => isVisibleToday(item, ctx),
  );
}

export function itemDayMark(
  events: LogEvent[],
  item: Item,
  date: string,
  today: string,
  primaryId?: string,
): ItemDay {
  const ev = eventsForItem(events, item, primaryId);
  const session = latestSession(ev, date);
  if (session?.kind === "set" || session?.kind === "done") {
    return { item, date, mark: "hit", reason: null };
  }
  if (session?.kind === "skip") {
    return { item, date, mark: "skip", reason: session.skip_reason };
  }
  const miss = session?.kind === "miss" ? session : latestOf(ev, date, "miss");
  if (miss) {
    return { item, date, mark: "miss", reason: miss.skip_reason };
  }
  if (date >= today) {
    return { item, date, mark: "open", reason: null };
  }
  return { item, date, mark: "idle", reason: null };
}

/** Yesterday's due action items without +1 / Done / Skip. No backlog. */
export function pendingMisses(
  items: Item[],
  events: LogEvent[],
  today: string,
  primaryId?: string,
): ItemDay[] {
  const yesterday = addDays(today, -1);
  return reviewableItems(items, yesterday, events)
    .filter((item) => hasSessionHistory(events, item, primaryId, yesterday))
    .map((item) => {
      const row = itemDayMark(events, item, yesterday, today, primaryId);
      if (row.mark === "hit" || row.mark === "skip" || row.mark === "miss") return row;
      return { ...row, mark: "miss" as const, reason: null };
    })
    .filter((row) => row.mark === "miss" && !row.reason);
}

function dayMark(rows: ItemDay[], date: string, today: string): ItemDayMark {
  if (rows.some((row) => row.mark === "hit")) return "hit";
  if (rows.some((row) => row.mark === "miss")) return "miss";
  if (rows.some((row) => row.mark === "skip")) return "skip";
  if (date === today) return "open";
  return "idle";
}

/** Calm week strip. Away days stay blank. No score, no streak. */
export function weekReview(
  items: Item[],
  events: LogEvent[],
  today: string,
  primaryId?: string,
): WeekReview {
  const start = mondayOfWeek(today);
  const end = addDays(start, 6);
  const pending = pendingMisses(items, events, today, primaryId);
  const pendingKey = new Set(pending.map((row) => `${row.item.id}:${row.date}`));
  const days: WeekDay[] = eachDay(start, end).map((date) => {
    const rows = reviewableItems(items, date, events).map((item) => {
      const row = itemDayMark(events, item, date, today, primaryId);
      if (pendingKey.has(`${item.id}:${date}`)) {
        return { ...row, mark: "miss" as const, reason: row.reason };
      }
      return row;
    });
    return {
      date,
      label: weekdayShort(date),
      mark: dayMark(rows, date, today),
      hits: rows.filter((row) => row.mark === "hit").length,
      misses: rows.filter((row) => row.mark === "miss").length,
      skips: rows.filter((row) => row.mark === "skip").length,
    };
  });

  const closed = days.filter((day) => day.date < today);
  const hits = closed.reduce((sum, day) => sum + day.hits, 0);
  const misses = closed.reduce((sum, day) => sum + day.misses, 0);
  const skips = closed.reduce((sum, day) => sum + day.skips, 0);
  const missRows = closed.flatMap((day) =>
    reviewableItems(items, day.date, events).map((item) => {
      const row = itemDayMark(events, item, day.date, today, primaryId);
      if (pendingKey.has(`${item.id}:${day.date}`)) {
        return { ...row, mark: "miss" as const, reason: row.reason };
      }
      return row;
    }).filter((row) => row.mark === "miss"),
  );

  const activeClosed = closed.filter((day) => day.mark !== "idle").length;
  const note =
    hits > 0 && misses === 0 && activeClosed >= 2 ? "Week staat." : null;

  return {
    start,
    end,
    range: `${formatShort(start)} – ${formatShort(end)}`,
    days,
    hits,
    misses,
    skips,
    missRows,
    note,
  };
}

export function reviewPrimaryId(items: Item[]): string | undefined {
  return primaryItem(items)?.id;
}
