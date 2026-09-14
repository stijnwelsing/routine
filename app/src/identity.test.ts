import { describe, expect, it } from "vitest";
import {
  HORIZON_LINE,
  clipField,
  constraintLine,
  emptyIdentity,
  horizonLine,
  identityNudge,
  identityNudgeOnSkip,
  shouldPromptHorizon,
  shouldWarnConstraint,
  wouldBreakConstraint,
  wontSkipCount,
} from "./identity";
import type { LogEvent } from "./types";

function skip(reason: LogEvent["skip_reason"], date = "2026-08-29"): LogEvent {
  return {
    id: crypto.randomUUID(),
    tenant_id: "t1",
    user_id: "u1",
    item_id: null,
    date,
    kind: "skip",
    value: null,
    skip_reason: reason,
    created_at: `${date}T10:00:00.000Z`,
  };
}

describe("empty identity", () => {
  it("seeds no text", () => {
    expect(emptyIdentity()).toEqual({
      identity_anti: null,
      identity_new: null,
      identity_constraint: null,
      horizon_1y: null,
    });
  });

  it("treats blank as empty", () => {
    expect(clipField("   ", 140)).toBeNull();
    expect(clipField(null, 140)).toBeNull();
  });
});

describe("WON'T-skip", () => {
  it("counts only geen zin", () => {
    const events = [skip("geen zin"), skip("geen tijd"), skip("geen zin")];
    expect(wontSkipCount(events)).toBe(2);
  });

  it("stays silent until a second WON'T-skip", () => {
    expect(identityNudge("Ik word rustig sterk.", [skip("geen zin")])).toBeNull();
    expect(identityNudge("Ik word rustig sterk.", [skip("geen zin"), skip("geen zin")])).toBe(
      "Ik word rustig sterk.",
    );
  });

  it("does not interview when identity_new is empty", () => {
    expect(identityNudge(null, [skip("geen zin"), skip("geen zin")])).toBeNull();
    expect(identityNudge("   ", [skip("geen zin"), skip("geen zin")])).toBeNull();
  });

  it("shows the sentence only on a repeated WON'T chip, never on another reason", () => {
    const events = [skip("geen zin"), skip("geen zin")];
    expect(identityNudgeOnSkip("Ik word rustig sterk.", events, "geen zin")).toBe(
      "Ik word rustig sterk.",
    );
    expect(identityNudgeOnSkip("Ik word rustig sterk.", events, "geen tijd")).toBeNull();
    expect(identityNudgeOnSkip("Ik word rustig sterk.", events, null)).toBeNull();
    expect(identityNudgeOnSkip(null, events, "geen zin")).toBeNull();
  });
});

describe("constraint warning", () => {
  it("warns only when a constraint is set; never required", () => {
    expect(shouldWarnConstraint(null)).toBe(false);
    expect(shouldWarnConstraint("   ")).toBe(false);
    expect(shouldWarnConstraint("schouders")).toBe(true);
  });

  it("treats a set constraint plus a new etappe or B as a would-break, never a block", () => {
    expect(wouldBreakConstraint(null, 50)).toBe(false);
    expect(wouldBreakConstraint("schouders", null)).toBe(false);
    expect(wouldBreakConstraint("schouders", 50)).toBe(true);
    expect(constraintLine(null)).toBeNull();
    expect(constraintLine("schouders")).toBe("Check: schouders.");
  });
});

describe("horizon prompt", () => {
  it("shows one calm line only when rotating and horizon is empty", () => {
    expect(shouldPromptHorizon(null, false)).toBe(false);
    expect(shouldPromptHorizon(null, true)).toBe(true);
    expect(shouldPromptHorizon("50 reps", true)).toBe(false);
    expect(horizonLine(null, false)).toBeNull();
    expect(horizonLine("   ", true)).toBe(HORIZON_LINE);
    expect(horizonLine(null, true)).toBe("Zet een 1-jaars B.");
    expect(horizonLine("50 reps", true)).toBeNull();
  });
});
