import { describe, expect, it } from "vitest";
import { exportPayload } from "./export";
import { seedSnapshot } from "./seed";
import { LOCAL_STORAGE_KEY } from "./types";

describe("JSON export", () => {
  it("covers the v6 snapshot: items, events, themes, goals, weight, wake", () => {
    const snapshot = seedSnapshot("u1", "2026-09-13", "t1");
    snapshot.profile.goals = ["kracht", "eten"];
    snapshot.profile.themes = ["Kickbox"];
    snapshot.onboarded = true;
    snapshot.theme_step = true;
    snapshot.events = [
      {
        id: "keep-weight",
        tenant_id: "t1",
        user_id: "u1",
        item_id: null,
        date: "2026-09-13",
        kind: "body_weight",
        value: 88.4,
        skip_reason: null,
        created_at: "2026-09-13T07:00:00.000Z",
      },
      {
        id: "keep-wake",
        tenant_id: "t1",
        user_id: "u1",
        item_id: null,
        date: "2026-09-13",
        kind: "body_wake",
        value: 420,
        skip_reason: null,
        created_at: "2026-09-13T05:10:00.000Z",
      },
    ];

    const before = JSON.stringify(snapshot);
    const parsed = JSON.parse(exportPayload(snapshot)) as {
      key: string;
      profile: typeof snapshot.profile;
      items: typeof snapshot.items;
      vector: typeof snapshot.vector;
      stage: typeof snapshot.stage;
      events: typeof snapshot.events;
      rotated: boolean;
      onboarded: boolean;
      theme_step: boolean;
    };

    expect(parsed.key).toBe(LOCAL_STORAGE_KEY);
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
    expect(parsed.profile.goals).toEqual(["kracht", "eten"]);
    expect(parsed.profile.themes).toEqual(["Kickbox"]);
    expect(parsed.items.map((item) => item.label)).toEqual(snapshot.items.map((item) => item.label));
    expect(parsed.items.find((item) => item.label === "Vitamine D")?.template).toBe("guideline");
    expect(parsed.items.find((item) => item.label === "Koud douchen")?.template).toBe("hypothesis");
    expect(parsed.vector.a).toBe(40);
    expect(parsed.stage.milestone).toBe(45);
    expect(parsed.events).toEqual(snapshot.events);
    expect(parsed.events[0]).toMatchObject({ kind: "body_weight", value: 88.4 });
    expect(parsed.events[1]).toMatchObject({ kind: "body_wake", value: 420 });
    expect(parsed.rotated).toBe(false);
    expect(parsed.onboarded).toBe(true);
    expect(parsed.theme_step).toBe(true);
    expect(JSON.stringify(snapshot)).toBe(before);
  });
});
