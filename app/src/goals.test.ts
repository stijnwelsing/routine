import { describe, expect, it } from "vitest";
import {
  AGE_BANDS,
  GOALS,
  MAX_START,
  applyStartSelection,
  needsOnboarding,
  onboardStep,
  suggestStartItems,
  toggleStartId,
} from "./goals";
import { todayActions, todayLater, todayStofjes } from "./items";
import { seedSnapshot, testTenantItems } from "./seed";

describe("goals onboarding", () => {
  it("keeps goals apart from item types and has no health score", () => {
    const types = ["daily", "weekly", "leefregel", "gedrag", "medicijn", "supplement", "sociaal"];
    expect(GOALS.every((goal) => !types.includes(goal.id))).toBe(true);
    expect(GOALS.some((goal) => /score|xp|health/i.test(goal.label))).toBe(false);
    expect(AGE_BANDS).toContain("50–59");
    expect(MAX_START).toBe(3);
  });

  it("skips onboarding when a leftover session already has data", () => {
    const fresh = seedSnapshot("u1", "2026-09-09", "t1");
    expect(needsOnboarding(fresh)).toBe(true);
    expect(onboardStep(fresh)).toBe("goals");
    const existing = { ...fresh, onboarded: true, events: fresh.events };
    expect(needsOnboarding(existing)).toBe(false);
    const leftover = {
      ...fresh,
      onboarded: false,
      events: [
        {
          id: "e1",
          tenant_id: "t1",
          user_id: "u1",
          item_id: null,
          date: "2026-09-09",
          kind: "done" as const,
          value: 40,
          skip_reason: null,
          created_at: "2026-09-09T08:00:00.000Z",
        },
      ],
    };
    expect(needsOnboarding(leftover)).toBe(false);
    expect(onboardStep(leftover)).toBe(null);
  });

  it("opens themes after age, then start", () => {
    const fresh = seedSnapshot("u1", "2026-09-09", "t1");
    const withGoals = { ...fresh, profile: { ...fresh.profile, goals: ["kracht" as const] } };
    expect(onboardStep(withGoals)).toBe("age");
    const withAge = { ...withGoals, profile: { ...withGoals.profile, age_band: "50–59" as const } };
    expect(onboardStep(withAge)).toBe("themes");
    expect(onboardStep({ ...withAge, theme_step: true })).toBe("start");
  });

  it("parks everything beyond 3 start items in Later", () => {
    const items = testTenantItems("t1");
    const push = items.find((item) => item.label === "Push-ups")!;
    const walk = items.find((item) => item.label === "Wandelen na eten")!;
    const vit = items.find((item) => item.label === "Vitamine D")!;
    const next = applyStartSelection(items, [push.id, walk.id, vit.id, items[1].id]);
    const start = next.filter((item) => !item.later && item.label !== "Cafeïne 90 min na opstaan");
    const later = todayLater(next, "2026-09-09");
    expect(start.filter((item) => [push.id, walk.id, vit.id].includes(item.id))).toHaveLength(3);
    expect(later.length).toBeGreaterThan(0);
    expect(later.some((item) => item.label === "Squats")).toBe(true);
    expect(todayActions(next, "2026-09-09").some((item) => item.label === "Squats")).toBe(false);
    expect(todayStofjes(next, "2026-09-09").map((item) => item.label)).toEqual(["Vitamine D"]);
    expect(next.find((item) => item.label === "Cafeïne 90 min na opstaan")?.later).toBe(false);
  });

  it("suggests from chosen goals and caps start toggles at 3", () => {
    const items = testTenantItems("t1");
    const suggested = suggestStartItems(items, ["stofjes"]);
    expect(suggested.map((item) => item.label)).toEqual(["Medicijn ochtend", "Vitamine D"]);
    let ids: string[] = [];
    ids = toggleStartId(ids, "a");
    ids = toggleStartId(ids, "b");
    ids = toggleStartId(ids, "c");
    ids = toggleStartId(ids, "d");
    expect(ids).toEqual(["a", "b", "c"]);
  });
});
