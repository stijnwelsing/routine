import { describe, expect, it } from "vitest";
import {
  computeCurrent,
  computeLoop,
  isGearDown,
  localStreak,
  suggestNextMilestone,
  weekHitrate,
} from "./loop";
import { applySeedLock, seedSnapshot } from "./seed";
import { SEED, type LogEvent, type Stage, type Vector } from "./types";

function event(
  partial: Pick<LogEvent, "date" | "kind"> & Partial<LogEvent>,
): LogEvent {
  return {
    id: partial.id ?? crypto.randomUUID(),
    user_id: "u1",
    value: partial.value ?? null,
    skip_reason: partial.skip_reason ?? null,
    created_at: partial.created_at ?? `${partial.date}T10:00:00.000Z`,
    ...partial,
  };
}

const vector: Vector = {
  id: "v1",
  user_id: "u1",
  domain: "strength",
  a: SEED.a,
  b: SEED.b,
  unit: "reps",
  pace_constraint: null,
};

const stage: Stage = {
  id: "s1",
  vector_id: "v1",
  milestone: SEED.milestone,
  started_on: "2026-08-20",
  deadline: "2026-09-10",
  status: "active",
  stage_type: "Build",
};

describe("seed", () => {
  it("is 40 → 45 → 50 with one set per day", () => {
    expect(SEED.a).toBe(40);
    expect(SEED.milestone).toBe(45);
    expect(SEED.b).toBe(50);
    expect(SEED.setsPerDay).toBe(1);
    expect(SEED.unit).toBe("reps");
    const fresh = seedSnapshot("u1");
    expect(fresh.vector.a).toBe(40);
    expect(fresh.stage.milestone).toBe(45);
    expect(fresh.vector.b).toBe(50);
    expect(computeCurrent(fresh.vector.a, fresh.events)).toBe(40);
  });

  it("rewrites leftover 25 / 35 so Vandaag is 40 → 45 → 50", () => {
    const stale = seedSnapshot("u1");
    stale.vector.a = 25;
    stale.stage.milestone = 35;
    stale.events = [event({ date: "2026-08-28", kind: "set", value: 26 })];
    const locked = applySeedLock(stale);
    expect(locked.vector.a).toBe(40);
    expect(locked.stage.milestone).toBe(45);
    expect(locked.vector.b).toBe(50);
    expect(computeCurrent(locked.vector.a, locked.events)).toBe(40);
  });
});

describe("computeCurrent", () => {
  it("starts at A when there are no sets", () => {
    expect(computeCurrent(40, [])).toBe(40);
  });

  it("+1 raises current via set; done does not", () => {
    const plus = [event({ date: "2026-08-28", kind: "set", value: 41 })];
    expect(computeCurrent(40, plus)).toBe(41);

    const done = [event({ date: "2026-08-28", kind: "done", value: 40 })];
    expect(computeCurrent(40, done)).toBe(40);
  });
});

describe("buttons do not move the stage", () => {
  it("+1 and done leave the milestone untouched", () => {
    const plus = computeLoop(
      vector,
      stage,
      [event({ date: "2026-08-29", kind: "set", value: 41 })],
      "2026-08-29",
    );
    expect(plus.current).toBe(41);
    expect(plus.plusToday).toBe(true);
    expect(plus.setLoggedToday).toBe(true);
    expect(plus.suggestedMilestone).toBeNull();

    const done = computeLoop(
      vector,
      stage,
      [event({ date: "2026-08-29", kind: "done", value: 40 })],
      "2026-08-29",
    );
    expect(done.current).toBe(40);
    expect(done.doneToday).toBe(true);
    expect(done.setLoggedToday).toBe(true);
    expect(done.suggestedMilestone).toBeNull();
  });
});

describe("localStreak", () => {
  it("counts +1 or done and ignores skip", () => {
    const events = [
      event({ date: "2026-08-26", kind: "set", value: 41 }),
      event({ date: "2026-08-27", kind: "skip", skip_reason: "geen tijd" }),
      event({ date: "2026-08-28", kind: "done", value: 41 }),
    ];
    expect(localStreak(events, "2026-08-28")).toBe(2);
  });

  it("does not treat skip as miss", () => {
    const events = [event({ date: "2026-08-28", kind: "skip", skip_reason: "pijn" })];
    expect(localStreak(events, "2026-08-29")).toBe(0);
  });

  it("breaks on a day without +1, done, or skip", () => {
    const events = [
      event({ date: "2026-08-26", kind: "done", value: 40 }),
      event({ date: "2026-08-28", kind: "done", value: 40 }),
    ];
    expect(localStreak(events, "2026-08-28")).toBe(1);
  });

  it("does not break on an empty today", () => {
    const events = [event({ date: "2026-08-28", kind: "done", value: 40 })];
    expect(localStreak(events, "2026-08-29")).toBe(1);
  });
});

describe("weekHitrate", () => {
  it("excludes skip from the denominator", () => {
    const events = [
      event({ date: "2026-08-24", kind: "done", value: 40 }),
      event({ date: "2026-08-25", kind: "skip", skip_reason: "geen zin" }),
      event({ date: "2026-08-26", kind: "set", value: 41 }),
    ];
    expect(weekHitrate(events, "2026-08-26")).toEqual({ hits: 2, eligible: 2 });
  });

  it("does not invent misses before the stage started", () => {
    const events = [event({ date: "2026-08-29", kind: "done", value: 40 })];
    expect(weekHitrate(events, "2026-08-29", "2026-08-29")).toEqual({
      hits: 1,
      eligible: 1,
    });
  });
});

describe("gear down", () => {
  it("triggers on short sleep or low energy", () => {
    expect(isGearDown(5.5, 4)).toBe(true);
    expect(isGearDown(7, 2)).toBe(true);
    expect(isGearDown(7, 3)).toBe(false);
    expect(isGearDown(null, null)).toBe(false);
  });

  it("blocks etappe-omhoog, not the day's set", () => {
    const events = [
      event({ date: "2026-08-29", kind: "set", value: 45 }),
      event({ date: "2026-08-29", kind: "body_sleep", value: 5 }),
      event({ date: "2026-08-29", kind: "body_energy", value: 2 }),
    ];
    const view = computeLoop(vector, stage, events, "2026-08-29");
    expect(view.gearDown).toBe(true);
    expect(view.plusToday).toBe(true);
    expect(view.milestoneHit).toBe(true);
    expect(view.suggestedMilestone).toBeNull();
    expect(view.nextAction).toMatch(/geen stop/i);
    expect(view.trend.word).toBe("herstel");
  });
});

describe("milestone", () => {
  it("does not auto-advance; user chooses the next stage", () => {
    const events = [event({ date: "2026-08-29", kind: "set", value: 45 })];
    const view = computeLoop(vector, stage, events, "2026-08-29");
    expect(view.milestoneHit).toBe(true);
    expect(view.suggestedMilestone).toBe(50);
    expect(view.nextAction).toMatch(/kies zelf/i);
  });

  it("caps the suggestion at B when the gap is small", () => {
    expect(suggestNextMilestone(50, 50)).toBe(50);
    expect(suggestNextMilestone(45, 50)).toBe(50);
  });
});
