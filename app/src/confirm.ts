import type { ItemType, SkipReason } from "./types";

export type ConfirmTone = "sage" | "fog";
export type ConfirmBeat = "check" | "fade";

export interface TodayConfirm {
  text: string;
  tone: ConfirmTone;
  beat: ConfirmBeat;
}

/** One quiet beat, then gone. Long enough to register, too short to linger. */
export const CONFIRM_BEAT_MS = 1080;

/** After +1 / Done / Genomen. No streak, grind, protocol, OS, score, badge, or ember. */
export function todayConfirm(input: {
  plus: boolean;
  done: boolean;
  skip: SkipReason | null;
  type: ItemType;
  track: boolean;
}): TodayConfirm | null {
  if (input.skip) return null;
  if (input.plus) return { text: "Set gedaan.", tone: "fog", beat: "fade" };
  if (!input.done) return null;
  if (input.type === "medicijn") return { text: "Genomen.", tone: "sage", beat: "check" };
  if (input.track) return { text: "Set staat.", tone: "sage", beat: "check" };
  return { text: "Staat.", tone: "sage", beat: "check" };
}
