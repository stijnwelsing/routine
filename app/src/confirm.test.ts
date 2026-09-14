import { describe, expect, it } from "vitest";
import { CONFIRM_BEAT_MS, todayConfirm } from "./confirm";
import { LOCAL_STORAGE_KEY } from "./types";

const quiet = { skip: null, type: "daily" as const, track: true };

describe("todayConfirm", () => {
  it("gives a short calm line after +1 or Done", () => {
    expect(todayConfirm({ ...quiet, plus: true, done: false })).toEqual({
      text: "Set gedaan.",
      tone: "fog",
      beat: "fade",
    });
    expect(todayConfirm({ ...quiet, plus: false, done: true })).toEqual({
      text: "Set staat.",
      tone: "sage",
      beat: "check",
    });
    expect(
      todayConfirm({
        plus: false,
        done: true,
        skip: null,
        type: "sociaal",
        track: false,
      }),
    ).toEqual({ text: "Staat.", tone: "sage", beat: "check" });
    expect(
      todayConfirm({
        plus: false,
        done: true,
        skip: null,
        type: "medicijn",
        track: false,
      }),
    ).toEqual({ text: "Genomen.", tone: "sage", beat: "check" });
  });

  it("stays silent on Skip and on an open day", () => {
    expect(
      todayConfirm({ plus: false, done: false, skip: "geen tijd", type: "daily", track: true }),
    ).toBeNull();
    expect(todayConfirm({ ...quiet, plus: false, done: false })).toBeNull();
  });

  it("uses sage check only after Done, fog fade after +1, never ember", () => {
    const plus = todayConfirm({ ...quiet, plus: true, done: false });
    const done = todayConfirm({ ...quiet, plus: false, done: true });
    expect(plus?.tone).toBe("fog");
    expect(plus?.beat).toBe("fade");
    expect(done?.tone).toBe("sage");
    expect(done?.beat).toBe("check");
    expect(
      todayConfirm({ plus: false, done: false, skip: "pijn", type: "daily", track: true }),
    ).toBeNull();
    expect(plus?.tone).not.toBe("ember");
    expect(done?.tone).not.toBe("ember");
  });

  it("keeps one short beat and copy free of streak, grind, protocol, toast, and confetti", () => {
    const rows = [
      todayConfirm({ ...quiet, plus: true, done: false }),
      todayConfirm({ ...quiet, plus: false, done: true }),
      todayConfirm({
        plus: false,
        done: true,
        skip: null,
        type: "supplement",
        track: false,
      }),
      todayConfirm({
        plus: false,
        done: true,
        skip: null,
        type: "medicijn",
        track: false,
      }),
    ];
    const lines = rows.map((row) => row?.text ?? "").join(" ");
    expect(lines).not.toMatch(/streak|grind|protocol|os|confetti|score|badge|health|xp|toast/i);
    expect(CONFIRM_BEAT_MS).toBeGreaterThanOrEqual(800);
    expect(CONFIRM_BEAT_MS).toBeLessThanOrEqual(1400);
    expect(rows.every((row) => row && (row.beat === "check" || row.beat === "fade"))).toBe(true);
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
  });
});
