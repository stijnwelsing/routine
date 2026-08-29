import type { LogEvent, Profile, SkipReason } from "./types";

export const WONT_SKIP: SkipReason = "geen zin";

export const IDENTITY_LIMITS = {
  identity_anti: 280,
  identity_new: 140,
  identity_constraint: 140,
  horizon_1y: 140,
} as const;

export function clipField(value: string | null | undefined, max: number): string | null {
  const text = value?.trim() ?? "";
  if (!text) return null;
  return text.slice(0, max);
}

export function wontSkipCount(events: LogEvent[]): number {
  return events.filter((event) => event.kind === "skip" && event.skip_reason === WONT_SKIP)
    .length;
}

/** Repeated WON'T-skip shows identity_new. Empty identity_new stays silent. No interview. */
export function identityNudge(identityNew: string | null, events: LogEvent[]): string | null {
  const sentence = clipField(identityNew, IDENTITY_LIMITS.identity_new);
  if (!sentence) return null;
  if (wontSkipCount(events) < 2) return null;
  return sentence;
}

/** Free-text constraint cannot be judged. If it is set, warn on etappe/B raise. Never block. */
export function shouldWarnConstraint(constraint: string | null): boolean {
  return Boolean(clipField(constraint, IDENTITY_LIMITS.identity_constraint));
}

/** Horizon empty + stages have rotated → one line to set a 1-year B. */
export function shouldPromptHorizon(horizon: string | null, rotated: boolean): boolean {
  return rotated && !clipField(horizon, IDENTITY_LIMITS.horizon_1y);
}

export function emptyIdentity(): Pick<
  Profile,
  "identity_anti" | "identity_new" | "identity_constraint" | "horizon_1y"
> {
  return {
    identity_anti: null,
    identity_new: null,
    identity_constraint: null,
    horizon_1y: null,
  };
}
