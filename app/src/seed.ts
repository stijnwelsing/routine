import { addDays, newId, todayISO } from "./dates";
import { emptyIdentity } from "./identity";
import { SEED, type Profile, type Snapshot, type Stage, type Vector } from "./types";

export function emptyProfile(userId: string): Profile {
  return {
    id: userId,
    display_name: null,
    ...emptyIdentity(),
  };
}

export function seedVector(userId: string): Vector {
  return {
    id: newId(),
    user_id: userId,
    domain: SEED.domain,
    a: SEED.a,
    b: SEED.b,
    unit: SEED.unit,
    pace_constraint: null,
  };
}

export function seedStage(vectorId: string, today = todayISO()): Stage {
  return {
    id: newId(),
    vector_id: vectorId,
    milestone: SEED.milestone,
    started_on: today,
    deadline: addDays(today, SEED.windowDays),
    status: "active",
    stage_type: SEED.stageType,
  };
}

export function seedSnapshot(userId: string, today = todayISO()): Snapshot {
  const profile = emptyProfile(userId);
  const vector = seedVector(userId);
  const stage = seedStage(vector.id, today);
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
