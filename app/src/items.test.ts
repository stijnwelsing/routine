import { describe, expect, it } from "vitest";
import {
  applyItemRemoval,
  canAddItem,
  canRenameItem,
  createUserItem,
  dueItems,
  dueToday,
  formatWork,
  hasCurrent,
  isSeedSuggestion,
  isUserAddedItem,
  kindFromItem,
  mergeSeedItems,
  parseUserTiming,
  recoverSnapshots,
  restoreUserItem,
  timingInputValue,
  todayActions,
  todayConstraints,
  todayLater,
  todayPreferences,
  todaySociaal,
  todayStofjes,
  updateUserItem,
  userAddedItems,
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
    const withoutRest = items.filter((item) => item.label !== "Korte rust");
    const withRest = mergeSeedItems(withoutRest, testTenantItems("t1"), "t1");
    expect(withRest.find((item) => item.label === "Korte rust")).toMatchObject({
      type: "gedrag",
      role: "action",
      template: "user preference",
    });
    expect(withRest.find((item) => item.label === "Korte rust")?.timing).toMatchObject({
      mode: "clock",
      clock: "08:00",
      window_min: 840,
      condition: "body",
    });
    expect(withRest.find((item) => item.label === "Push-ups")?.id).toBe(
      withoutRest.find((item) => item.label === "Push-ups")!.id,
    );
    expect(withRest.filter((item) => item.label === "Korte rust")).toHaveLength(1);
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

  it("keeps a user-made item when merging seed and does not invent a dose", () => {
    const seed = testTenantItems("t1");
    const own = createUserItem({
      tenantId: "t1",
      label: "Avondwandeling",
      kind: "gedrag",
      timing: "20:00",
      sort: 40,
    });
    expect(own).toMatchObject({
      type: "gedrag",
      label: "Avondwandeling",
      unit: null,
      a: null,
      role: "action",
      template: "user preference",
    });
    expect(own?.timing).toMatchObject({ mode: "clock", clock: "20:00" });
    const merged = mergeSeedItems([...seed, own!], seed, "t1");
    expect(merged.find((item) => item.label === "Avondwandeling")?.id).toBe(own!.id);
    expect(merged.find((item) => item.label === "Push-ups")?.a).toBe(40);
    expect(merged.find((item) => item.label === "Scherm uit 22:00")).toMatchObject({
      role: "constraint",
      template: "user preference",
    });
    expect(merged.filter((item) => item.label === "Avondwandeling")).toHaveLength(1);
    expect(canAddItem(merged, "avondwandeling")).toBe(false);
    expect(canAddItem(merged, "Nieuwe regel")).toBe(true);
  });

  it("maps user kinds and optional timing without catalog lock", () => {
    const regel = createUserItem({
      tenantId: "t1",
      label: "  Geen telefoon in bed  ",
      kind: "regel",
      timing: "avond",
      sort: 41,
    });
    const med = createUserItem({
      tenantId: "t1",
      label: "Eigen medicijn",
      kind: "medicijn",
      sort: 42,
    });
    const soc = createUserItem({
      tenantId: "t1",
      label: "Koffie met iemand",
      kind: "sociaal",
      timing: "9:30",
      sort: 43,
    });
    expect(regel).toMatchObject({
      type: "leefregel",
      label: "Geen telefoon in bed",
      a: null,
      unit: null,
    });
    expect(regel?.timing).toMatchObject({ condition: "avond", mode: null });
    expect(med).toMatchObject({ type: "medicijn", template: "user preference", a: null });
    expect(soc?.timing).toMatchObject({ mode: "clock", clock: "09:30" });
    expect(todayActions([regel!], "2026-09-13").map((item) => item.label)).toEqual([
      "Geen telefoon in bed",
    ]);
    expect(todayStofjes([med!], "2026-09-13").map((item) => item.label)).toEqual(["Eigen medicijn"]);
    expect(todaySociaal([soc!], "2026-09-13").map((item) => item.label)).toEqual([
      "Koffie met iemand",
    ]);
    expect(todayLater([{ ...regel!, later: true }], "2026-09-13")[0]?.label).toBe(
      "Geen telefoon in bed",
    );
    expect(createUserItem({ tenantId: "t1", label: "   ", kind: "gedrag", sort: 0 })).toBeNull();
    expect(parseUserTiming("22:00")).toMatchObject({ mode: "clock", clock: "22:00" });
    expect(parseUserTiming("")).toMatchObject({ mode: null, clock: null, condition: null });
  });

  it("edits and soft-removes user items without touching seed or inventing a dose", () => {
    const seed = testTenantItems("t1");
    const own = createUserItem({
      tenantId: "t1",
      label: "Avondwandeling",
      kind: "gedrag",
      timing: "20:00",
      sort: 40,
    })!;
    expect(isUserAddedItem(own)).toBe(true);
    expect(isSeedSuggestion(seed.find((item) => item.label === "Push-ups")!)).toBe(true);
    expect(isUserAddedItem(seed.find((item) => item.label === "Scherm uit 22:00")!)).toBe(false);
    expect(kindFromItem(own)).toBe("gedrag");
    expect(timingInputValue(own)).toBe("20:00");

    const edited = updateUserItem(own, {
      label: "Nachtwandeling",
      kind: "regel",
      timing: "avond",
    });
    expect(edited).toMatchObject({
      id: own.id,
      type: "leefregel",
      label: "Nachtwandeling",
      a: null,
      unit: null,
    });
    expect(edited?.timing).toMatchObject({ condition: "avond", mode: null });
    expect(updateUserItem(own, { label: "Push-ups", kind: "gedrag" })).toBeNull();
    expect(updateUserItem(seed[0], { label: "Eigen kracht", kind: "gedrag" })).toBeNull();
    expect(canRenameItem([...seed, own], own.id, "nachtwandeling")).toBe(true);
    expect(canRenameItem([...seed, own], own.id, "Push-ups")).toBe(false);

    const gone = applyItemRemoval(own);
    expect(gone).toMatchObject({ mode: "removed" });
    expect(gone?.item).toMatchObject({ id: own.id, removed: true, label: "Avondwandeling" });
    expect(todayActions([gone!.item], "2026-09-13")).toEqual([]);
    expect(userAddedItems([gone!.item])).toEqual([]);
    expect(canAddItem([...seed, gone!.item], "avondwandeling")).toBe(true);

    const restored = restoreUserItem(gone!.item, {
      label: "Avondwandeling",
      kind: "sociaal",
      timing: "19:00",
    });
    expect(restored).toMatchObject({
      id: own.id,
      type: "sociaal",
      removed: false,
      later: false,
    });

    const parked = applyItemRemoval(seed.find((item) => item.label === "Squats")!);
    expect(parked).toMatchObject({ mode: "parked" });
    expect(parked?.item.later).toBe(true);
    expect(parked?.item.removed).toBeFalsy();
    const screen = seed.find((item) => item.label === "Scherm uit 22:00")!;
    const parkedRule = applyItemRemoval(screen);
    expect(parkedRule).toMatchObject({ mode: "parked" });
    expect(todayConstraints([parkedRule!.item], "2026-09-13")).toEqual([]);
    expect(todayLater([parkedRule!.item], "2026-09-13")[0]?.label).toBe("Scherm uit 22:00");
    expect(todayConstraints(seed, "2026-09-13").map((item) => item.label)).toEqual([
      "Cafeïne 90 min na opstaan",
      "Scherm uit 22:00",
    ]);
    expect(seed.find((item) => item.label === "Push-ups")?.a).toBe(40);
    expect(mergeSeedItems([...seed, gone!.item], seed, "t1").find((item) => item.id === own.id)).toMatchObject({
      id: own.id,
      removed: true,
    });
  });
});
