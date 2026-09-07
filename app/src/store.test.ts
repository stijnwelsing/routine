import { afterEach, beforeEach, describe, expect, it } from "vitest";
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
        item.label !== "Cafeïne 90 min na opstaan" && item.label !== "Wandelen na eten",
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
    expect(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!).events).toHaveLength(1);
  });

  it("sees leftover keys as an existing session", () => {
    localStorage.setItem("routine_loop_v4", JSON.stringify(seedSnapshot("u1", "2026-09-07", "t1")));
    expect(hasLocalSession()).toBe(true);
    expect(localStorage.getItem(LOCAL_CHOSEN_KEY)).toBeNull();
  });
});
