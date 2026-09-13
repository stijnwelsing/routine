import { describe, expect, it } from "vitest";
import { exportPayload } from "./export";
import { IMPORT_ERROR, mergeImport, parseImport } from "./import";
import { seedSnapshot } from "./seed";
import { LOCAL_STORAGE_KEY } from "./types";

function event(
  id: string,
  extra: { item_id?: string | null; kind?: "done" | "body_weight" | "set"; value?: number | null } = {},
) {
  return {
    id,
    tenant_id: "other",
    user_id: "other",
    item_id: extra.item_id ?? null,
    date: "2026-09-12",
    kind: extra.kind ?? "done",
    value: extra.value ?? null,
    skip_reason: null,
    created_at: "2026-09-12T10:00:00.000Z",
  } as const;
}

describe("JSON import merge", () => {
  it("rejects invalid files without touching the current snapshot", () => {
    const current = seedSnapshot("u1", "2026-09-13", "t1");
    const before = JSON.stringify(current);

    expect(() => parseImport("{")).toThrow(IMPORT_ERROR);
    expect(() => parseImport("[]")).toThrow(IMPORT_ERROR);
    expect(() => parseImport("{}")).toThrow(IMPORT_ERROR);
    expect(() => parseImport(JSON.stringify({ key: "other_app", profile: {}, items: [], events: [] }))).toThrow(
      IMPORT_ERROR,
    );
    expect(() => parseImport(JSON.stringify({ profile: {}, items: "nope", events: [] }))).toThrow(IMPORT_ERROR);
    expect(JSON.stringify(current)).toBe(before);
  });

  it("merges new labels and events and keeps existing ids on conflict", () => {
    const current = seedSnapshot("u1", "2026-09-13", "t1");
    const push = current.items.find((item) => item.label === "Push-ups")!;
    current.profile.goals = ["kracht"];
    current.profile.themes = ["Kickbox"];
    current.profile.identity_new = "Blijf rustig";
    current.events = [event("keep-local", { item_id: push.id, kind: "done" })];
    const beforeEvents = current.events.map((row) => row.id);
    const beforePushId = push.id;

    const incoming = seedSnapshot("u2", "2026-09-10", "t2");
    const incomingPush = incoming.items.find((item) => item.label === "Push-ups")!;
    incomingPush.id = "foreign-push";
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
    incoming.profile.goals = ["kracht", "eten"];
    incoming.profile.themes = ["Spinnen"];
    incoming.profile.identity_new = "Andere zin";
    incoming.profile.identity_anti = "Niet terug";
    incoming.events = [
      event("keep-local", { item_id: incomingPush.id, kind: "set", value: 99 }),
      event("new-weight", { kind: "body_weight", value: 88.4 }),
      event("walk-done", { item_id: "walk-1", kind: "done" }),
      event("foreign-push-done", { item_id: incomingPush.id, kind: "done" }),
    ];

    const merged = mergeImport(current, incoming);

    expect(merged.events.find((row) => row.id === "keep-local")).toMatchObject({
      kind: "done",
      item_id: beforePushId,
      value: null,
    });
    expect(merged.events.map((row) => row.id)).toEqual(
      expect.arrayContaining(["keep-local", "new-weight", "walk-done", "foreign-push-done"]),
    );
    expect(merged.events.find((row) => row.id === "foreign-push-done")?.item_id).toBe(beforePushId);
    expect(merged.events.find((row) => row.id === "walk-done")?.item_id).toBe("walk-1");
    expect(merged.events.find((row) => row.id === "new-weight")).toMatchObject({
      kind: "body_weight",
      value: 88.4,
    });
    expect(merged.items.find((item) => item.label === "Push-ups")?.id).toBe(beforePushId);
    expect(merged.items.find((item) => item.label === "Avondwandeling")?.id).toBe("walk-1");
    expect(merged.profile.goals).toEqual(["kracht", "eten"]);
    expect(merged.profile.themes).toEqual(["Kickbox", "Spinnen"]);
    expect(merged.profile.identity_new).toBe("Blijf rustig");
    expect(merged.profile.identity_anti).toBe("Niet terug");
    expect(merged.vector.a).toBe(current.vector.a);
    expect(merged.stage.milestone).toBe(current.stage.milestone);
    expect(current.events.map((row) => row.id)).toEqual(beforeEvents);
    expect(current.items.find((item) => item.label === "Push-ups")?.id).toBe(beforePushId);
    expect(current.items.some((item) => item.label === "Avondwandeling")).toBe(false);
  });

  it("roundtrips export → import without dropping local ids or events", () => {
    const current = seedSnapshot("u1", "2026-09-13", "t1");
    const push = current.items.find((item) => item.label === "Push-ups")!;
    current.profile.goals = ["kracht", "eten"];
    current.profile.themes = ["Kickbox"];
    current.onboarded = true;
    current.theme_step = true;
    current.events = [
      event("keep-weight", { kind: "body_weight", value: 88.4 }),
      event("keep-done", { item_id: push.id, kind: "done" }),
    ];
    const payload = exportPayload(current);
    const parsed = parseImport(payload);
    expect(parsed.items.map((item) => item.id)).toEqual(current.items.map((item) => item.id));

    const merged = mergeImport(current, parsed);
    expect(merged.events.map((row) => row.id)).toEqual(["keep-weight", "keep-done"]);
    expect(merged.events[0]).toMatchObject({ kind: "body_weight", value: 88.4 });
    expect(merged.items.map((item) => item.id)).toEqual(current.items.map((item) => item.id));
    expect(merged.items.map((item) => item.label)).toEqual(current.items.map((item) => item.label));
    expect(merged.profile.goals).toEqual(["kracht", "eten"]);
    expect(merged.profile.themes).toEqual(["Kickbox"]);
    expect(JSON.parse(payload).key).toBe(LOCAL_STORAGE_KEY);
  });
});
