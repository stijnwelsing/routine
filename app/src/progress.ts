import { currentAt } from "./loop";
import { reviewPrimaryId, weekReview, type WeekReview } from "./review";
import type { Item, LogEvent } from "./types";

export interface ProgressPoint {
  date: string;
  label: string;
  current: number;
  mark: WeekReview["days"][number]["mark"];
}

export interface ProgressView {
  week: WeekReview;
  line: ProgressPoint[];
  hits: number;
  skips: number;
  misses: number;
}

/** Calm week + current line + hits. No score, no streak. */
export function progressView(
  items: Item[],
  events: LogEvent[],
  today: string,
  a: number,
  primaryId?: string,
): ProgressView {
  const week = weekReview(items, events, today, primaryId ?? reviewPrimaryId(items));
  const line = week.days.map((day) => ({
    date: day.date,
    label: day.label,
    current: currentAt(a, events, day.date <= today ? day.date : today),
    mark: day.mark,
  }));
  return {
    week,
    line,
    hits: week.hits,
    skips: week.skips,
    misses: week.misses,
  };
}

export function lineDots(
  values: number[],
  width: number,
  height: number,
  padX = 18,
  padY = 16,
): { x: number; y: number }[] {
  if (values.length === 0) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  return values.map((value, i) => {
    const x =
      values.length === 1 ? width / 2 : padX + (i / (values.length - 1)) * innerW;
    const y = span === 0 ? height / 2 : padY + (1 - (value - min) / span) * innerH;
    return { x, y };
  });
}

export function linePointsAttr(dots: { x: number; y: number }[]): string {
  return dots.map((dot) => `${dot.x.toFixed(1)},${dot.y.toFixed(1)}`).join(" ");
}
