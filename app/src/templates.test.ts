import { describe, expect, it } from "vitest";
import { defaultTemplate, lockedTemplate } from "./templates";
import { todayActions, todayConstraints, todayPreferences } from "./items";
import { emptyTiming } from "./timing";
import { testTenantItems } from "./seed";
import { ITEM_TEMPLATES, type Item } from "./types";

function leftover(label: string, template: Item["template"] = null): Item {
  return {
    id: "keep",
    tenant_id: "t1",
    type: "leefregel",
    label,
    unit: null,
    a: null,
    b: null,
    milestone: null,
    weekdays: null,
    times_per_week: null,
    sort: 0,
    timing: emptyTiming(),
    role: null,
    template,
    later: false,
  };
}

describe("template confidence lock", () => {
  it("uses the lock tags and no other names", () => {
    expect(ITEM_TEMPLATES).toEqual([
      "guideline",
      "evidence-informed",
      "public-framework",
      "user preference",
      "hypothesis",
    ]);
    expect(lockedTemplate("Cafeïne 90 min na opstaan")).toBe("public-framework");
    expect(lockedTemplate("Wandelen na eten")).toBe("evidence-informed");
    expect(lockedTemplate("Low carb")).toBe("user preference");
    expect(lockedTemplate("Scherm uit 22:00")).toBe("user preference");
    expect(lockedTemplate("Push-ups")).toBeNull();
  });

  it("fills leftover rows without rewriting a custom valid tag on other items", () => {
    expect(defaultTemplate(leftover("Wandelen na eten"))).toBe("evidence-informed");
    expect(defaultTemplate(leftover("Cafeïne 90 min na opstaan"))).toBe("public-framework");
    expect(defaultTemplate(leftover("Low carb"))).toBe("user preference");
    expect(defaultTemplate(leftover("Scherm uit 22:00"))).toBe("user preference");
    expect(defaultTemplate(leftover("Push-ups", "hypothesis"))).toBe("hypothesis");
    expect(defaultTemplate(leftover("Push-ups"))).toBeNull();
  });

  it("keeps Low carb as a day tag, not a rule or Done item", () => {
    const items = testTenantItems("t1");
    const today = "2026-09-13";
    expect(todayPreferences(items, today).map((item) => item.label)).toEqual(["Low carb"]);
    expect(todayPreferences(items, today)[0]?.template).toBe("user preference");
    expect(todayActions(items, today).some((item) => item.label === "Low carb")).toBe(false);
    expect(todayConstraints(items, today).some((item) => item.label === "Low carb")).toBe(false);
    expect(todayActions(items, today).some((item) => item.label === "Wandelen na eten")).toBe(true);
    expect(todayConstraints(items, today).map((item) => item.label)).toEqual([
      "Cafeïne 90 min na opstaan",
      "Scherm uit 22:00",
    ]);
    expect(todayConstraints(items, today).find((item) => item.label === "Scherm uit 22:00")?.template).toBe(
      "user preference",
    );
  });

  it("stores lock tags on the seed items", () => {
    const items = testTenantItems("t1");
    expect(items.find((item) => item.label === "Cafeïne 90 min na opstaan")?.template).toBe(
      "public-framework",
    );
    expect(items.find((item) => item.label === "Wandelen na eten")?.template).toBe(
      "evidence-informed",
    );
    expect(items.find((item) => item.label === "Low carb")?.template).toBe("user preference");
    expect(items.find((item) => item.label === "Low carb")?.role).toBe("preference");
    expect(items.find((item) => item.label === "Scherm uit 22:00")?.template).toBe("user preference");
    expect(items.find((item) => item.label === "Scherm uit 22:00")?.role).toBe("constraint");
  });
});
