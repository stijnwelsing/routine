import type { Item, LogEvent, Profile, Snapshot } from "./types";
import { defaultRole, dueByFrequency, isAction, isConstraint, normalizeTiming } from "./timing";

export function hasCurrent(item: Item): boolean {
  return item.a !== null && item.b !== null && item.milestone !== null;
}

export function dueToday(item: Item, today: string): boolean {
  return dueByFrequency(item, today);
}

export function normalizeItem(item: Item, tenantId: string): Item {
  return {
    ...item,
    tenant_id: item.tenant_id ?? tenantId,
    weekdays: item.weekdays ?? null,
    times_per_week: item.times_per_week ?? null,
    timing: normalizeTiming(item.timing),
    role: defaultRole(item),
    template: item.template ?? null,
  };
}

export function isStofje(item: Item): boolean {
  return item.type === "medicijn" || item.type === "supplement";
}

export function todayActions(items: Item[], today: string): Item[] {
  return dueItems(items, today).filter((item) => isAction(item) && !isStofje(item));
}

export function todayConstraints(items: Item[], today: string): Item[] {
  return dueItems(items, today).filter(isConstraint);
}

export function todayStofjes(items: Item[], today: string): Item[] {
  return dueItems(items, today).filter(isStofje);
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

function labelKey(label: string): string {
  return label.trim().toLowerCase();
}

export function uniqueItemsByLabel(items: Item[]): Item[] {
  const seen = new Set<string>();
  const unique: Item[] = [];
  for (const item of items) {
    const key = labelKey(item.label);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }
  return unique;
}

/** Add missing seed items by label. Never rename, drop, or rewrite existing rows. */
export function mergeSeedItems(existing: Item[], seed: Item[], tenantId: string): Item[] {
  const kept = uniqueItemsByLabel(existing);
  const seen = new Set(kept.map((item) => labelKey(item.label)));
  const added = seed
    .filter((item) => !seen.has(labelKey(item.label)))
    .map((item) => ({ ...item, tenant_id: tenantId }));
  return [...kept, ...added];
}

export function unionEvents(groups: LogEvent[][]): LogEvent[] {
  const map = new Map<string, LogEvent>();
  for (const group of groups) {
    for (const event of group) {
      if (!map.has(event.id)) map.set(event.id, event);
    }
  }
  return [...map.values()].sort((a, b) => a.created_at.localeCompare(b.created_at));
}

function profileFilled(profile: Profile | undefined): boolean {
  if (!profile) return false;
  return Boolean(
    profile.identity_anti ||
      profile.identity_new ||
      profile.identity_constraint ||
      profile.horizon_1y ||
      profile.display_name,
  );
}

/** Rebuild one snapshot from leftover keys. Events and profile are kept. */
export function recoverSnapshots(
  snaps: Snapshot[],
  seed: Item[],
  userId: string,
  tenantId: string,
): Snapshot | null {
  if (snaps.length === 0) return null;
  const richest = snaps.reduce((best, next) =>
    (next.events?.length ?? 0) > (best.events?.length ?? 0) ? next : best,
  );
  const profile = snaps.find((snap) => profileFilled(snap.profile))?.profile ?? richest.profile;
  // Richest IDs first so today's events stay linked. Later snaps only fill missing labels.
  const items = mergeSeedItems(
    [richest, ...snaps.filter((snap) => snap !== richest)].flatMap((snap) => snap.items ?? []),
    seed,
    tenantId,
  );
  const canonByLabel = new Map(items.map((item) => [labelKey(item.label), item.id]));
  const idRemap = new Map<string, string>();
  for (const snap of snaps) {
    for (const item of snap.items ?? []) {
      const canonId = canonByLabel.get(labelKey(item.label));
      if (canonId && item.id !== canonId) idRemap.set(item.id, canonId);
    }
  }
  const events = unionEvents(snaps.map((snap) => snap.events ?? [])).map((event) => {
    if (!event.item_id) return event;
    const remapped = idRemap.get(event.item_id);
    return remapped ? { ...event, item_id: remapped } : event;
  });
  return {
    ...richest,
    profile: {
      ...profile,
      id: profile.id || userId,
      tenant_id: profile.tenant_id || tenantId,
    },
    items,
    events,
  };
}
