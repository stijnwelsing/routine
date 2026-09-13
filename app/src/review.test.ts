import { describe, expect, it } from "vitest";
import { addDays, mondayOfWeek } from "./dates";
import { pendingMisses, reviewableItems, weekReview } from "./review";
import { seedSnapshot } from "./seed";
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
const yesterday = "2026-09-12";
const snap = seedSnapshot("u1", today, "t1");
const push = snap.items.find((item) => item.label === "Push-ups")!;
const walk = snap.items.find((item) => item.label === "Wandelen na eten")!;
const cafe = snap.items.find((item) => item.label === "Cafeïne 90 min na opstaan")!;
const laterHang = { ...snap.items.find((item) => item.label === "Dead hang")!, later: true };

describe("reviewableItems", () => {
  it("keeps action items and stofjes, drops regels and later", () => {
    const items = snap.items.map((item) => (item.label === "Dead hang" ? laterHang : item));
    const due = reviewableItems(items, today);
    expect(due.some((item) => item.label === "Push-ups")).toBe(true);
    expect(due.some((item) => item.label === "Wandelen na eten")).toBe(true);
    expect(due.some((item) => item.label === "Vitamine D")).toBe(true);
    expect(due.some((item) => item.label === "Bellen met iemand")).toBe(true);
    expect(due.some((item) => item.label === "Iemand zien")).toBe(true);
    expect(due.some((item) => item.label === "Low carb")).toBe(false);
    expect(due.some((item) => item.id === cafe.id)).toBe(false);
    expect(due.some((item) => item.label === "Scherm uit 22:00")).toBe(false);
    expect(due.some((item) => item.label === "Dead hang")).toBe(false);
    expect(due.some((item) => item.type === "weekly")).toBe(false);
  });
});

describe("pendingMisses", () => {
  it("asks for a reason when yesterday had no +1, Done, or Skip", () => {
    const events = [event({ date: "2026-09-10", kind: "done", item_id: push.id })];
    const pending = pendingMisses(snap.items, events, today, push.id);
    expect(pending.some((row) => row.item.id === push.id)).toBe(true);
    expect(pending.every((row) => row.date === yesterday && !row.reason)).toBe(true);
  });

  it("does not treat skip or a hit as a miss", () => {
    const events = [
      event({ date: yesterday, kind: "skip", skip_reason: "geen tijd", item_id: push.id }),
      event({ date: yesterday, kind: "done", item_id: walk.id }),
    ];
    const pending = pendingMisses(snap.items, events, today, push.id);
    expect(pending.some((row) => row.item.id === push.id)).toBe(false);
    expect(pending.some((row) => row.item.id === walk.id)).toBe(false);
  });

  it("does not invent a backlog before yesterday", () => {
    const events = [event({ date: "2026-09-08", kind: "done", item_id: push.id })];
    const pending = pendingMisses(snap.items, events, today, push.id);
    expect(pending.every((row) => row.date === yesterday)).toBe(true);
    expect(pending.every((row) => row.item.id === push.id)).toBe(true);
  });

  it("does not invent misses on leftover items that were never logged", () => {
    expect(pendingMisses(snap.items, [], today, push.id)).toEqual([]);
  });

  it("does not treat today's first Done as history for yesterday", () => {
    const events = [event({ date: today, kind: "done", item_id: walk.id })];
    const pending = pendingMisses(snap.items, events, today, push.id);
    expect(pending.some((row) => row.item.id === walk.id)).toBe(false);
  });

  it("drops the prompt after a miss reason is stored", () => {
    const events = [
      event({ date: yesterday, kind: "miss", skip_reason: "vergeten", item_id: push.id }),
    ];
    const pending = pendingMisses(snap.items, events, today, push.id);
    expect(pending.some((row) => row.item.id === push.id)).toBe(false);
  });
});

describe("weekReview", () => {
  it("shows hits, skips, and misses without a score", () => {
    const monday = mondayOfWeek(today);
    const wed = addDays(monday, 2);
    const events = [
      event({ date: monday, kind: "done", item_id: push.id }),
      event({ date: addDays(monday, 1), kind: "skip", skip_reason: "pijn", item_id: push.id }),
      event({ date: wed, kind: "miss", skip_reason: "vergeten", item_id: push.id }),
    ];
    const view = weekReview(snap.items, events, today, push.id);
    expect(view.start).toBe(monday);
    expect(view.days).toHaveLength(7);
    expect(view.days[0].mark).toBe("hit");
    expect(view.days[1].mark).toBe("skip");
    expect(view.days[2].mark).toBe("miss");
    expect(view.hits).toBe(1);
    expect(view.skips).toBe(1);
    expect(view.missRows.some((row) => row.item.id === push.id && row.reason === "vergeten")).toBe(
      true,
    );
  });

  it("keeps an unused earlier weekday blank, not a pile of misses", () => {
    const monday = mondayOfWeek(today);
    const events = [event({ date: addDays(monday, 2), kind: "done", item_id: push.id })];
    const view = weekReview(snap.items, events, addDays(monday, 3), push.id);
    expect(view.days[0].mark).toBe("idle");
    expect(view.days[2].mark).toBe("hit");
  });

  it("marks yesterday as miss so the week strip matches the reason prompt", () => {
    const events = [event({ date: "2026-09-10", kind: "done", item_id: push.id })];
    const view = weekReview(snap.items, events, today, push.id);
    const y = view.days.find((day) => day.date === yesterday);
    expect(y?.mark).toBe("miss");
    expect(view.missRows.some((row) => row.item.id === push.id && !row.reason)).toBe(true);
  });

  it("gives a quiet note when closed days have hits and no miss", () => {
    const monday = mondayOfWeek("2026-09-09");
    const events = [
      event({ date: monday, kind: "done", item_id: push.id }),
      event({ date: addDays(monday, 1), kind: "set", value: 41, item_id: push.id }),
    ];
    const view = weekReview(snap.items, events, addDays(monday, 2), push.id);
    expect(view.hits).toBeGreaterThanOrEqual(2);
    expect(view.misses).toBe(0);
    expect(view.note).toBe("Week staat.");
  });
});
