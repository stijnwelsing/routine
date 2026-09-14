import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { todayISO } from "./dates";
import { exportPayload } from "./export";
import { IMPORT_ERROR } from "./import";
import { seedSnapshot } from "./seed";
import { createLocalStore, hasLocalSession } from "./store";
import {
  LOCAL_CHOSEN_KEY,
  LOCAL_STORAGE_KEY,
  LOCAL_TENANT_KEY,
  LOCAL_USER_KEY,
  type LogEvent,
  type Snapshot,
} from "./types";

class MemoryStorage {
  private data = new Map<string, string>();

  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.data.set(key, String(value));
  }

  removeItem(key: string): void {
    this.data.delete(key);
  }

  clear(): void {
    this.data.clear();
  }

  get length(): number {
    return this.data.size;
  }

  key(index: number): string | null {
    return [...this.data.keys()][index] ?? null;
  }
}

function event(partial: Pick<LogEvent, "date" | "kind"> & Partial<LogEvent>): LogEvent {
  return {
    id: partial.id ?? "evt",
    tenant_id: partial.tenant_id ?? "t1",
    user_id: partial.user_id ?? "u1",
    item_id: partial.item_id ?? "push",
    value: partial.value ?? 40,
    skip_reason: partial.skip_reason ?? null,
    created_at: partial.created_at ?? `${partial.date}T10:00:00.000Z`,
    ...partial,
  };
}

describe("local store data preserve", () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, "localStorage", {
      value: new MemoryStorage(),
      configurable: true,
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("keeps the live v6 key and does not drop today's events on reload", async () => {
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
    const store = createLocalStore();
    const first = await store.load();
    const push = first.items.find((item) => item.label === "Push-ups")!;
    await store.addEvent({
      date: "2026-09-07",
      kind: "done",
      value: 40,
      skip_reason: null,
      item_id: push.id,
    });
    const again = await store.load();
    expect(again.events).toHaveLength(1);
    expect(again.events[0].kind).toBe("done");
    expect(again.items.find((item) => item.id === push.id)?.label).toBe("Push-ups");
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(1);
  });

  it("pulls events from a leftover key instead of seeding empty", async () => {
    localStorage.setItem(LOCAL_USER_KEY, "u-keep");
    localStorage.setItem(LOCAL_TENANT_KEY, "t-keep");
    const leftover = seedSnapshot("u-keep", "2026-09-07", "t-keep");
    leftover.items = leftover.items.filter((item) => item.label !== "Geen alcohol");
    leftover.events = [
      event({
        id: "old-done",
        date: "2026-09-07",
        kind: "done",
        item_id: leftover.items.find((item) => item.label === "Low carb")!.id,
        user_id: "u-keep",
        tenant_id: "t-keep",
      }),
    ];
    leftover.profile.identity_new = "blijf";
    localStorage.setItem("routine_loop_v5", JSON.stringify(leftover));

    const store = createLocalStore();
    const snap = await store.load();
    expect(snap.events.map((row) => row.id)).toEqual(["old-done"]);
    expect(snap.profile.identity_new).toBe("blijf");
    expect(snap.items.some((item) => item.label === "Geen alcohol")).toBe(true);
    expect(snap.items.some((item) => item.label === "Low carb")).toBe(true);
    expect(localStorage.getItem("routine_loop_v5")).toBeTruthy();
    const v6 = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!) as Snapshot;
    expect(v6.events).toHaveLength(1);
  });

  it("adds a missing eat/drink leefregel without renaming or wiping", async () => {
    const existing = seedSnapshot("u1", "2026-09-07", "t1");
    existing.items = existing.items.filter((item) => item.label !== "Geen alcohol");
    existing.events = [
      event({
        id: "skip-1",
        date: "2026-09-07",
        kind: "skip",
        skip_reason: "geen zin",
        value: null,
        item_id: existing.items.find((item) => item.label === "Niet snoepen")!.id,
      }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(snap.items.filter((item) => item.label === "Niet snoepen")).toHaveLength(1);
    expect(snap.items.find((item) => item.label === "Niet snoepen")?.id).toBe(
      existing.items.find((item) => item.label === "Niet snoepen")!.id,
    );
    expect(snap.items.some((item) => item.label === "Geen alcohol")).toBe(true);
    expect(snap.events).toHaveLength(1);
    expect(snap.events[0].id).toBe("skip-1");
  });

  it("adds timing cases to a leftover snapshot without wiping events", async () => {
    const existing = seedSnapshot("u1", "2026-09-07", "t1");
    existing.items = existing.items.filter(
      (item) =>
        item.label !== "Cafeïne 90 min na opstaan" &&
        item.label !== "Wandelen na eten" &&
        item.label !== "Scherm uit 22:00",
    );
    existing.events = [
      event({
        id: "keep-plus",
        date: "2026-09-07",
        kind: "set",
        value: 41,
        item_id: existing.items.find((item) => item.label === "Push-ups")!.id,
      }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(snap.events.map((row) => row.id)).toEqual(["keep-plus"]);
    expect(snap.items.find((item) => item.label === "Push-ups")?.a).toBe(40);
    expect(snap.items.find((item) => item.label === "Low carb")?.type).toBe("leefregel");
    expect(snap.items.some((item) => item.label === "Cafeïne 90 min na opstaan")).toBe(true);
    expect(snap.items.some((item) => item.label === "Wandelen na eten")).toBe(true);
    expect(snap.items.find((item) => item.label === "Cafeïne 90 min na opstaan")?.template).toBe(
      "public-framework",
    );
    expect(snap.items.find((item) => item.label === "Wandelen na eten")?.template).toBe(
      "evidence-informed",
    );
    expect(snap.items.find((item) => item.label === "Scherm uit 22:00")).toMatchObject({
      role: "constraint",
      template: "user preference",
    });
    expect(snap.items.find((item) => item.label === "Scherm uit 22:00")?.timing).toMatchObject({
      mode: "clock",
      clock: "22:00",
    });
    expect(snap.items.find((item) => item.label === "Low carb")?.template).toBe("user preference");
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(1);
  });

  it("adds stofjes to a leftover snapshot without wiping events", async () => {
    const existing = seedSnapshot("u1", "2026-09-07", "t1");
    existing.items = existing.items.filter(
      (item) => item.label !== "Medicijn ochtend" && item.label !== "Vitamine D",
    );
    existing.events = [
      event({
        id: "keep-walk",
        date: "2026-09-07",
        kind: "done",
        item_id: existing.items.find((item) => item.label === "Wandelen na eten")!.id,
      }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(snap.events.map((row) => row.id)).toEqual(["keep-walk"]);
    expect(snap.items.find((item) => item.label === "Medicijn ochtend")).toMatchObject({
      type: "medicijn",
      a: null,
      unit: null,
    });
    expect(snap.items.find((item) => item.label === "Vitamine D")).toMatchObject({
      type: "supplement",
      a: null,
      template: "guideline",
    });
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(1);
  });

  it("adds sociaal ritme items to leftover v6 without wiping events", async () => {
    const existing = seedSnapshot("u1", "2026-09-07", "t1");
    existing.items = existing.items.filter(
      (item) => item.label !== "Bellen met iemand" && item.label !== "Iemand zien",
    );
    existing.onboarded = true;
    existing.events = [
      event({
        id: "keep-sociaal",
        date: "2026-09-07",
        kind: "done",
        item_id: existing.items.find((item) => item.label === "Vitamine D")!.id,
      }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
    expect(snap.events.map((row) => row.id)).toEqual(["keep-sociaal"]);
    expect(snap.items.find((item) => item.label === "Bellen met iemand")).toMatchObject({
      type: "sociaal",
      a: null,
      unit: null,
    });
    expect(snap.items.find((item) => item.label === "Iemand zien")).toMatchObject({
      type: "sociaal",
      a: null,
    });
    expect(snap.items.every((item) => !/stijn|piet|jan|marie/i.test(item.label))).toBe(true);
    expect(snap.items.find((item) => item.label === "Push-ups")?.a).toBe(40);
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(1);
  });

  it("fills lock templates on leftover v6 items without wiping events", async () => {
    const existing = seedSnapshot("u1", "2026-09-13", "t1");
    existing.onboarded = true;
    existing.items = existing.items.map((item) =>
      item.label === "Wandelen na eten" ||
      item.label === "Cafeïne 90 min na opstaan" ||
      item.label === "Low carb" ||
      item.label === "Scherm uit 22:00" ||
      item.label === "Vitamine D" ||
      item.label === "Koud douchen"
        ? { ...item, template: null }
        : item,
    );
    existing.events = [
      event({
        id: "keep-template",
        date: "2026-09-13",
        kind: "done",
        item_id: existing.items.find((item) => item.label === "Push-ups")!.id,
      }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
    expect(snap.events.map((row) => row.id)).toEqual(["keep-template"]);
    expect(snap.items.find((item) => item.label === "Cafeïne 90 min na opstaan")?.template).toBe(
      "public-framework",
    );
    expect(snap.items.find((item) => item.label === "Wandelen na eten")?.template).toBe(
      "evidence-informed",
    );
    expect(snap.items.find((item) => item.label === "Low carb")).toMatchObject({
      template: "user preference",
      role: "preference",
      type: "leefregel",
    });
    expect(snap.items.find((item) => item.label === "Scherm uit 22:00")).toMatchObject({
      template: "user preference",
      role: "constraint",
    });
    expect(snap.items.find((item) => item.label === "Vitamine D")?.template).toBe("guideline");
    expect(snap.items.find((item) => item.label === "Koud douchen")?.template).toBe("hypothesis");
    expect(snap.items.find((item) => item.label === "Push-ups")?.a).toBe(40);
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(1);
  });

  it("adds silent screen-off clock to leftover v6 without wiping events", async () => {
    const existing = seedSnapshot("u1", "2026-09-13", "t1");
    existing.onboarded = true;
    existing.items = existing.items.filter((item) => item.label !== "Scherm uit 22:00");
    existing.events = [
      event({
        id: "keep-screen",
        date: "2026-09-13",
        kind: "done",
        item_id: existing.items.find((item) => item.label === "Push-ups")!.id,
      }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
    expect(snap.events.map((row) => row.id)).toEqual(["keep-screen"]);
    expect(snap.items.find((item) => item.label === "Scherm uit 22:00")).toMatchObject({
      type: "gedrag",
      role: "constraint",
      template: "user preference",
    });
    expect(snap.items.find((item) => item.label === "Scherm uit 22:00")?.timing).toMatchObject({
      mode: "clock",
      clock: "22:00",
    });
    expect(snap.items.some((item) => item.label === "Cafeïne 90 min na opstaan")).toBe(true);
    expect(snap.items.some((item) => item.label === "Wandelen na eten")).toBe(true);
    expect(snap.items.some((item) => item.label === "Medicijn ochtend")).toBe(true);
    expect(snap.items.some((item) => item.label === "Bellen met iemand")).toBe(true);
    expect(snap.items.find((item) => item.label === "Push-ups")?.a).toBe(40);
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(1);
  });

  it("adds korte rust window and condition to leftover v6 without wiping events", async () => {
    const existing = seedSnapshot("u1", "2026-09-13", "t1");
    existing.onboarded = true;
    existing.items = existing.items.filter((item) => item.label !== "Korte rust");
    const push = existing.items.find((item) => item.label === "Push-ups")!;
    existing.events = [
      event({
        id: "keep-rest",
        date: "2026-09-13",
        kind: "done",
        item_id: push.id,
      }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
    expect(snap.events.map((row) => row.id)).toEqual(["keep-rest"]);
    expect(snap.items.find((item) => item.label === "Korte rust")).toMatchObject({
      type: "gedrag",
      role: "action",
      template: "user preference",
    });
    expect(snap.items.find((item) => item.label === "Korte rust")?.timing).toMatchObject({
      mode: "clock",
      clock: "08:00",
      window_min: 840,
      condition: "body",
    });
    expect(snap.items.find((item) => item.id === push.id)).toMatchObject({
      label: "Push-ups",
      a: 40,
    });
    expect(snap.items.some((item) => item.label === "Scherm uit 22:00")).toBe(true);
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(1);
  });

  it("does not force onboarding on leftover v6 data", async () => {
    const existing = seedSnapshot("u1", "2026-09-09", "t1");
    existing.onboarded = undefined as unknown as boolean;
    existing.events = [
      event({
        id: "keep-2",
        date: "2026-09-09",
        kind: "set",
        value: 41,
        item_id: existing.items.find((item) => item.label === "Push-ups")!.id,
      }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(snap.onboarded).toBe(true);
    expect(snap.events.map((row) => row.id)).toEqual(["keep-2"]);
    expect(snap.items.every((item) => item.later === false)).toBe(true);
    expect(snap.items.some((item) => item.label === "Medicijn ochtend")).toBe(true);
  });

  it("shows onboarding only on a brand-new empty session", async () => {
    const store = createLocalStore();
    const snap = await store.load();
    expect(snap.onboarded).toBe(false);
    expect(snap.events).toEqual([]);
    await store.saveOnboarding({
      goals: ["kracht"],
      age_band: "50–59",
      startIds: [snap.items.find((item) => item.label === "Push-ups")!.id],
    });
    const after = await store.load();
    expect(after.onboarded).toBe(true);
    expect(after.profile.age_band).toBe("50–59");
    expect(after.profile.goals).toEqual(["kracht"]);
    expect(after.items.find((item) => item.label === "Push-ups")?.later).toBe(false);
    expect(after.items.find((item) => item.label === "Squats")?.later).toBe(true);
    expect(after.events).toEqual([]);
    expect(after.theme_step).toBe(true);
  });

  it("loads missing themes as empty and does not force the theme step", async () => {
    const existing = seedSnapshot("u1", "2026-09-09", "t1");
    existing.onboarded = true;
    existing.events = [
      event({
        id: "keep-theme",
        date: "2026-09-09",
        kind: "done",
        item_id: existing.items.find((item) => item.label === "Push-ups")!.id,
      }),
    ];
    delete (existing.profile as { themes?: string[] }).themes;
    delete (existing as { theme_step?: boolean }).theme_step;
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(snap.onboarded).toBe(true);
    expect(snap.profile.themes).toEqual([]);
    expect(snap.events.map((row) => row.id)).toEqual(["keep-theme"]);
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(1);

    await store.saveThemes(["Kickbox", "  Parkour  "]);
    const after = await store.load();
    expect(after.profile.themes).toEqual(["Kickbox", "Parkour"]);
    expect(after.theme_step).toBe(true);
    expect(after.events.map((row) => row.id)).toEqual(["keep-theme"]);
    expect(after.items.find((item) => item.label === "Push-ups")?.label).toBe("Push-ups");
    expect(after.onboarded).toBe(true);
  });

  it("keeps a miss reason on the live v6 key without wiping other events", async () => {
    const existing = seedSnapshot("u1", "2026-09-13", "t1");
    const push = existing.items.find((item) => item.label === "Push-ups")!;
    existing.events = [
      event({
        id: "keep-done",
        date: "2026-09-10",
        kind: "done",
        item_id: push.id,
      }),
    ];
    existing.onboarded = true;
    existing.profile.themes = ["Kickbox"];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(snap.events.map((row) => row.id)).toEqual(["keep-done"]);
    const miss = await store.addEvent({
      date: "2026-09-12",
      kind: "miss",
      value: null,
      skip_reason: "vergeten",
      item_id: push.id,
    });
    const again = await store.load();
    expect(again.events.map((row) => row.id)).toEqual(["keep-done", miss.id]);
    expect(again.events[1]).toMatchObject({ kind: "miss", skip_reason: "vergeten" });
    expect(again.profile.themes).toEqual(["Kickbox"]);
    expect(again.onboarded).toBe(true);
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(2);
  });

  it("edits goals, age, and Later on leftover v6 without wiping events", async () => {
    const existing = seedSnapshot("u1", "2026-09-13", "t1");
    const push = existing.items.find((item) => item.label === "Push-ups")!;
    const squat = existing.items.find((item) => item.label === "Squats")!;
    existing.onboarded = true;
    existing.profile.goals = ["kracht"];
    existing.profile.age_band = "50–59";
    existing.profile.themes = ["Kickbox"];
    existing.events = [
      event({
        id: "keep-line",
        date: "2026-09-10",
        kind: "set",
        value: 41,
        item_id: push.id,
      }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(snap.events.map((row) => row.id)).toEqual(["keep-line"]);

    await store.saveProfile({
      ...snap.profile,
      goals: ["kracht", "bewegen"],
      age_band: "40–49",
    });
    await store.setItemLater(squat.id, true);
    const after = await store.load();
    expect(after.events.map((row) => row.id)).toEqual(["keep-line"]);
    expect(after.profile.goals).toEqual(["kracht", "bewegen"]);
    expect(after.profile.age_band).toBe("40–49");
    expect(after.profile.themes).toEqual(["Kickbox"]);
    expect(after.items.find((item) => item.id === squat.id)?.later).toBe(true);
    expect(after.items.find((item) => item.id === push.id)?.later).toBe(false);
    expect(after.onboarded).toBe(true);
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(1);
  });

  it("adds a user item on leftover v6 without wiping events or seed rows", async () => {
    const existing = seedSnapshot("u1", "2026-09-13", "t1");
    const push = existing.items.find((item) => item.label === "Push-ups")!;
    existing.onboarded = true;
    existing.profile.themes = ["Kickbox"];
    existing.events = [
      event({
        id: "keep-own",
        date: "2026-09-12",
        kind: "done",
        item_id: push.id,
      }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
    expect(snap.events.map((row) => row.id)).toEqual(["keep-own"]);

    const added = await store.addItem({
      label: "Avondwandeling",
      kind: "gedrag",
      timing: "20:00",
    });
    expect(added).toMatchObject({
      type: "gedrag",
      label: "Avondwandeling",
      a: null,
      unit: null,
      template: "user preference",
    });
    expect(added.timing).toMatchObject({ mode: "clock", clock: "20:00" });

    const after = await store.load();
    expect(after.events.map((row) => row.id)).toEqual(["keep-own"]);
    expect(after.items.find((item) => item.id === added.id)?.label).toBe("Avondwandeling");
    expect(after.items.find((item) => item.label === "Push-ups")?.a).toBe(40);
    expect(after.items.find((item) => item.label === "Scherm uit 22:00")).toMatchObject({
      role: "constraint",
      template: "user preference",
    });
    expect(after.items.find((item) => item.label === "Medicijn ochtend")?.type).toBe("medicijn");
    expect(after.profile.themes).toEqual(["Kickbox"]);
    expect(after.onboarded).toBe(true);
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(1);

    await expect(store.addItem({ label: "avondwandeling", kind: "regel" })).rejects.toThrow(
      "item bestaat al",
    );
    await expect(store.addItem({ label: "   ", kind: "sociaal" })).rejects.toThrow("naam ontbreekt");
    const again = await store.load();
    expect(again.events.map((row) => row.id)).toEqual(["keep-own"]);
    expect(again.items.filter((item) => item.label.toLowerCase() === "avondwandeling")).toHaveLength(
      1,
    );
  });

  it("edits and removes a user item on leftover v6 without wiping events or seed", async () => {
    const existing = seedSnapshot("u1", "2026-09-13", "t1");
    const push = existing.items.find((item) => item.label === "Push-ups")!;
    const squat = existing.items.find((item) => item.label === "Squats")!;
    existing.onboarded = true;
    existing.profile.themes = ["Kickbox"];
    existing.events = [
      event({
        id: "keep-edit",
        date: "2026-09-12",
        kind: "done",
        item_id: push.id,
      }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const own = await store.addItem({
      label: "Avondwandeling",
      kind: "gedrag",
      timing: "20:00",
    });
    await store.addEvent({
      date: "2026-09-13",
      kind: "done",
      item_id: own.id,
      value: null,
      skip_reason: null,
    });

    const edited = await store.updateItem({
      id: own.id,
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
    await expect(
      store.updateItem({ id: own.id, label: "Push-ups", kind: "gedrag" }),
    ).rejects.toThrow("item bestaat al");
    await expect(
      store.updateItem({ id: push.id, label: "Eigen kracht", kind: "gedrag" }),
    ).rejects.toThrow("alleen eigen item");

    const afterEdit = await store.load();
    expect(afterEdit.events.map((row) => row.id)).toEqual(["keep-edit", afterEdit.events[1].id]);
    expect(afterEdit.events[1].item_id).toBe(own.id);
    expect(afterEdit.items.find((item) => item.id === own.id)?.label).toBe("Nachtwandeling");
    expect(afterEdit.items.find((item) => item.label === "Push-ups")?.a).toBe(40);

    const gone = await store.removeItem(own.id);
    expect(gone).toMatchObject({ id: own.id, removed: true });
    const parked = await store.removeItem(squat.id);
    expect(parked).toMatchObject({ id: squat.id, later: true });
    expect(parked.removed).toBeFalsy();

    const after = await store.load();
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
    expect(after.events.map((row) => row.id)).toEqual(["keep-edit", after.events[1].id]);
    expect(after.events[1].item_id).toBe(own.id);
    expect(after.items.find((item) => item.id === own.id)?.removed).toBe(true);
    expect(after.items.find((item) => item.label === "Squats")?.later).toBe(true);
    expect(after.items.find((item) => item.label === "Push-ups")?.a).toBe(40);
    expect(after.items.find((item) => item.label === "Scherm uit 22:00")).toMatchObject({
      role: "constraint",
      template: "user preference",
    });
    expect(after.profile.themes).toEqual(["Kickbox"]);
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(2);

    const restored = await store.addItem({
      label: "nachtwandeling",
      kind: "sociaal",
      timing: "19:00",
    });
    expect(restored.id).toBe(own.id);
    expect(restored).toMatchObject({ type: "sociaal", removed: false, later: false });
    const again = await store.load();
    expect(again.events[1].item_id).toBe(own.id);
    expect(again.events.map((row) => row.id)).toEqual(["keep-edit", again.events[1].id]);
  });

  it("keeps a body_wake event on leftover v6 without wiping other events", async () => {
    const existing = seedSnapshot("u1", "2026-09-13", "t1");
    existing.onboarded = true;
    const push = existing.items.find((item) => item.label === "Push-ups")!;
    existing.events = [
      event({
        id: "keep-done",
        date: "2026-09-13",
        kind: "done",
        item_id: push.id,
      }),
      event({
        id: "old-wake",
        date: "2026-09-12",
        kind: "body_wake",
        value: 390,
        item_id: null,
      }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
    expect(snap.events.map((row) => row.id)).toEqual(expect.arrayContaining(["keep-done", "old-wake"]));
    expect(snap.events).toHaveLength(2);
    expect(snap.events.find((row) => row.id === "old-wake")).toMatchObject({
      kind: "body_wake",
      value: 390,
      item_id: null,
    });

    const logged = await store.addEvent({
      date: "2026-09-13",
      kind: "body_wake",
      value: 420,
      skip_reason: null,
      item_id: null,
    });
    expect(logged).toMatchObject({ kind: "body_wake", value: 420, item_id: null });
    const again = await store.load();
    expect(again.events.map((row) => row.id)).toEqual(
      expect.arrayContaining(["keep-done", "old-wake", logged.id]),
    );
    expect(again.events).toHaveLength(3);
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(3);
  });

  it("keeps a body_meal event on leftover v6 without wiping other events", async () => {
    const existing = seedSnapshot("u1", "2026-09-13", "t1");
    existing.onboarded = true;
    const push = existing.items.find((item) => item.label === "Push-ups")!;
    existing.events = [
      event({
        id: "keep-done",
        date: "2026-09-13",
        kind: "done",
        item_id: push.id,
      }),
      event({
        id: "old-meal",
        date: "2026-09-12",
        kind: "body_meal",
        value: 750,
        item_id: null,
      }),
      event({
        id: "keep-wake",
        date: "2026-09-13",
        kind: "body_wake",
        value: 420,
        item_id: null,
      }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
    expect(snap.events.map((row) => row.id)).toEqual(
      expect.arrayContaining(["keep-done", "old-meal", "keep-wake"]),
    );
    expect(snap.events).toHaveLength(3);
    expect(snap.events.find((row) => row.id === "old-meal")).toMatchObject({
      kind: "body_meal",
      value: 750,
      item_id: null,
    });
    expect(snap.events.find((row) => row.id === "keep-wake")).toMatchObject({
      kind: "body_wake",
      value: 420,
    });

    const logged = await store.addEvent({
      date: "2026-09-13",
      kind: "body_meal",
      value: 780,
      skip_reason: null,
      item_id: null,
    });
    expect(logged).toMatchObject({ kind: "body_meal", value: 780, item_id: null });
    const again = await store.load();
    expect(again.events.map((row) => row.id)).toEqual(
      expect.arrayContaining(["keep-done", "old-meal", "keep-wake", logged.id]),
    );
    expect(again.events).toHaveLength(4);
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(4);
  });

  it("logs sleep and energy for gear-down without wiping wake, meal, or weight", async () => {
    const existing = seedSnapshot("u1", "2026-09-13", "t1");
    existing.onboarded = true;
    const push = existing.items.find((item) => item.label === "Push-ups")!;
    existing.events = [
      event({ id: "keep-done", date: "2026-09-13", kind: "done", item_id: push.id }),
      event({ id: "keep-wake", date: "2026-09-13", kind: "body_wake", value: 420, item_id: null }),
      event({ id: "keep-meal", date: "2026-09-13", kind: "body_meal", value: 780, item_id: null }),
      event({ id: "keep-kg", date: "2026-09-13", kind: "body_weight", value: 88.4, item_id: null }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
    expect(snap.events).toHaveLength(4);

    const sleep = await store.addEvent({
      date: "2026-09-13",
      kind: "body_sleep",
      value: 5.5,
      skip_reason: null,
      item_id: null,
    });
    const energy = await store.addEvent({
      date: "2026-09-13",
      kind: "body_energy",
      value: 1,
      skip_reason: null,
      item_id: null,
    });
    const again = await store.load();
    expect(again.events.map((row) => row.id)).toEqual(
      expect.arrayContaining(["keep-done", "keep-wake", "keep-meal", "keep-kg", sleep.id, energy.id]),
    );
    expect(again.events).toHaveLength(6);
    expect(again.events.find((row) => row.id === "keep-wake")).toMatchObject({
      kind: "body_wake",
      value: 420,
    });
    expect(again.events.find((row) => row.id === "keep-meal")).toMatchObject({
      kind: "body_meal",
      value: 780,
    });
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(6);
  });

  it("keeps a body_weight event on leftover v6 without wiping other events", async () => {
    const existing = seedSnapshot("u1", "2026-09-13", "t1");
    existing.onboarded = true;
    const push = existing.items.find((item) => item.label === "Push-ups")!;
    existing.events = [
      event({
        id: "keep-weight",
        date: "2026-09-13",
        kind: "done",
        item_id: push.id,
      }),
      event({
        id: "old-kg",
        date: "2026-09-12",
        kind: "body_weight",
        value: 88.4,
        item_id: null,
      }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
    expect(snap.events.map((row) => row.id)).toEqual(expect.arrayContaining(["keep-weight", "old-kg"]));
    expect(snap.events).toHaveLength(2);
    expect(snap.events.find((row) => row.id === "old-kg")).toMatchObject({
      kind: "body_weight",
      value: 88.4,
      item_id: null,
    });
    expect(snap.items.find((item) => item.id === push.id)).toMatchObject({
      label: "Push-ups",
      a: 40,
    });

    const logged = await store.addEvent({
      date: "2026-09-13",
      kind: "body_weight",
      value: 88.3,
      skip_reason: null,
      item_id: null,
    });
    expect(logged).toMatchObject({ kind: "body_weight", value: 88.3, item_id: null });
    const again = await store.load();
    expect(again.events.map((row) => row.id)).toEqual(
      expect.arrayContaining(["keep-weight", "old-kg", logged.id]),
    );
    expect(again.events).toHaveLength(3);
    expect(again.events.find((row) => row.id === logged.id)).toMatchObject({
      kind: "body_weight",
      value: 88.3,
    });
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(3);
  });

  it("merges a JSON import into leftover v6 without wiping events or ids", async () => {
    const existing = seedSnapshot("u1", "2026-09-13", "t1");
    const push = existing.items.find((item) => item.label === "Push-ups")!;
    existing.onboarded = true;
    existing.profile.themes = ["Kickbox"];
    existing.profile.goals = ["kracht"];
    existing.events = [
      event({
        id: "keep-import",
        date: "2026-09-12",
        kind: "done",
        item_id: push.id,
      }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const incoming = seedSnapshot("u2", "2026-09-10", "t2");
    incoming.items.find((item) => item.label === "Push-ups")!.id = "foreign-push";
    incoming.items.push({
      ...incoming.items[0],
      id: "walk-1",
      label: "Avondwandeling",
      type: "gedrag",
      a: null,
      b: null,
      milestone: null,
      unit: null,
    });
    incoming.profile.themes = ["Spinnen"];
    incoming.events = [
      event({
        id: "keep-import",
        date: "2026-09-12",
        kind: "set",
        value: 99,
        item_id: "foreign-push",
      }),
      event({
        id: "new-kg",
        date: "2026-09-11",
        kind: "body_weight",
        value: 88.4,
        item_id: null,
      }),
      event({
        id: "new-wake",
        date: "2026-09-11",
        kind: "body_wake",
        value: 420,
        item_id: null,
      }),
      event({
        id: "new-meal",
        date: "2026-09-11",
        kind: "body_meal",
        value: 780,
        item_id: null,
      }),
    ];

    const store = createLocalStore();
    const before = localStorage.getItem(LOCAL_STORAGE_KEY)!;
    await expect(store.importJson("{")).rejects.toThrow(IMPORT_ERROR);
    expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(before);

    const after = await store.importJson(exportPayload(incoming));
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
    expect(after.events.map((row) => row.id)).toEqual(
      expect.arrayContaining(["keep-import", "new-kg", "new-wake", "new-meal"]),
    );
    expect(after.events.find((row) => row.id === "new-kg")).toMatchObject({
      kind: "body_weight",
      value: 88.4,
    });
    expect(after.events.find((row) => row.id === "new-wake")).toMatchObject({
      kind: "body_wake",
      value: 420,
    });
    expect(after.events.find((row) => row.id === "new-meal")).toMatchObject({
      kind: "body_meal",
      value: 780,
    });
    expect(after.events.find((row) => row.id === "keep-import")).toMatchObject({
      kind: "done",
      item_id: push.id,
    });
    expect(after.items.find((item) => item.label === "Push-ups")?.id).toBe(push.id);
    expect(after.items.find((item) => item.label === "Avondwandeling")?.id).toBe("walk-1");
    expect(after.profile.themes).toEqual(["Kickbox", "Spinnen"]);
    expect(after.profile.goals).toEqual(["kracht"]);
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events.map((row: { id: string }) => row.id)).toEqual(
      expect.arrayContaining(["keep-import", "new-kg", "new-wake", "new-meal"]),
    );

    const again = await store.importJson(exportPayload(after));
    expect(again.events.filter((row) => row.id === "keep-import")).toHaveLength(1);
    expect(again.events.filter((row) => row.id === "new-kg")).toHaveLength(1);
    expect(again.events.filter((row) => row.id === "new-wake")).toHaveLength(1);
    expect(again.events.filter((row) => row.id === "new-meal")).toHaveLength(1);
    expect(again.items.filter((item) => item.label === "Push-ups")).toHaveLength(1);
    expect(again.items.find((item) => item.label === "Push-ups")?.id).toBe(push.id);
  });

  it("advances the etappe on leftover v6 without wiping clocks or events", async () => {
    const existing = seedSnapshot("u1", "2026-09-13", "t1");
    const push = existing.items.find((item) => item.label === "Push-ups")!;
    existing.onboarded = true;
    existing.events = [
      event({ id: "keep-done", date: "2026-09-13", kind: "set", value: 45, item_id: push.id }),
      event({ id: "keep-kg", date: "2026-09-13", kind: "body_weight", value: 88.4, item_id: null }),
      event({ id: "keep-wake", date: "2026-09-13", kind: "body_wake", value: 420, item_id: null }),
      event({ id: "keep-meal", date: "2026-09-13", kind: "body_meal", value: 780, item_id: null }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const before = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!) as Snapshot;
    expect(before.stage.milestone).toBe(45);
    const next = await store.advanceStage(before.stage, 50);
    expect(next.milestone).toBe(50);
    const after = await store.load();
    expect(after.stage.milestone).toBe(50);
    expect(after.items.find((item) => item.id === push.id)?.milestone).toBe(50);
    expect(after.events.map((row) => row.id)).toEqual(
      expect.arrayContaining(["keep-done", "keep-kg", "keep-wake", "keep-meal"]),
    );
    expect(after.events).toHaveLength(4);
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(4);
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
  });

  it("undoes today's last action on leftover v6 without wiping other events", async () => {
    const existing = seedSnapshot("u1", "2026-09-13", "t1");
    const push = existing.items.find((item) => item.label === "Push-ups")!;
    const walk = existing.items.find((item) => item.label === "Wandelen na eten")!;
    existing.onboarded = true;
    existing.profile.themes = ["Kickbox"];
    const today = todayISO();
    existing.events = [
      event({
        id: "keep-old",
        date: "2026-09-12",
        kind: "done",
        item_id: push.id,
      }),
      event({
        id: "keep-walk",
        date: today,
        kind: "done",
        item_id: walk.id,
      }),
      event({
        id: "keep-kg",
        date: today,
        kind: "body_weight",
        value: 88.4,
        item_id: null,
      }),
      event({
        id: "keep-wake",
        date: today,
        kind: "body_wake",
        value: 420,
        item_id: null,
      }),
      event({
        id: "keep-meal",
        date: today,
        kind: "body_meal",
        value: 780,
        item_id: null,
      }),
      event({
        id: "today-plus",
        date: today,
        kind: "set",
        value: 41,
        item_id: push.id,
      }),
    ];
    localStorage.setItem(LOCAL_USER_KEY, "u1");
    localStorage.setItem(LOCAL_TENANT_KEY, "t1");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));

    const store = createLocalStore();
    const snap = await store.load();
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
    expect(snap.events.map((row) => row.id)).toEqual(
      expect.arrayContaining(["keep-old", "keep-walk", "keep-kg", "keep-wake", "keep-meal", "today-plus"]),
    );

    await store.removeEvent("today-plus");
    const after = await store.load();
    expect(after.events.map((row) => row.id)).toEqual(
      expect.arrayContaining(["keep-old", "keep-walk", "keep-kg", "keep-wake", "keep-meal"]),
    );
    expect(after.events.map((row) => row.id)).not.toContain("today-plus");
    expect(after.events).toHaveLength(5);
    expect(after.events.find((row) => row.id === "keep-kg")).toMatchObject({
      kind: "body_weight",
      value: 88.4,
    });
    expect(after.events.find((row) => row.id === "keep-wake")).toMatchObject({
      kind: "body_wake",
      value: 420,
    });
    expect(after.events.find((row) => row.id === "keep-meal")).toMatchObject({
      kind: "body_meal",
      value: 780,
    });
    expect(after.items.find((item) => item.id === push.id)).toMatchObject({
      label: "Push-ups",
      a: 40,
    });
    expect(after.profile.themes).toEqual(["Kickbox"]);
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events.map((row: { id: string }) => row.id)).toEqual(
      expect.arrayContaining(["keep-old", "keep-walk", "keep-kg", "keep-wake", "keep-meal"]),
    );

    await expect(store.removeEvent("keep-old")).rejects.toThrow("alleen vandaag");
    await expect(store.removeEvent("keep-kg")).rejects.toThrow("alleen vandaag");
    await expect(store.removeEvent("keep-wake")).rejects.toThrow("alleen vandaag");
    await expect(store.removeEvent("keep-meal")).rejects.toThrow("alleen vandaag");
    const again = await store.load();
    expect(again.events.map((row) => row.id)).toEqual(
      expect.arrayContaining(["keep-old", "keep-walk", "keep-kg", "keep-wake", "keep-meal"]),
    );
    expect(again.events).toHaveLength(5);
  });

  it("sees leftover keys as an existing session", () => {
    localStorage.setItem("routine_loop_v4", JSON.stringify(seedSnapshot("u1", "2026-09-07", "t1")));
    expect(hasLocalSession()).toBe(true);
    expect(localStorage.getItem(LOCAL_CHOSEN_KEY)).toBeNull();
  });
});
