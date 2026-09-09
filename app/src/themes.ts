export const THEME_SUGGESTIONS = ["Military calisthenics", "Kickbox", "Spinnen"] as const;
export const THEME_LIMIT = 40;

export function normalizeTheme(raw: string): string | null {
  const label = raw.trim().replace(/\s+/g, " ").slice(0, THEME_LIMIT);
  return label.length > 0 ? label : null;
}

export function normalizeThemes(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const row of raw) {
    if (typeof row !== "string") continue;
    const label = normalizeTheme(row);
    if (!label) continue;
    const key = label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(label);
  }
  return out;
}

export function toggleTheme(themes: string[], label: string): string[] {
  const next = normalizeTheme(label);
  if (!next) return themes;
  const key = next.toLowerCase();
  if (themes.some((theme) => theme.toLowerCase() === key)) {
    return themes.filter((theme) => theme.toLowerCase() !== key);
  }
  return [...themes, next];
}

export function addTheme(themes: string[], raw: string): string[] {
  const next = normalizeTheme(raw);
  if (!next) return themes;
  const key = next.toLowerCase();
  if (themes.some((theme) => theme.toLowerCase() === key)) return themes;
  return [...themes, next];
}

/** Suggestions first, then leftover/custom labels. Missing/invalid input → suggestions only. */
export function themeChipLabels(themes: unknown): string[] {
  const selected = normalizeThemes(themes);
  const extras = selected.filter(
    (theme) => !THEME_SUGGESTIONS.some((row) => row.toLowerCase() === theme.toLowerCase()),
  );
  return [...THEME_SUGGESTIONS, ...extras];
}

function escapeAttr(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Always-on picker for Koers and onboarding. Leftover sessions with no themes still get chips + input. */
export function themePickerHtml(themes: unknown): string {
  const selected = new Set(normalizeThemes(themes).map((theme) => theme.toLowerCase()));
  const chips = themeChipLabels(themes)
    .map((label) => {
      const on = selected.has(label.toLowerCase());
      return `<button class="chip pick ${on ? "on" : ""}" data-act="theme-toggle" data-theme="${escapeAttr(label)}">${escapeAttr(label)}</button>`;
    })
    .join("");
  return `<div class="chips">${chips}</div>
        <div class="theme-add">
          <input data-id="theme-custom" type="text" maxlength="${THEME_LIMIT}" placeholder="Eigen thema" autocomplete="off" enterkeyhint="done" />
          <button class="btn ghost" data-act="theme-add">Voeg toe</button>
        </div>`;
}
