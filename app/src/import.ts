import { isAgeBand, isGoalId } from "./goals";
import { clipField, IDENTITY_LIMITS } from "./identity";
import { mergeSeedItems, unionEvents } from "./items";
import { normalizeThemes } from "./themes";
import {
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_LEGACY_KEYS,
  type GoalId,
  type Item,
  type LogEvent,
  type Profile,
  type Snapshot,
} from "./types";

export const IMPORT_ERROR = "Ongeldig bestand. Geen Routine-export.";

export interface ImportPayload {
  profile: Profile;
  items: Item[];
  events: LogEvent[];
  onboarded?: boolean;
  theme_step?: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isKnownKey(value: unknown): boolean {
  if (value == null) return true;
  if (value === LOCAL_STORAGE_KEY) return true;
  return (LOCAL_STORAGE_LEGACY_KEYS as readonly string[]).includes(String(value));
}

function isItemRow(value: unknown): value is Item {
  return isRecord(value) && typeof value.id === "string" && value.id.length > 0 && typeof value.label === "string";
}

function isEventRow(value: unknown): value is LogEvent {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    value.id.length > 0 &&
    typeof value.date === "string" &&
    typeof value.kind === "string"
  );
}

function labelKey(label: string): string {
  return label.trim().toLowerCase();
}

function keepText(current: string | null | undefined, incoming: string | null | undefined): string | null {
  const have = current?.trim();
  if (have) return current ?? have;
  const next = incoming?.trim();
  return next ? incoming ?? next : null;
}

function unionGoals(current: unknown, incoming: unknown): GoalId[] {
  const out: GoalId[] = [];
  const seen = new Set<string>();
  for (const row of [current, incoming].flatMap((value) => (Array.isArray(value) ? value : []))) {
    if (typeof row !== "string" || !isGoalId(row) || seen.has(row)) continue;
    seen.add(row);
    out.push(row);
  }
  return out;
}

function remapIncomingEvents(events: LogEvent[], currentItems: Item[], incomingItems: Item[]): LogEvent[] {
  const canonByLabel = new Map(currentItems.map((item) => [labelKey(item.label), item.id]));
  const idRemap = new Map<string, string>();
  for (const item of incomingItems) {
    const canonId = canonByLabel.get(labelKey(item.label));
    if (canonId && item.id !== canonId) idRemap.set(item.id, canonId);
  }
  return events.map((event) => {
    if (!event.item_id) return event;
    const remapped = idRemap.get(event.item_id);
    return remapped ? { ...event, item_id: remapped } : event;
  });
}

/** Throws IMPORT_ERROR. Never writes. */
export function parseImport(raw: string): ImportPayload {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(IMPORT_ERROR);
  }
  if (!isRecord(parsed) || !isKnownKey(parsed.key)) throw new Error(IMPORT_ERROR);
  if (!isRecord(parsed.profile) || !Array.isArray(parsed.items) || !Array.isArray(parsed.events)) {
    throw new Error(IMPORT_ERROR);
  }
  if (!parsed.items.every(isItemRow) || !parsed.events.every(isEventRow)) {
    throw new Error(IMPORT_ERROR);
  }
  return {
    profile: parsed.profile as unknown as Profile,
    items: parsed.items,
    events: parsed.events,
    onboarded: typeof parsed.onboarded === "boolean" ? parsed.onboarded : undefined,
    theme_step: typeof parsed.theme_step === "boolean" ? parsed.theme_step : undefined,
  };
}

function mergeProfile(current: Profile, incoming: Profile): Profile {
  return {
    ...current,
    display_name: keepText(current.display_name, incoming.display_name),
    identity_anti: clipField(
      keepText(current.identity_anti, incoming.identity_anti),
      IDENTITY_LIMITS.identity_anti,
    ),
    identity_new: clipField(keepText(current.identity_new, incoming.identity_new), IDENTITY_LIMITS.identity_new),
    identity_constraint: clipField(
      keepText(current.identity_constraint, incoming.identity_constraint),
      IDENTITY_LIMITS.identity_constraint,
    ),
    horizon_1y: clipField(keepText(current.horizon_1y, incoming.horizon_1y), IDENTITY_LIMITS.horizon_1y),
    age_band: current.age_band ?? (incoming.age_band && isAgeBand(incoming.age_band) ? incoming.age_band : null),
    goals: unionGoals(current.goals, incoming.goals),
    themes: normalizeThemes([...(current.themes ?? []), ...(incoming.themes ?? [])]),
  };
}

/** Existing ids/events win. New labels and event ids are appended. Does not mutate inputs. */
export function mergeImport(current: Snapshot, incoming: ImportPayload): Snapshot {
  const tenantId = current.profile.tenant_id;
  const items = mergeSeedItems(current.items, incoming.items, tenantId);
  const incomingEvents = remapIncomingEvents(incoming.events, items, incoming.items).map((event) => ({
    ...event,
    tenant_id: tenantId,
    user_id: current.profile.id,
  }));
  return {
    ...current,
    profile: mergeProfile(current.profile, incoming.profile),
    items,
    events: unionEvents([current.events, incomingEvents]),
    onboarded: Boolean(current.onboarded || incoming.onboarded),
    theme_step: Boolean(current.theme_step || incoming.theme_step),
  };
}
