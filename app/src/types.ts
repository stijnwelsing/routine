export const SKIP_REASONS = [
  "geen tijd",
  "geen energie",
  "vergeten",
  "geen zin",
  "pijn",
] as const;

export type SkipReason = (typeof SKIP_REASONS)[number];

export type EventKind =
  | "body_sleep"
  | "body_energy"
  | "body_weight"
  | "set"
  | "done"
  | "skip"
  | "miss";

export type StageStatus = "active" | "extended" | "lowered" | "replaced" | "done";
export type StageType = "Build";
export type Domain = "strength";
export type Unit = "reps" | "sec";
export type ItemType = "daily" | "weekly" | "leefregel";
export type Screen = "vandaag" | "koers";
export type TrendArrow = "↑" | "→" | "↓";

export interface Profile {
  id: string;
  tenant_id: string;
  display_name: string | null;
  identity_anti: string | null;
  identity_new: string | null;
  identity_constraint: string | null;
  horizon_1y: string | null;
}

export interface Vector {
  id: string;
  tenant_id: string;
  user_id: string;
  domain: Domain;
  a: number;
  b: number;
  unit: Unit;
  pace_constraint: string | null;
}

export interface Stage {
  id: string;
  tenant_id: string;
  vector_id: string;
  milestone: number;
  started_on: string;
  deadline: string | null;
  status: StageStatus;
  stage_type: StageType;
}

export interface Item {
  id: string;
  tenant_id: string;
  type: ItemType;
  label: string;
  unit: Unit | null;
  a: number | null;
  b: number | null;
  milestone: number | null;
  weekdays: number[] | null;
  times_per_week: number | null;
  sort: number;
}

export interface LogEvent {
  id: string;
  tenant_id: string;
  user_id: string;
  item_id: string | null;
  date: string;
  kind: EventKind;
  value: number | null;
  skip_reason: SkipReason | null;
  created_at: string;
}

export interface Snapshot {
  profile: Profile;
  items: Item[];
  vector: Vector;
  stage: Stage;
  events: LogEvent[];
  rotated: boolean;
}

export interface LoopView {
  current: number;
  sleep: number | null;
  energy: number | null;
  doneToday: boolean;
  plusToday: boolean;
  setLoggedToday: boolean;
  skipToday: SkipReason | null;
  gearDown: boolean;
  milestoneHit: boolean;
  atB: boolean;
  trend: { arrow: TrendArrow; word: string };
  hitrate: { hits: number; eligible: number };
  streak: number;
  nextAction: string;
  suggestedMilestone: number | null;
}

/** Local-device default and tenant-1 SQL seed. Not written to other cloud tenants. */
export const SEED = {
  a: 40,
  b: 50,
  milestone: 45,
  setsPerDay: 1,
  domain: "strength" as const,
  unit: "reps" as const,
  stageType: "Build" as const,
  windowDays: 21,
};

/** Cloud fallback when a tenant has no inrichting yet. Tenant 1 uses SEED in SQL. */
export const EMPTY = {
  a: 0,
  b: 1,
  milestone: 1,
};

export const LOCAL_STORAGE_KEY = "routine_loop_v6";
export const LOCAL_USER_KEY = "routine_local_user_id";
export const LOCAL_TENANT_KEY = "routine_local_tenant_id";
export const LOCAL_CHOSEN_KEY = "routine_local_chosen";
