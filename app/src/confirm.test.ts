import { describe, expect, it } from "vitest";
import { todayConfirm } from "./confirm";
import { LOCAL_STORAGE_KEY } from "./types";

const quiet = { skip: null, type: "daily" as const, track: true };

describe("todayConfirm", () => {
  it("gives a short calm line after +1 or Done", () => {
    expect(todayConfirm({ ...quiet, plus: true, done: false })).toEqual({
      text: "Set gedaan.",
      tone: "fog",
    });
    expect(todayConfirm({ ...quiet, plus: false, done: true })).toEqual({
      text: "Set staat.",
      tone: "sage",
    });
    expect(
      todayConfirm({
        plus: false,
        done: true,
        skip: null,
        type: "sociaal",
        track: false,
      }),
    ).toEqual({ text: "Staat.", tone: "sage" });
    expect(
      todayConfirm({
        plus: false,
        done: true,
        skip: null,
        type: "medicijn",
        track: false,
      }),
    ).toEqual({ text: "Genomen.", tone: "sage" });
  });

  it("stays silent on Skip and on an open day", () => {
    expect(
      todayConfirm({ plus: false, done: false, skip: "geen tijd", type: "daily", track: true }),
    ).toBeNull();
    expect(todayConfirm({ ...quiet, plus: false, done: false })).toBeNull();
  });

  it("uses sage only after Done, never after +1 or Skip", () => {
    expect(todayConfirm({ ...quiet, plus: true, done: false })?.tone).toBe("fog");
    expect(todayConfirm({ ...quiet, plus: false, done: true })?.tone).toBe("sage");
    expect(
      todayConfirm({ plus: false, done: false, skip: "pijn", type: "daily", track: true }),
    ).toBeNull();
  });

  it("keeps copy free of streak, grind, protocol, OS, confetti, score, and badges", () => {
    const lines = [
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
    ]
      .map((row) => row?.text ?? "")
      .join(" ");
    expect(lines).not.toMatch(/streak|grind|protocol|os|confetti|score|badge|health|xp/i);
    expect(LOCAL_STORAGE_KEY).toBe("routine_loop_v6");
  });
});
