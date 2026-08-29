import { describe, expect, it } from "vitest";
import { dueItems, dueToday, formatWork, hasCurrent } from "./items";
import { emptySnapshot, seedSnapshot, testTenantItems } from "./seed";

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
    expect(due.some((item) => item.type === "weekly")).toBe(false);
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
});
