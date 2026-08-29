import { addDays, newId, todayISO } from "./dates";
import { emptyIdentity } from "./identity";
import { hasCurrent, primaryItem } from "./items";
import { EMPTY, SEED, type Item, type Profile, type Snapshot, type Stage, type Vector } from "./types";

export function emptyProfile(userId: string, tenantId: string): Profile {
  return {
    id: userId,
    tenant_id: tenantId,
    display_name: null,
    ...emptyIdentity(),
  };
}

export function seedVector(userId: string, tenantId: string): Vector {
  return {
    id: newId(),
    tenant_id: tenantId,
    user_id: userId,
    domain: SEED.domain,
    a: SEED.a,
    b: SEED.b,
    unit: SEED.unit,
    pace_constraint: null,
  };
}

export function seedStage(vectorId: string, tenantId: string, today = todayISO()): Stage {
  return {
    id: newId(),
    tenant_id: tenantId,
    vector_id: vectorId,
    milestone: SEED.milestone,
    started_on: today,
    deadline: addDays(today, SEED.windowDays),
    status: "active",
    stage_type: SEED.stageType,
  };
}

/** Test-tenant inrichting. No person name. Etappe/B only where given. Weekdays left empty. */
export function testTenantItems(tenantId: string): Item[] {
  const row = (
    partial: Omit<Item, "id" | "tenant_id">,
  ): Item => ({
    id: newId(),
    tenant_id: tenantId,
    ...partial,
  });

  return [
    row({
      type: "daily",
      label: "Push-ups",
      unit: "reps",
      a: SEED.a,
      b: SEED.b,
      milestone: SEED.milestone,
      weekdays: null,
      times_per_week: null,
      sort: 0,
    }),
    row({
      type: "daily",
      label: "Squats",
      unit: "reps",
      a: 30,
      b: null,
      milestone: null,
      weekdays: null,
      times_per_week: null,
      sort: 1,
    }),
    row({
      type: "daily",
      label: "Plank",
      unit: "sec",
      a: 60,
      b: null,
      milestone: null,
      weekdays: null,
      times_per_week: null,
      sort: 2,
    }),
    row({
      type: "daily",
      label: "Dead hang",
      unit: "sec",
      a: 45,
      b: null,
      milestone: null,
      weekdays: null,
      times_per_week: null,
      sort: 3,
    }),
    row({
      type: "weekly",
      label: "Gerichte kracht",
      unit: null,
      a: null,
      b: null,
      milestone: null,
      weekdays: [],
      times_per_week: 2,
      sort: 4,
    }),
    row({
      type: "leefregel",
      label: "Koud douchen",
      unit: null,
      a: null,
      b: null,
      milestone: null,
      weekdays: null,
      times_per_week: null,
      sort: 5,
    }),
    row({
      type: "leefregel",
      label: "Niet snoepen",
      unit: null,
      a: null,
      b: null,
      milestone: null,
      weekdays: null,
      times_per_week: null,
      sort: 6,
    }),
    row({
      type: "leefregel",
      label: "Low carb",
      unit: null,
      a: null,
      b: null,
      milestone: null,
      weekdays: null,
      times_per_week: null,
      sort: 7,
    }),
    row({
      type: "leefregel",
      label: "Intermittent fasting",
      unit: null,
      a: null,
      b: null,
      milestone: null,
      weekdays: null,
      times_per_week: null,
      sort: 8,
    }),
  ];
}

export function vectorFromItem(item: Item, userId: string): Vector {
  return {
    id: item.id,
    tenant_id: item.tenant_id,
    user_id: userId,
    domain: SEED.domain,
    a: item.a ?? SEED.a,
    b: item.b ?? SEED.b,
    unit: item.unit === "sec" ? "sec" : "reps",
    pace_constraint: null,
  };
}

export function seedSnapshot(userId: string, today = todayISO(), tenantId = newId()): Snapshot {
  const profile = emptyProfile(userId, tenantId);
  const items = testTenantItems(tenantId);
  const primary = primaryItem(items) ?? items[0];
  const vector = vectorFromItem(primary, userId);
  const stage = seedStage(vector.id, tenantId, today);
  if (primary.milestone !== null) stage.milestone = primary.milestone;
  return { profile, items, vector, stage, events: [], rotated: false };
}

export function emptyVector(userId: string, tenantId: string): Vector {
  return {
    ...seedVector(userId, tenantId),
    a: EMPTY.a,
    b: EMPTY.b,
  };
}

export function emptyStage(vectorId: string, tenantId: string, today = todayISO()): Stage {
  return {
    ...seedStage(vectorId, tenantId, today),
    milestone: EMPTY.milestone,
  };
}

export function emptySnapshot(userId: string, today = todayISO(), tenantId = newId()): Snapshot {
  const profile = emptyProfile(userId, tenantId);
  const vector = emptyVector(userId, tenantId);
  const stage = emptyStage(vector.id, tenantId, today);
  return { profile, items: [], vector, stage, events: [], rotated: false };
}

/** Rewrite leftover prototype numbers (25 / 35). Current then starts at A = 40. */
export function applySeedLock(snapshot: Snapshot): Snapshot {
  const stale =
    snapshot.vector.a === 25 ||
    snapshot.stage.milestone === 35 ||
    snapshot.stage.milestone === 25;
  if (!stale) return snapshot;
  return {
    ...snapshot,
    items: snapshot.items.map((item) =>
      hasCurrent(item)
        ? { ...item, a: SEED.a, b: SEED.b, milestone: SEED.milestone, unit: SEED.unit }
        : item,
    ),
    vector: {
      ...snapshot.vector,
      a: SEED.a,
      b: SEED.b,
      unit: SEED.unit,
    },
    stage: {
      ...snapshot.stage,
      milestone: SEED.milestone,
    },
    events: snapshot.events.filter((event) => event.kind !== "set" && event.kind !== "done"),
  };
}
