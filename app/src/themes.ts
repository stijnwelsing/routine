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
