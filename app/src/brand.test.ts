import { describe, expect, it } from "vitest";
import { statusTone } from "./brand";

describe("statusTone", () => {
  it("keeps a fresh stabiel day off ember", () => {
    expect(statusTone("stabiel")).toBe("fog");
  });

  it("uses ember only for Skip/miss (stokt) or gear-down, not a quiet day", () => {
    expect(statusTone("stokt")).toBe("ember");
    expect(statusTone("herstel")).toBe("ember");
    expect(statusTone("zakt")).toBe("fog");
    expect(statusTone("stijgt")).toBe("sage");
    expect(statusTone("stabiel")).toBe("fog");
  });
});
