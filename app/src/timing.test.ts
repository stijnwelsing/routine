import { describe, expect, it } from "vitest";
import {
  applyLockedTiming,
  conditionNote,
  defaultRole,
  emptyTiming,
  isVisibleToday,
  normalizeTiming,
  opensAt,
  timingNote,
  timingPhase,
  windowNote,
} from "./timing";
import { testTenantItems } from "./seed";
import type { Item, Timing, TimingContext } from "./types";

function ctx(partial: Partial<TimingContext> = {}): TimingContext {
  return {
    now: partial.now ?? new Date(2026, 8, 7, 10, 0, 0),
    today: partial.today ?? "2026-09-07",
    wakeAt: partial.wakeAt ?? null,
    mealAt: partial.mealAt ?? null,
    sleepSet: partial.sleepSet,
    energySet: partial.energySet,
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
    later: false,
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
    const walk = testTenantItems("t1").find((row) => row.label === "Wandelen na eten")!;
    expect(walk.template).toBe("evidence-informed");
    expect(caffeine.timing).toMatchObject({
      mode: "relative",
      anchor: "wake",
      offset_min: 90,
    });
    expect(timingPhase(caffeine, ctx())).toBe("silent");
    expect(timingNote(caffeine)).toBe("90 min na opstaan");
    const screen = testTenantItems("t1").find((row) => row.label === "Scherm uit 22:00")!;
    expect(screen.role).toBe("constraint");
    expect(screen.template).toBe("user preference");
    expect(screen.timing).toMatchObject({
      mode: "clock",
      clock: "22:00",
      frequency: "daily",
    });
    expect(timingPhase(screen, ctx({ now: new Date(2026, 8, 7, 21, 0, 0) }))).toBe("silent");
    expect(timingPhase(screen, ctx({ now: new Date(2026, 8, 7, 22, 5, 0) }))).toBe("silent");
    expect(timingNote(screen)).toBe("22:00");
    expect(defaultRole({ role: null, label: "Scherm uit 22:00" })).toBe("constraint");
    expect(defaultRole({ role: null, label: "Cafeïne 90 min na opstaan" })).toBe("constraint");
  });

  it("lets a social clock reminder wait until that time", () => {
    const call = testTenantItems("t1").find((row) => row.label === "Bellen met iemand")!;
    expect(call.type).toBe("sociaal");
    expect(call.timing).toMatchObject({
      mode: "clock",
      clock: "18:00",
      frequency: "daily",
    });
    expect(timingNote(call)).toBe("18:00");
    expect(
      timingPhase(call, ctx({ now: new Date(2026, 8, 7, 17, 0, 0) })),
    ).toBe("wait");
    expect(
      timingPhase(call, ctx({ now: new Date(2026, 8, 7, 18, 5, 0) })),
    ).toBe("due");
  });

  it("lets frequency-only reminders be due without a relative event", () => {
    const medicine = testTenantItems("t1").find((row) => row.label === "Medicijn ochtend")!;
    expect(medicine.timing.mode).toBeNull();
    expect(medicine.timing.anchor).toBeNull();
    expect(medicine.timing.frequency).toBe("daily");
    expect(timingPhase(medicine, ctx())).toBe("due");
    expect(timingNote(medicine)).toBe("ochtend");
    const see = testTenantItems("t1").find((row) => row.label === "Iemand zien")!;
    expect(see.type).toBe("sociaal");
    expect(see.timing.mode).toBeNull();
    expect(see.timing.frequency).toBe("daily");
    expect(timingPhase(see, ctx())).toBe("due");
    expect(timingNote(see)).toBe("deze week");
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
    expect(windowNote(timing)).toBe("08:00–09:00");
  });

  it("keeps a windowed action due only inside the clock window", () => {
    const rest = testTenantItems("t1").find((row) => row.label === "Korte rust")!;
    expect(rest.timing).toMatchObject({
      mode: "clock",
      clock: "08:00",
      window_min: 840,
      condition: "body",
    });
    expect(windowNote(rest.timing)).toBe("08:00–22:00");
    expect(conditionNote(rest.timing)).toBe("na slaap of energie");
    expect(timingNote(rest)).toBeNull();
    const body = ctx({
      now: new Date(2026, 8, 7, 10, 0, 0),
      sleepSet: true,
    });
    expect(timingPhase(rest, body)).toBe("due");
    expect(isVisibleToday(rest, body)).toBe(true);
    expect(
      isVisibleToday(
        rest,
        ctx({ now: new Date(2026, 8, 7, 7, 0, 0), energySet: true }),
      ),
    ).toBe(false);
    expect(
      timingPhase(rest, ctx({ now: new Date(2026, 8, 7, 22, 30, 0), energySet: true })),
    ).toBe("closed");
    expect(
      isVisibleToday(rest, ctx({ now: new Date(2026, 8, 7, 22, 30, 0), energySet: true })),
    ).toBe(false);
  });

  it("hides a conditioned action until sleep or energy is set", () => {
    const rest = testTenantItems("t1").find((row) => row.label === "Korte rust")!;
    const noon = ctx({ now: new Date(2026, 8, 7, 12, 0, 0) });
    expect(timingPhase(rest, noon)).toBe("hidden");
    expect(isVisibleToday(rest, noon)).toBe(false);
    expect(isVisibleToday(rest, ctx({ ...noon, energySet: true }))).toBe(true);
    expect(isVisibleToday(rest, ctx({ ...noon, sleepSet: true }))).toBe(true);
    expect(applyLockedTiming(emptyTiming(), "Korte rust")).toMatchObject({
      clock: "08:00",
      window_min: 840,
      condition: "body",
    });
    expect(applyLockedTiming(emptyTiming(), "Push-ups")).toEqual(emptyTiming());
  });

  it("keeps a clock-only reminder visible before its time", () => {
    const call = testTenantItems("t1").find((row) => row.label === "Bellen met iemand")!;
    const early = ctx({ now: new Date(2026, 8, 7, 17, 0, 0) });
    expect(timingPhase(call, early)).toBe("wait");
    expect(isVisibleToday(call, early)).toBe(true);
  });
});
