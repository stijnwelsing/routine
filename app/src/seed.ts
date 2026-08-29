import { addDays, newId, todayISO } from "./dates";
import { emptyIdentity } from "./identity";
import { EMPTY, SEED, type Profile, type Snapshot, type Stage, type Vector } from "./types";

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

export function seedSnapshot(userId: string, today = todayISO(), tenantId = newId()): Snapshot {
  const profile = emptyProfile(userId, tenantId);
  const vector = seedVector(userId, tenantId);
  const stage = seedStage(vector.id, tenantId, today);
  return { profile, vector, stage, events: [], rotated: false };
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
  return { profile, vector, stage, events: [], rotated: false };
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
