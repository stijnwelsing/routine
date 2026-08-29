import { describe, expect, it } from "vitest";
import {
  computeCurrent,
  computeLoop,
  isGearDown,
  localStreak,
  suggestNextMilestone,
  weekHitrate,
} from "./loop";
import type { LogEvent, Stage, Vector } from "./types";

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
  a: 25,
  b: 50,
  unit: "reps",
  pace_constraint: "schouders",
};

const stage: Stage = {
  id: "s1",
  vector_id: "v1",
  milestone: 35,
  started_on: "2026-08-20",
  deadline: "2026-09-10",
  status: "active",
  stage_type: "Build",
};

describe("computeCurrent", () => {
  it("starts at A when there are no sets", () => {
    expect(computeCurrent(25, [])).toBe(25);
  });

  it("uses the latest set value", () => {
    const events = [
      event({ date: "2026-08-27", kind: "set", value: 26, created_at: "2026-08-27T08:00:00.000Z" }),
      event({ date: "2026-08-28", kind: "set", value: 28, created_at: "2026-08-28T08:00:00.000Z" }),
    ];
    expect(computeCurrent(25, events)).toBe(28);
  });
});

describe("localStreak", () => {
  it("counts done days and ignores skip", () => {
    const events = [
      event({ date: "2026-08-26", kind: "done", value: 26 }),
      event({ date: "2026-08-27", kind: "skip", skip_reason: "geen tijd" }),
      event({ date: "2026-08-28", kind: "done", value: 27 }),
    ];
    expect(localStreak(events, "2026-08-28")).toBe(2);
  });

  it("does not treat skip as miss", () => {
    const events = [event({ date: "2026-08-28", kind: "skip", skip_reason: "pijn" })];
    expect(localStreak(events, "2026-08-29")).toBe(0);
  });

  it("breaks on an implicit miss", () => {
    const events = [
      event({ date: "2026-08-26", kind: "done", value: 26 }),
      event({ date: "2026-08-28", kind: "done", value: 27 }),
    ];
    expect(localStreak(events, "2026-08-28")).toBe(1);
  });

  it("does not break on an empty today", () => {
    const events = [event({ date: "2026-08-28", kind: "done", value: 26 })];
    expect(localStreak(events, "2026-08-29")).toBe(1);
  });
});

describe("weekHitrate", () => {
  it("excludes skip from the denominator", () => {
    const events = [
      event({ date: "2026-08-24", kind: "done", value: 26 }), // ma
      event({ date: "2026-08-25", kind: "skip", skip_reason: "geen zin" }),
      event({ date: "2026-08-26", kind: "done", value: 27 }),
    ];
    expect(weekHitrate(events, "2026-08-26")).toEqual({ hits: 2, eligible: 2 });
  });
});

describe("gear down", () => {
  it("triggers on short sleep or low energy", () => {
    expect(isGearDown(5.5, 4)).toBe(true);
    expect(isGearDown(7, 2)).toBe(true);
    expect(isGearDown(7, 3)).toBe(false);
    expect(isGearDown(null, null)).toBe(false);
  });

  it("blocks stage increase in the loop view", () => {
    const events = [
      event({ date: "2026-08-29", kind: "set", value: 35 }),
      event({ date: "2026-08-29", kind: "body_sleep", value: 5 }),
      event({ date: "2026-08-29", kind: "body_energy", value: 2 }),
    ];
    const view = computeLoop(vector, stage, events, "2026-08-29");
    expect(view.gearDown).toBe(true);
    expect(view.milestoneHit).toBe(true);
    expect(view.suggestedMilestone).toBeNull();
    expect(view.nextAction).toMatch(/herstel/i);
    expect(view.trend.word).toBe("herstel");
  });
});

describe("milestone", () => {
  it("does not auto-advance; suggests the next stage", () => {
    const events = [event({ date: "2026-08-29", kind: "set", value: 35 })];
    const view = computeLoop(vector, stage, events, "2026-08-29");
    expect(view.milestoneHit).toBe(true);
    expect(view.suggestedMilestone).toBe(43);
    expect(view.nextAction).toMatch(/kies zelf/i);
  });

  it("caps the suggestion at B when the gap is small", () => {
    expect(suggestNextMilestone(50, 50)).toBe(50);
    expect(suggestNextMilestone(47, 50)).toBe(50);
    expect(suggestNextMilestone(43, 50)).toBe(47);
  });
});
