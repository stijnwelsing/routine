import { describe, expect, it } from "vitest";
import { addDays, mondayOfWeek } from "./dates";
import { lineDots, linePointsAttr, progressView, weightSeries } from "./progress";
import { seedSnapshot } from "./seed";
import { SCREENS } from "./types";
import type { LogEvent } from "./types";

function event(
  partial: Pick<LogEvent, "date" | "kind"> & Partial<LogEvent>,
): LogEvent {
  return {
    id: partial.id ?? `${partial.date}-${partial.kind}-${partial.item_id ?? "x"}`,
    tenant_id: partial.tenant_id ?? "t1",
    user_id: partial.user_id ?? "u1",
    item_id: partial.item_id ?? null,
    value: partial.value ?? null,
    skip_reason: partial.skip_reason ?? null,
    created_at: partial.created_at ?? `${partial.date}T10:00:00.000Z`,
    ...partial,
  };
}

const today = "2026-09-13";
const snap = seedSnapshot("u1", today, "t1");
const push = snap.items.find((item) => item.label === "Push-ups")!;

describe("progressView", () => {
  it("reuses the week strip and keeps hits without a score or streak", () => {
    const monday = mondayOfWeek(today);
    const events = [
      event({ date: monday, kind: "set", value: 41, item_id: push.id }),
      event({ date: addDays(monday, 1), kind: "done", item_id: push.id }),
      event({ date: addDays(monday, 2), kind: "skip", skip_reason: "pijn", item_id: push.id }),
    ];
    const view = progressView(snap.items, events, today, 40, push.id);
    expect(view.week.days).toHaveLength(7);
    expect(view.line).toHaveLength(7);
    expect(view.line[0].current).toBe(41);
    expect(view.line[1].current).toBe(41);
    expect(view.hits).toBe(2);
    expect(view.skips).toBe(1);
    expect(view.weight).toEqual([]);
    expect(view).not.toHaveProperty("score");
    expect(view).not.toHaveProperty("streak");
    expect(view).not.toHaveProperty("health");
    expect(view).not.toHaveProperty("bmi");
    expect(JSON.stringify(view)).not.toMatch(/confetti|health score|streak|bmi|doelgewicht|wearable/i);
  });

  it("keeps a flat line at A when the week has no set", () => {
    const view = progressView(snap.items, [], today, 40, push.id);
    expect(view.line.every((point) => point.current === 40)).toBe(true);
    expect(view.hits).toBe(0);
    expect(view.weight).toEqual([]);
  });
});

describe("weightSeries", () => {
  it("stays empty without body_weight points", () => {
    expect(weightSeries([], today)).toEqual([]);
    expect(
      weightSeries(
        [event({ date: today, kind: "done", item_id: push.id })],
        today,
      ),
    ).toEqual([]);
  });

  it("keeps a calm kg series from body_weight, latest per day", () => {
    const monday = mondayOfWeek(today);
    const events = [
      event({ date: monday, kind: "body_weight", value: 88.4, created_at: `${monday}T07:00:00.000Z` }),
      event({
        date: monday,
        kind: "body_weight",
        value: 88.2,
        created_at: `${monday}T08:00:00.000Z`,
      }),
      event({ date: addDays(monday, 2), kind: "body_weight", value: 87.9 }),
      event({ date: addDays(monday, 3), kind: "done", item_id: push.id }),
      event({ date: addDays(today, 1), kind: "body_weight", value: 90 }),
    ];
    const series = weightSeries(events, today);
    expect(series).toEqual([
      { date: monday, kg: 88.2 },
      { date: addDays(monday, 2), kg: 87.9 },
    ]);
    const view = progressView(snap.items, events, today, 40, push.id);
    expect(view.weight).toEqual(series);
    expect(view.week.days).toHaveLength(7);
    expect(view.hits).toBe(1);
    expect(view).not.toHaveProperty("bmi");
    expect(view).not.toHaveProperty("goalWeight");
    expect(JSON.stringify(view)).not.toMatch(/bmi|doelgewicht|health score|wearable/i);
  });
});

describe("lineDots", () => {
  it("spreads seven days and stays mid-height when values are equal", () => {
    const dots = lineDots([40, 40, 40, 40, 40, 40, 40], 294, 72);
    expect(dots).toHaveLength(7);
    expect(dots[0].x).toBeLessThan(dots[6].x);
    expect(dots.every((dot) => dot.y === 36)).toBe(true);
    expect(linePointsAttr(dots).split(" ")).toHaveLength(7);
  });
});

describe("screens", () => {
  it("keeps nav at four tabs", () => {
    expect(SCREENS).toEqual(["vandaag", "koers", "voortgang", "profiel"]);
    expect(SCREENS).toHaveLength(4);
  });
});
