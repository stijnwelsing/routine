import type { ItemType, SkipReason } from "./types";

export type ConfirmTone = "sage" | "fog";

export interface TodayConfirm {
  text: string;
  tone: ConfirmTone;
}

/** Short calm line after +1 / Done. No streak, grind, protocol, OS, score, or badge. */
export function todayConfirm(input: {
  plus: boolean;
  done: boolean;
  skip: SkipReason | null;
  type: ItemType;
  track: boolean;
}): TodayConfirm | null {
  if (input.skip) return null;
  if (input.plus) return { text: "Set gedaan.", tone: "fog" };
  if (!input.done) return null;
  if (input.type === "medicijn") return { text: "Genomen.", tone: "sage" };
  if (input.track) return { text: "Set staat.", tone: "sage" };
  return { text: "Staat.", tone: "sage" };
}
