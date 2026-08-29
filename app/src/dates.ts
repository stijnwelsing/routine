const MONTHS_NL = [
  "jan",
  "feb",
  "mrt",
  "apr",
  "mei",
  "jun",
  "jul",
  "aug",
  "sep",
  "okt",
  "nov",
  "dec",
];

const DAYS_NL = ["zo", "ma", "di", "wo", "do", "vr", "za"];

export function todayISO(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(iso: string, days: number): string {
  const date = parseISO(iso);
  date.setDate(date.getDate() + days);
  return todayISO(date);
}

export function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatLong(iso: string): string {
  const date = parseISO(iso);
  return `${DAYS_NL[date.getDay()]} ${date.getDate()} ${MONTHS_NL[date.getMonth()]}`;
}

export function formatShort(iso: string): string {
  const date = parseISO(iso);
  return `${date.getDate()} ${MONTHS_NL[date.getMonth()]}`;
}

/** ISO weekday: Monday = 1 … Sunday = 7. */
export function isoWeekday(iso: string): number {
  const day = parseISO(iso).getDay();
  return day === 0 ? 7 : day;
}

export function mondayOfWeek(iso: string): string {
  const date = parseISO(iso);
  const day = date.getDay();
  const offset = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + offset);
  return todayISO(date);
}

export function daysBetween(from: string, to: string): number {
  const a = parseISO(from).getTime();
  const b = parseISO(to).getTime();
  return Math.round((b - a) / 86_400_000);
}

export function eachDay(from: string, to: string): string[] {
  const out: string[] = [];
  let cursor = from;
  while (cursor <= to) {
    out.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return out;
}

export function newId(): string {
  return crypto.randomUUID();
}

export function nowISO(): string {
  return new Date().toISOString();
}
