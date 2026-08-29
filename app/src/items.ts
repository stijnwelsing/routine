import { isoWeekday } from "./dates";
import type { Item, LogEvent } from "./types";

export function hasCurrent(item: Item): boolean {
  return item.a !== null && item.b !== null && item.milestone !== null;
}

export function dueToday(item: Item, today: string): boolean {
  if (item.type === "weekly") {
    const days = item.weekdays ?? [];
    if (days.length === 0) return false;
    return days.includes(isoWeekday(today));
  }
  return true;
}

export function dueItems(items: Item[], today: string): Item[] {
  return items.filter((item) => dueToday(item, today)).sort((a, b) => a.sort - b.sort);
}

export function primaryItem(items: Item[]): Item | undefined {
  return items.find(hasCurrent);
}

export function isBodyEvent(event: LogEvent): boolean {
  return event.kind === "body_sleep" || event.kind === "body_energy" || event.kind === "body_weight";
}

export function eventsForItem(events: LogEvent[], item: Item, primaryId?: string): LogEvent[] {
  return events.filter((event) => {
    if (isBodyEvent(event)) return false;
    if (event.item_id === item.id) return true;
    if (event.item_id === null && primaryId && item.id === primaryId) return true;
    return false;
  });
}

export function loopEvents(events: LogEvent[], item: Item | undefined): LogEvent[] {
  if (!item) return events.filter(isBodyEvent);
  return [...events.filter(isBodyEvent), ...eventsForItem(events, item, item.id)];
}

export function formatWork(item: Item): string | null {
  if (item.a === null) return null;
  if (item.unit === "sec") return `${Number.isInteger(item.a) ? item.a : item.a.toFixed(1)} s`;
  if (item.unit === "reps") return `${Number.isInteger(item.a) ? item.a : item.a.toFixed(1)} reps`;
  return String(item.a);
}
