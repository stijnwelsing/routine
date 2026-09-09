import { isStofje } from "./items";
import { isConstraint } from "./timing";
import type { AgeBand, GoalId, Item, Snapshot } from "./types";

export const MAX_START = 3;

export const GOALS: { id: GoalId; label: string }[] = [
  { id: "kracht", label: "Kracht" },
  { id: "eten", label: "Eten & drinken" },
  { id: "slaap", label: "Slaap" },
  { id: "stofjes", label: "Stofjes" },
  { id: "bewegen", label: "Bewegen" },
];

export const AGE_BANDS: AgeBand[] = ["18–29", "30–39", "40–49", "50–59", "60+"];

const GOAL_LABELS: Record<GoalId, string[]> = {
  kracht: ["Push-ups", "Squats", "Plank", "Dead hang"],
  eten: ["Niet snoepen", "Low carb", "Intermittent fasting", "Geen alcohol"],
  slaap: ["Koud douchen"],
  stofjes: ["Medicijn ochtend", "Vitamine D"],
  bewegen: ["Wandelen na eten"],
};

export function isStartCandidate(item: Item): boolean {
  if (isConstraint(item)) return false;
  if (item.type === "weekly") return false;
  return item.type === "daily" || item.type === "leefregel" || item.type === "gedrag" || isStofje(item);
}

/** Existing local data skips onboarding. Only a fresh empty session sees the flow. */
export function needsOnboarding(snapshot: Snapshot): boolean {
  if (snapshot.onboarded !== false) return false;
  if ((snapshot.events ?? []).length > 0) return false;
  return true;
}

export function onboardStep(snapshot: Snapshot): "goals" | "age" | "themes" | "start" | null {
  if (!needsOnboarding(snapshot)) return null;
  if (!snapshot.profile.goals?.length) return "goals";
  if (!snapshot.profile.age_band) return "age";
  if (snapshot.theme_step !== true) return "themes";
  return "start";
}

export function suggestStartItems(items: Item[], goals: GoalId[]): Item[] {
  const candidates = items.filter(isStartCandidate).sort((a, b) => a.sort - b.sort);
  if (goals.length === 0) return candidates;
  const wanted = new Set(goals.flatMap((goal) => GOAL_LABELS[goal] ?? []));
  const matched = candidates.filter((item) => wanted.has(item.label));
  return matched.length > 0 ? matched : candidates;
}

export function applyStartSelection(items: Item[], startIds: string[]): Item[] {
  const allowed = new Set(startIds.slice(0, MAX_START));
  return items.map((item) => {
    if (!isStartCandidate(item)) return { ...item, later: false };
    return { ...item, later: !allowed.has(item.id) };
  });
}

export function toggleGoal(goals: GoalId[], id: GoalId): GoalId[] {
  return goals.includes(id) ? goals.filter((goal) => goal !== id) : [...goals, id];
}

export function toggleStartId(ids: string[], id: string): string[] {
  if (ids.includes(id)) return ids.filter((row) => row !== id);
  if (ids.length >= MAX_START) return ids;
  return [...ids, id];
}

export function isGoalId(value: string): value is GoalId {
  return GOALS.some((goal) => goal.id === value);
}

export function isAgeBand(value: string): value is AgeBand {
  return (AGE_BANDS as string[]).includes(value);
}
