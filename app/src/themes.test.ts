import { describe, expect, it } from "vitest";
import { onboardStep } from "./goals";
import { seedSnapshot } from "./seed";
import { THEME_SUGGESTIONS, addTheme, normalizeThemes, themeChipLabels, themePickerHtml, toggleTheme } from "./themes";

describe("themes", () => {
  it("toggles a suggestion and adds a custom label", () => {
    let themes = toggleTheme([], THEME_SUGGESTIONS[0]);
    expect(themes).toEqual(["Military calisthenics"]);
    themes = addTheme(themes, "  Parkour  ");
    expect(themes).toEqual(["Military calisthenics", "Parkour"]);
    themes = toggleTheme(themes, "military calisthenics");
    expect(themes).toEqual(["Parkour"]);
    expect(addTheme(themes, "parkour")).toEqual(["Parkour"]);
    expect(normalizeThemes(["", "  ", 1, "Spinnen", "spinnen"])).toEqual(["Spinnen"]);
  });

  it("always renders Koers picker for leftover sessions without a themes field", () => {
    const html = themePickerHtml(undefined);
    expect(themeChipLabels(undefined)).toEqual([...THEME_SUGGESTIONS]);
    expect(html).toContain("Kickbox");
    expect(html).toContain("Military calisthenics");
    expect(html).toContain("Spinnen");
    expect(html).toContain('data-id="theme-custom"');
    expect(html).toContain("Voeg toe");
    const withCustom = themePickerHtml(["Kickbox", "Parkour"]);
    expect(withCustom).toContain("Parkour");
    expect(withCustom).toContain('data-theme="Kickbox"');
    expect(onboardStep({ ...seedSnapshot("u1", "2026-09-09", "t1"), onboarded: true, events: [] })).toBe(null);
  });

  it("asks themes after age on a fresh session, then start", () => {
    const fresh = seedSnapshot("u1", "2026-09-09", "t1");
    const withGoals = { ...fresh, profile: { ...fresh.profile, goals: ["kracht" as const] } };
    expect(onboardStep(withGoals)).toBe("age");
    const withAge = { ...withGoals, profile: { ...withGoals.profile, age_band: "50–59" as const } };
    expect(onboardStep(withAge)).toBe("themes");
    expect(onboardStep({ ...withAge, theme_step: true })).toBe("start");
  });
});
