import { describe, expect, it } from "vitest";
import { emptyTiming, normalizeTiming, opensAt, timingNote, timingPhase } from "./timing";
import { testTenantItems } from "./seed";
import type { Item, Timing, TimingContext } from "./types";

function ctx(partial: Partial<TimingContext> = {}): TimingContext {
  return {
    now: partial.now ?? new Date(2026, 8, 7, 10, 0, 0),
    today: partial.today ?? "2026-09-07",
    wakeAt: partial.wakeAt ?? null,
    mealAt: partial.mealAt ?? null,
  };
}

function item(partial: Partial<Item> & Pick<Item, "label">): Item {
  return {
    id: "i1",
    tenant_id: "t1",
    type: "gedrag",
    unit: null,
    a: null,
    b: null,
    milestone: null,
    weekdays: null,
    times_per_week: null,
    sort: 0,
    timing: emptyTiming(),
    role: null,
    template: null,
    ...partial,
  };
}

describe("timing engine", () => {
  it("loads leftover items that have no timing fields", () => {
    const raw = { label: "Push-ups" } as Partial<Timing>;
    expect(normalizeTiming(undefined)).toEqual(emptyTiming());
    expect(normalizeTiming(raw)).toMatchObject({
      mode: null,
      clock: null,
      anchor: null,
    });
  });

  it("opens a clock time on that day", () => {
    const timing: Timing = {
      ...emptyTiming(),
      mode: "clock",
      clock: "22:00",
      frequency: "daily",
    };
    const open = opensAt(timing, ctx());
    expect(open?.getHours()).toBe(22);
    expect(open?.getMinutes()).toBe(0);
    const before = timingPhase(
      item({
        label: "Scherm uit",
        role: "action",
        timing,
      }),
      ctx({ now: new Date(2026, 8, 7, 21, 0, 0) }),
    );
    const after = timingPhase(
      item({
        label: "Scherm uit",
        role: "action",
        timing,
      }),
      ctx({ now: new Date(2026, 8, 7, 22, 5, 0) }),
    );
    expect(before).toBe("wait");
    expect(after).toBe("due");
  });

  it("opens relative to wake after the offset", () => {
    const timing: Timing = {
      ...emptyTiming(),
      mode: "relative",
      anchor: "wake",
      offset_min: 90,
      frequency: "daily",
    };
    const wakeAt = new Date(2026, 8, 7, 7, 0, 0);
    const open = opensAt(timing, ctx({ wakeAt }));
    expect(open?.getHours()).toBe(8);
    expect(open?.getMinutes()).toBe(30);
  });

  it("keeps a relative action due when the anchor is not logged yet", () => {
    const walk = testTenantItems("t1").find((row) => row.label === "Wandelen na eten")!;
    expect(timingPhase(walk, ctx())).toBe("due");
    expect(timingNote(walk)).toBe("na eten");
  });

  it("keeps constraints silent on Today", () => {
    const caffeine = testTenantItems("t1").find((row) => row.label === "Cafeïne 90 min na opstaan")!;
    expect(caffeine.role).toBe("constraint");
    expect(caffeine.template).toBe("public-framework");
    expect(caffeine.timing).toMatchObject({
      mode: "relative",
      anchor: "wake",
      offset_min: 90,
    });
    expect(timingPhase(caffeine, ctx())).toBe("silent");
    expect(timingNote(caffeine)).toBe("90 min na opstaan");
  });

  it("respects a window after open", () => {
    const timing: Timing = {
      ...emptyTiming(),
      mode: "clock",
      clock: "08:00",
      window_min: 60,
      frequency: "daily",
    };
    const late = timingPhase(
      item({ label: "Venster", role: "action", timing }),
      ctx({ now: new Date(2026, 8, 7, 9, 30, 0) }),
    );
    expect(late).toBe("closed");
  });
});
