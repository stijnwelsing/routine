import { describe, expect, it } from "vitest";
import {
  dueItems,
  dueToday,
  formatWork,
  hasCurrent,
  mergeSeedItems,
  recoverSnapshots,
  todayActions,
  todayConstraints,
  todayPreferences,
  todaySociaal,
  todayStofjes,
} from "./items";
import { emptySnapshot, seedSnapshot, testTenantItems } from "./seed";
import type { Item, LogEvent, Snapshot } from "./types";

describe("test tenant items", () => {
  it("keeps given A numbers and does not invent etappe/B", () => {
    const items = testTenantItems("t1");
    const push = items.find((item) => item.label === "Push-ups");
    const squat = items.find((item) => item.label === "Squats");
    const plank = items.find((item) => item.label === "Plank");
    const hang = items.find((item) => item.label === "Dead hang");
    const weekly = items.find((item) => item.label === "Gerichte kracht");
    expect(push).toMatchObject({ a: 40, milestone: 45, b: 50, type: "daily" });
    expect(squat).toMatchObject({ a: 30, unit: "reps", milestone: null, b: null });
    expect(plank).toMatchObject({ a: 60, unit: "sec", milestone: null, b: null });
    expect(hang).toMatchObject({ a: 45, unit: "sec", milestone: null, b: null });
    expect(weekly).toMatchObject({ type: "weekly", times_per_week: 2, weekdays: [] });
    expect(hasCurrent(push!)).toBe(true);
    expect(hasCurrent(squat!)).toBe(false);
    expect(items.every((item) => !/stijn|pieperz/i.test(item.label))).toBe(true);
  });

  it("shows only what today must and hides weekly until days are set", () => {
    const items = testTenantItems("t1");
    const due = dueItems(items, "2026-08-29");
    expect(due.some((item) => item.label === "Push-ups")).toBe(true);
    expect(due.some((item) => item.label === "Koud douchen")).toBe(true);
    expect(due.some((item) => item.label === "Wandelen na eten")).toBe(true);
    expect(due.some((item) => item.label === "Cafeïne 90 min na opstaan")).toBe(true);
    expect(due.some((item) => item.type === "weekly")).toBe(false);
    expect(todayActions(items, "2026-08-29").some((item) => item.label === "Wandelen na eten")).toBe(
      true,
    );
    expect(todayActions(items, "2026-08-29").some((item) => item.label === "Low carb")).toBe(false);
    expect(todayPreferences(items, "2026-08-29").map((item) => item.label)).toEqual(["Low carb"]);
    expect(todayActions(items, "2026-08-29").some((item) => item.role === "constraint")).toBe(false);
    expect(todayConstraints(items, "2026-08-29").map((item) => item.label)).toEqual([
      "Cafeïne 90 min na opstaan",
      "Scherm uit 22:00",
    ]);
    const stof = todayStofjes(items, "2026-08-29");
    expect(stof.map((item) => item.label)).toEqual(["Medicijn ochtend", "Vitamine D"]);
    expect(stof.every((item) => item.a === null && item.unit === null)).toBe(true);
    expect(todayActions(items, "2026-08-29").some((item) => item.type === "medicijn")).toBe(false);
    expect(todayActions(items, "2026-08-29").some((item) => item.type === "supplement")).toBe(false);
    const sociaal = todaySociaal(items, "2026-08-29");
    expect(sociaal.map((item) => item.label)).toEqual(["Bellen met iemand", "Iemand zien"]);
    expect(sociaal.every((item) => item.type === "sociaal" && item.a === null)).toBe(true);
    expect(sociaal.every((item) => !/stijn|piet|jan|marie/i.test(item.label))).toBe(true);
    expect(todayActions(items, "2026-08-29").some((item) => item.type === "sociaal")).toBe(false);
    expect(dueToday({ ...items[4], weekdays: [] }, "2026-08-29")).toBe(false);
    expect(dueToday({ ...items[4], weekdays: [6] }, "2026-08-29")).toBe(true);
  });

  it("does not put test inrichting on an empty tenant", () => {
    const empty = emptySnapshot("u2", "2026-08-29", "tenant-2");
    expect(empty.items).toEqual([]);
    const seeded = seedSnapshot("u1", "2026-08-29", "tenant-1");
    expect(seeded.items.length).toBeGreaterThan(0);
    expect(formatWork(seeded.items.find((item) => item.label === "Plank")!)).toBe("60 s");
    expect(formatWork(seeded.items.find((item) => item.label === "Squats")!)).toBe("30 reps");
    expect(formatWork(seeded.items.find((item) => item.label === "Dead hang")!)).toBe("45 s");
  });

  it("keeps eat/drink leefregels and only adds missing labels", () => {
    const items = testTenantItems("t1");
    const labels = items.filter((item) => item.type === "leefregel").map((item) => item.label);
    expect(labels).toEqual([
      "Koud douchen",
      "Niet snoepen",
      "Low carb",
      "Intermittent fasting",
      "Geen alcohol",
    ]);
    const existing = items.filter((item) => item.label !== "Geen alcohol");
    const push = existing.find((item) => item.label === "Push-ups")!;
    const merged = mergeSeedItems(existing, testTenantItems("t1"), "t1");
    expect(merged.find((item) => item.label === "Push-ups")?.id).toBe(push.id);
    expect(merged.find((item) => item.label === "Low carb")?.label).toBe("Low carb");
    expect(merged.some((item) => item.label === "Geen alcohol")).toBe(true);
    expect(merged.filter((item) => item.label === "Push-ups")).toHaveLength(1);
    expect(merged.find((item) => item.label === "Low carb")?.type).toBe("leefregel");
    const old = items.filter(
      (item) =>
        item.label !== "Cafeïne 90 min na opstaan" &&
        item.label !== "Wandelen na eten" &&
        item.label !== "Scherm uit 22:00",
    );
    const withTiming = mergeSeedItems(old, testTenantItems("t1"), "t1");
    expect(withTiming.some((item) => item.label === "Cafeïne 90 min na opstaan")).toBe(true);
    expect(withTiming.some((item) => item.label === "Wandelen na eten")).toBe(true);
    expect(withTiming.some((item) => item.label === "Scherm uit 22:00")).toBe(true);
    expect(withTiming.find((item) => item.label === "Low carb")?.id).toBe(
      old.find((item) => item.label === "Low carb")!.id,
    );
    const withoutStof = items.filter(
      (item) => item.label !== "Medicijn ochtend" && item.label !== "Vitamine D",
    );
    const withStof = mergeSeedItems(withoutStof, testTenantItems("t1"), "t1");
    expect(withStof.some((item) => item.label === "Medicijn ochtend")).toBe(true);
    expect(withStof.some((item) => item.label === "Vitamine D")).toBe(true);
    expect(withStof.find((item) => item.label === "Push-ups")?.id).toBe(
      withoutStof.find((item) => item.label === "Push-ups")!.id,
    );
    const withoutSociaal = items.filter(
      (item) => item.label !== "Bellen met iemand" && item.label !== "Iemand zien",
    );
    const withSociaal = mergeSeedItems(withoutSociaal, testTenantItems("t1"), "t1");
    expect(withSociaal.some((item) => item.label === "Bellen met iemand")).toBe(true);
    expect(withSociaal.some((item) => item.label === "Iemand zien")).toBe(true);
    expect(withSociaal.find((item) => item.label === "Push-ups")?.id).toBe(
      withoutSociaal.find((item) => item.label === "Push-ups")!.id,
    );
    expect(withSociaal.filter((item) => item.label === "Bellen met iemand")).toHaveLength(1);
    const withoutScreen = items.filter((item) => item.label !== "Scherm uit 22:00");
    const withScreen = mergeSeedItems(withoutScreen, testTenantItems("t1"), "t1");
    expect(withScreen.some((item) => item.label === "Scherm uit 22:00")).toBe(true);
    expect(withScreen.find((item) => item.label === "Scherm uit 22:00")).toMatchObject({
      role: "constraint",
      template: "user preference",
    });
    expect(withScreen.find((item) => item.label === "Cafeïne 90 min na opstaan")?.id).toBe(
      withoutScreen.find((item) => item.label === "Cafeïne 90 min na opstaan")!.id,
    );
    expect(withScreen.find((item) => item.label === "Wandelen na eten")?.id).toBe(
      withoutScreen.find((item) => item.label === "Wandelen na eten")!.id,
    );
    expect(withScreen.filter((item) => item.label === "Scherm uit 22:00")).toHaveLength(1);
  });

  it("recovers leftover keys without wiping events or renaming items", () => {
    const seed = testTenantItems("t1");
    const oldPush = { ...seed[0], id: "old-push", label: "Push-ups" };
    const oldItems = seed
      .filter((item) => item.label !== "Geen alcohol")
      .map((item) => (item.label === "Push-ups" ? oldPush : item));
    const event: LogEvent = {
      id: "evt-1",
      tenant_id: "t1",
      user_id: "u1",
      item_id: "old-push",
      date: "2026-09-07",
      kind: "done",
      value: 40,
      skip_reason: null,
      created_at: "2026-09-07T08:00:00.000Z",
    };
    const v5: Snapshot = {
      ...seedSnapshot("u1", "2026-09-07", "t1"),
      items: oldItems,
      profile: {
        id: "u1",
        tenant_id: "t1",
        display_name: null,
        identity_anti: "niet terug",
        identity_new: null,
        identity_constraint: null,
        horizon_1y: null,
        age_band: null,
        goals: [],
        themes: [],
      },
      events: [event],
    };
    const v6empty = seedSnapshot("u1", "2026-09-07", "t1");
    const recovered = recoverSnapshots([v6empty, v5], seed, "u1", "t1");
    expect(recovered).not.toBeNull();
    expect(recovered!.events.map((row) => row.id)).toEqual(["evt-1"]);
    expect(recovered!.profile.identity_anti).toBe("niet terug");
    expect(recovered!.items.find((item) => item.label === "Push-ups")?.id).toBe("old-push");
    expect(recovered!.events[0].item_id).toBe("old-push");
    expect(recovered!.items.some((item) => item.label === "Geen alcohol")).toBe(true);
    expect(recovered!.items.find((item) => item.label === "Niet snoepen")?.label).toBe("Niet snoepen");
  });

  it("does not rewrite existing A numbers when merging seed", () => {
    const custom: Item = {
      ...testTenantItems("t1")[1],
      id: "keep-squat",
      label: "Squats",
      a: 32,
    };
    const merged = mergeSeedItems([custom], testTenantItems("t1"), "t1");
    expect(merged.find((item) => item.label === "Squats")).toMatchObject({
      id: "keep-squat",
      a: 32,
    });
  });
});
