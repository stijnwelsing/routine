import { describe, expect, it } from "vitest";
import {
  computeCurrent,
  computeLoop,
  isGearDown,
  isStalled,
  lastWake,
  lastWeight,
  localStreak,
  nudgeWake,
  nudgeWeight,
  formatWake,
  parseWake,
  parseWeight,
  todayWake,
  suggestNextMilestone,
  todayActionEvent,
  todayDone,
  todayPlus,
  todaySkip,
  todayWeight,
  wakeAtOnDay,
  weekHitrate,
  withoutTodayAction,
} from "./loop";
import { applySeedLock, emptySnapshot, seedSnapshot } from "./seed";
import { EMPTY, SEED, type LogEvent, type Stage, type Vector } from "./types";

function event(
  partial: Pick<LogEvent, "date" | "kind"> & Partial<LogEvent>,
): LogEvent {
  return {
    id: partial.id ?? crypto.randomUUID(),
    tenant_id: partial.tenant_id ?? "t1",
    user_id: "u1",
    value: partial.value ?? null,
    skip_reason: partial.skip_reason ?? null,
    item_id: partial.item_id ?? null,
    created_at: partial.created_at ?? `${partial.date}T10:00:00.000Z`,
    ...partial,
  };
}

const vector: Vector = {
  id: "v1",
  tenant_id: "t1",
  user_id: "u1",
  domain: "strength",
  a: SEED.a,
  b: SEED.b,
  unit: "reps",
  pace_constraint: null,
};

const stage: Stage = {
  id: "s1",
  tenant_id: "t1",
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
    const fresh = seedSnapshot("u1", "2026-08-29", "tenant-a");
    expect(fresh.profile.tenant_id).toBe("tenant-a");
    expect(fresh.vector.tenant_id).toBe("tenant-a");
    expect(fresh.stage.tenant_id).toBe("tenant-a");
    expect(fresh.profile.display_name).toBeNull();
    expect(fresh.vector.a).toBe(40);
    expect(fresh.stage.milestone).toBe(45);
    expect(fresh.vector.b).toBe(50);
    expect(computeCurrent(fresh.vector.a, fresh.events)).toBe(40);
    expect(fresh.items.find((item) => item.label === "Push-ups")).toMatchObject({
      a: 40,
      milestone: 45,
      b: 50,
    });
  });

  it("keeps 40 → 45 → 50 on one tenant and leaves another tenant alone", () => {
    const one = seedSnapshot("u1", "2026-08-29", "tenant-1");
    const two = emptySnapshot("u2", "2026-08-29", "tenant-2");
    expect(one.vector.a).toBe(SEED.a);
    expect(one.stage.milestone).toBe(SEED.milestone);
    expect(one.vector.b).toBe(SEED.b);
    expect(two.vector.a).toBe(EMPTY.a);
    expect(two.stage.milestone).toBe(EMPTY.milestone);
    expect(two.vector.b).toBe(EMPTY.b);
    expect(one.profile.tenant_id).not.toBe(two.profile.tenant_id);
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
    expect(locked.events).toEqual(stale.events);
    expect(locked.events).toHaveLength(1);
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

describe("stok is a closed miss", () => {
  it("does not call a fresh day with 0 events stokt", () => {
    const freshStage = { ...stage, started_on: "2026-08-29" };
    const view = computeLoop(vector, freshStage, [], "2026-08-29");
    expect(isStalled([], "2026-08-29", "2026-08-29")).toBe(false);
    expect(view.trend.word).not.toBe("stokt");
    expect(view.trend.word).toBe("stabiel");
    expect(view.nextAction).toMatch(/werk naar 45/i);
    expect(view.nextAction).not.toMatch(/stil/i);
  });

  it("marks miss only after a day closed without +1, done, or skip", () => {
    const open = { ...stage, started_on: "2026-08-28" };
    expect(isStalled([], "2026-08-28", "2026-08-28")).toBe(false);
    expect(computeLoop(vector, open, [], "2026-08-28").trend.word).toBe("stabiel");

    expect(isStalled([], "2026-08-29", "2026-08-28")).toBe(true);
    expect(computeLoop(vector, open, [], "2026-08-29").trend.word).toBe("stokt");

    const skipped = [event({ date: "2026-08-28", kind: "skip", skip_reason: "geen tijd" })];
    expect(isStalled(skipped, "2026-08-29", "2026-08-28")).toBe(false);
    expect(computeLoop(vector, open, skipped, "2026-08-29").trend.word).not.toBe("stokt");

    const done = [event({ date: "2026-08-28", kind: "done", value: 40 })];
    expect(isStalled(done, "2026-08-29", "2026-08-28")).toBe(false);
  });

  it("is not stokt after +1 or Done today, even if a prior day missed", () => {
    const open = { ...stage, started_on: "2026-09-01" };
    const plus = [event({ date: "2026-09-07", kind: "set", value: 41 })];
    expect(isStalled(plus, "2026-09-07", "2026-09-01")).toBe(false);
    const afterPlus = computeLoop(vector, open, plus, "2026-09-07");
    expect(afterPlus.plusToday).toBe(true);
    expect(afterPlus.current).toBe(41);
    expect(afterPlus.hitrate).toEqual({ hits: 1, eligible: 1 });
    expect(afterPlus.nextAction).toMatch(/set gedaan/i);
    expect(afterPlus.trend.word).not.toBe("stokt");

    const doneToday = [event({ date: "2026-09-07", kind: "done", value: 40 })];
    const afterDone = computeLoop(vector, open, doneToday, "2026-09-07");
    expect(isStalled(doneToday, "2026-09-07", "2026-09-01")).toBe(false);
    expect(afterDone.doneToday).toBe(true);
    expect(afterDone.trend.word).not.toBe("stokt");

    const skipToday = [event({ date: "2026-09-07", kind: "skip", skip_reason: "geen tijd" })];
    expect(computeLoop(vector, open, skipToday, "2026-09-07").trend.word).not.toBe("stokt");
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

  it("ignores weight and wake for gear-down and the day's set", () => {
    const events = [
      event({ date: "2026-08-29", kind: "body_weight", value: 88.4 }),
      event({ date: "2026-08-29", kind: "body_wake", value: 420 }),
    ];
    const fresh = { ...stage, started_on: "2026-08-29" };
    const view = computeLoop(vector, fresh, events, "2026-08-29");
    expect(view.weight).toBe(88.4);
    expect(view.wake).toBe(420);
    expect(view.gearDown).toBe(false);
    expect(view.doneToday).toBe(false);
    expect(view.plusToday).toBe(false);
    expect(view.setLoggedToday).toBe(false);
    expect(view.skipToday).toBeNull();
    expect(view.trend.word).toBe("stabiel");
  });
});

describe("body weight", () => {
  it("reads today's kg and keeps yesterday as last only", () => {
    const events = [
      event({ date: "2026-08-28", kind: "body_weight", value: 88.0, created_at: "2026-08-28T07:00:00.000Z" }),
      event({ date: "2026-08-29", kind: "body_weight", value: 87.6, created_at: "2026-08-29T07:00:00.000Z" }),
    ];
    expect(todayWeight(events, "2026-08-29")).toBe(87.6);
    expect(todayWeight(events, "2026-08-28")).toBe(88.0);
    expect(todayWeight(events, "2026-08-30")).toBeNull();
    expect(lastWeight(events)).toBe(87.6);
    expect(lastWeight([])).toBeNull();
  });

  it("nudges from last kg or 80, and parses typed kg", () => {
    expect(nudgeWeight(null, null, 0.1)).toBe(80.1);
    expect(nudgeWeight(null, 88.4, -0.1)).toBe(88.3);
    expect(nudgeWeight(88.4, 80, 0.1)).toBe(88.5);
    expect(nudgeWeight(40, null, -0.1)).toBe(40);
    expect(nudgeWeight(250, null, 0.1)).toBe(250);
    expect(parseWeight("88,4")).toBe(88.4);
    expect(parseWeight(" 91.0 ")).toBe(91);
    expect(parseWeight("")).toBeNull();
    expect(parseWeight("x")).toBeNull();
    expect(parseWeight("10")).toBe(40);
    expect(parseWeight("300")).toBe(250);
  });
});

describe("body wake", () => {
  it("reads today's clock minutes and keeps yesterday as last only", () => {
    const events = [
      event({ date: "2026-08-28", kind: "body_wake", value: 390, created_at: "2026-08-28T05:00:00.000Z" }),
      event({ date: "2026-08-29", kind: "body_wake", value: 420, created_at: "2026-08-29T05:00:00.000Z" }),
    ];
    expect(todayWake(events, "2026-08-29")).toBe(420);
    expect(todayWake(events, "2026-08-28")).toBe(390);
    expect(todayWake(events, "2026-08-30")).toBeNull();
    expect(lastWake(events)).toBe(420);
    expect(lastWake([])).toBeNull();
  });

  it("nudges from last clock or 07:00, and parses typed HH:MM", () => {
    expect(nudgeWake(null, null, 15)).toBe(435);
    expect(nudgeWake(null, 420, -15)).toBe(405);
    expect(nudgeWake(420, 390, 15)).toBe(435);
    expect(nudgeWake(0, null, -15)).toBe(0);
    expect(nudgeWake(23 * 60 + 59, null, 15)).toBe(23 * 60 + 59);
    expect(parseWake("07:00")).toBe(420);
    expect(parseWake("7:05")).toBe(425);
    expect(parseWake("")).toBeNull();
    expect(parseWake("x")).toBeNull();
    expect(parseWake("24:00")).toBeNull();
    expect(formatWake(420)).toBe("07:00");
    expect(formatWake(425)).toBe("07:05");
    const wakeAt = wakeAtOnDay("2026-09-07", 420);
    expect(wakeAt?.getFullYear()).toBe(2026);
    expect(wakeAt?.getMonth()).toBe(8);
    expect(wakeAt?.getDate()).toBe(7);
    expect(wakeAt?.getHours()).toBe(7);
    expect(wakeAt?.getMinutes()).toBe(0);
    expect(wakeAtOnDay("2026-09-07", null)).toBeNull();
  });
});

describe("undo today action", () => {
  it("removes only the last Done / +1 / Skip of that day", () => {
    const events = [
      event({ id: "old-set", date: "2026-09-12", kind: "set", value: 41 }),
      event({ id: "old-done", date: "2026-09-11", kind: "done", value: 40 }),
      event({ id: "today-plus", date: "2026-09-13", kind: "set", value: 42 }),
      event({ id: "kg", date: "2026-09-13", kind: "body_weight", value: 88.4 }),
      event({ id: "sleep", date: "2026-09-13", kind: "body_sleep", value: 7 }),
    ];
    expect(todayActionEvent(events, "2026-09-13")?.id).toBe("today-plus");
    const next = withoutTodayAction(events, "2026-09-13");
    expect(next.map((row) => row.id)).toEqual(["old-set", "old-done", "kg", "sleep"]);
    expect(todayPlus(next, "2026-09-13")).toBe(false);
    expect(todayDone(next, "2026-09-13")).toBe(false);
    expect(computeCurrent(40, next)).toBe(41);
    expect(events.map((row) => row.id)).toEqual([
      "old-set",
      "old-done",
      "today-plus",
      "kg",
      "sleep",
    ]);
  });

  it("undoes one item's today Done or Skip and leaves another item's today intact", () => {
    const events = [
      event({ id: "keep-walk", date: "2026-09-13", kind: "done", item_id: "walk" }),
      event({ id: "today-done", date: "2026-09-13", kind: "done", item_id: "push" }),
    ];
    const pushOnly = events.filter((row) => row.item_id === "push");
    const afterPush = withoutTodayAction(pushOnly, "2026-09-13");
    expect(afterPush).toEqual([]);
    expect(todayDone(afterPush, "2026-09-13")).toBe(false);
    expect(events.filter((row) => row.item_id === "walk").map((row) => row.id)).toEqual(["keep-walk"]);

    const skip = [
      event({ id: "miss", date: "2026-09-12", kind: "miss", skip_reason: "vergeten" }),
      event({ id: "today-skip", date: "2026-09-13", kind: "skip", skip_reason: "geen tijd" }),
    ];
    const afterSkip = withoutTodayAction(skip, "2026-09-13");
    expect(afterSkip.map((row) => row.id)).toEqual(["miss"]);
    expect(todaySkip(afterSkip, "2026-09-13")).toBeNull();
  });

  it("leaves an open day alone and does not undo body or miss", () => {
    const open = [
      event({ id: "kg", date: "2026-09-13", kind: "body_weight", value: 88.1 }),
      event({ id: "miss", date: "2026-09-12", kind: "miss", skip_reason: "pijn" }),
    ];
    expect(todayActionEvent(open, "2026-09-13")).toBeUndefined();
    expect(withoutTodayAction(open, "2026-09-13")).toBe(open);
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
