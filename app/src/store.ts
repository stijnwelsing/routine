import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { newId, nowISO, todayISO } from "./dates";
import { emptyIdentity } from "./identity";
import { applySeedLock, emptyProfile, seedSnapshot, seedStage } from "./seed";
import {
  LOCAL_CHOSEN_KEY,
  LOCAL_STORAGE_KEY,
  LOCAL_USER_KEY,
  type LogEvent,
  type Profile,
  type Snapshot,
  type Stage,
} from "./types";

export type SessionMode = "local" | "cloud";

export interface Store {
  mode: SessionMode;
  userId: string;
  email: string | null;
  load(): Promise<Snapshot>;
  addEvent(event: Omit<LogEvent, "id" | "user_id" | "created_at"> & { id?: string }): Promise<LogEvent>;
  saveProfile(profile: Profile): Promise<void>;
  saveVectorConstraint(vectorId: string, paceConstraint: string | null): Promise<void>;
  advanceStage(current: Stage, nextMilestone: number): Promise<Stage>;
  signOut(): Promise<void>;
}

function readLocalUserId(): string {
  const existing = localStorage.getItem(LOCAL_USER_KEY);
  if (existing) return existing;
  const id = newId();
  localStorage.setItem(LOCAL_USER_KEY, id);
  return id;
}

function writeLocal(snapshot: Snapshot): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(snapshot));
}

function normalizeSnapshot(raw: Snapshot, userId: string): Snapshot {
  return {
    ...raw,
    profile: {
      ...emptyProfile(userId),
      ...raw.profile,
      ...emptyIdentity(),
      ...{
        identity_anti: raw.profile?.identity_anti ?? null,
        identity_new: raw.profile?.identity_new ?? null,
        identity_constraint: raw.profile?.identity_constraint ?? null,
        horizon_1y: raw.profile?.horizon_1y ?? null,
      },
    },
    events: raw.events ?? [],
    rotated: Boolean(raw.rotated),
  };
}

function readLocal(userId: string): Snapshot {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) {
    const seeded = seedSnapshot(userId);
    writeLocal(seeded);
    return seeded;
  }
  return applySeedLock(normalizeSnapshot(JSON.parse(raw) as Snapshot, userId));
}

export function hasLocalSession(): boolean {
  return Boolean(localStorage.getItem(LOCAL_CHOSEN_KEY) || localStorage.getItem(LOCAL_STORAGE_KEY));
}

export function createLocalStore(): Store {
  localStorage.setItem(LOCAL_CHOSEN_KEY, "1");
  const userId = readLocalUserId();

  return {
    mode: "local",
    userId,
    email: null,

    async load() {
      return readLocal(userId);
    },

    async addEvent(input) {
      const snapshot = readLocal(userId);
      const event: LogEvent = {
        id: input.id ?? newId(),
        user_id: userId,
        date: input.date,
        kind: input.kind,
        value: input.value ?? null,
        skip_reason: input.skip_reason ?? null,
        created_at: nowISO(),
      };
      snapshot.events.push(event);
      writeLocal(snapshot);
      return event;
    },

    async saveProfile(profile) {
      const snapshot = readLocal(userId);
      snapshot.profile = profile;
      writeLocal(snapshot);
    },

    async saveVectorConstraint(vectorId, paceConstraint) {
      const snapshot = readLocal(userId);
      if (snapshot.vector.id === vectorId) {
        snapshot.vector.pace_constraint = paceConstraint;
        writeLocal(snapshot);
      }
    },

    async advanceStage(current, nextMilestone) {
      const snapshot = readLocal(userId);
      const next = seedStage(current.vector_id);
      next.milestone = nextMilestone;
      snapshot.stage = next;
      snapshot.rotated = true;
      writeLocal(snapshot);
      return next;
    },

    async signOut() {
      /* local mode has no session */
    },
  };
}

type ProfileRow = Profile;
type VectorRow = Snapshot["vector"];
type StageRow = Stage;
type EventRow = LogEvent;

export function createCloudStore(client: SupabaseClient, user: User): Store {
  const userId = user.id;

  function reject(label: string, error: { message: string } | null): void {
    if (error) throw new Error(`${label}: ${error.message}`);
  }

  async function must<T>(
    label: string,
    result: { data: T | null; error: { message: string } | null },
  ): Promise<T> {
    reject(label, result.error);
    if (result.data === null) throw new Error(`${label}: geen data`);
    return result.data;
  }

  return {
    mode: "cloud",
    userId,
    email: user.email ?? null,

    async load() {
      const profileRes = await client.from("profiles").select("*").eq("id", userId).maybeSingle();
      reject("profiel", profileRes.error);

      let profile = profileRes.data as ProfileRow | null;
      if (!profile) {
        const inserted = await client
          .from("profiles")
          .insert({ id: userId })
          .select("*")
          .single();
        profile = await must<ProfileRow>("profiel aanmaken", inserted);
      }

      const vectorRes = await client.from("vectors").select("*").eq("user_id", userId).maybeSingle();
      reject("vector", vectorRes.error);
      let vector = vectorRes.data as VectorRow | null;

      if (!vector) {
        const seeded = seedSnapshot(userId);
        const inserted = await client
          .from("vectors")
          .insert({
            user_id: userId,
            domain: seeded.vector.domain,
            a: seeded.vector.a,
            b: seeded.vector.b,
            unit: seeded.vector.unit,
            pace_constraint: seeded.vector.pace_constraint,
          })
          .select("*")
          .single();
        vector = await must<VectorRow>("vector aanmaken", inserted);
      }

      const stageRes = await client
        .from("stages")
        .select("*")
        .eq("vector_id", vector.id)
        .eq("status", "active")
        .maybeSingle();
      reject("etappe", stageRes.error);
      let stage = stageRes.data as StageRow | null;

      if (!stage) {
        const seeded = seedStage(vector.id);
        const inserted = await client
          .from("stages")
          .insert({
            vector_id: vector.id,
            milestone: seeded.milestone,
            started_on: seeded.started_on,
            deadline: seeded.deadline,
            status: seeded.status,
            stage_type: seeded.stage_type,
          })
          .select("*")
          .single();
        stage = await must<StageRow>("etappe aanmaken", inserted);
      }

      const doneRes = await client
        .from("stages")
        .select("id")
        .eq("vector_id", vector.id)
        .eq("status", "done");
      reject("etappe-historie", doneRes.error);

      const eventsRes = await client
        .from("events")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });
      reject("log", eventsRes.error);
      const events = (eventsRes.data ?? []) as EventRow[];

      return applySeedLock({
        profile: {
          id: profile.id,
          display_name: profile.display_name,
          identity_anti: profile.identity_anti ?? null,
          identity_new: profile.identity_new ?? null,
          identity_constraint: profile.identity_constraint ?? null,
          horizon_1y: profile.horizon_1y ?? null,
        },
        vector: {
          id: vector.id,
          user_id: vector.user_id,
          domain: vector.domain,
          a: Number(vector.a),
          b: Number(vector.b),
          unit: vector.unit,
          pace_constraint: vector.pace_constraint,
        },
        stage: {
          id: stage.id,
          vector_id: stage.vector_id,
          milestone: Number(stage.milestone),
          started_on: stage.started_on,
          deadline: stage.deadline,
          status: stage.status,
          stage_type: stage.stage_type,
        },
        events: events.map((row) => ({
          ...row,
          value: row.value === null ? null : Number(row.value),
        })),
        rotated: (doneRes.data ?? []).length > 0,
      });
    },

    async addEvent(input) {
      const inserted = await client
        .from("events")
        .insert({
          user_id: userId,
          date: input.date,
          kind: input.kind,
          value: input.value ?? null,
          skip_reason: input.skip_reason ?? null,
        })
        .select("*")
        .single();
      const row = await must<EventRow>("event", inserted);
      return { ...row, value: row.value === null ? null : Number(row.value) };
    },

    async saveProfile(profile) {
      const result = await client
        .from("profiles")
        .update({
          display_name: profile.display_name,
          identity_anti: profile.identity_anti,
          identity_new: profile.identity_new,
          identity_constraint: profile.identity_constraint,
          horizon_1y: profile.horizon_1y,
        })
        .eq("id", userId);
      if (result.error) throw new Error(`profiel: ${result.error.message}`);
    },

    async saveVectorConstraint(vectorId, paceConstraint) {
      const result = await client
        .from("vectors")
        .update({ pace_constraint: paceConstraint })
        .eq("id", vectorId)
        .eq("user_id", userId);
      if (result.error) throw new Error(`vector: ${result.error.message}`);
    },

    async advanceStage(current, nextMilestone) {
      const close = await client
        .from("stages")
        .update({ status: "done" })
        .eq("id", current.id);
      if (close.error) throw new Error(`etappe sluiten: ${close.error.message}`);

      const next = seedStage(current.vector_id);
      next.milestone = nextMilestone;
      const inserted = await client
        .from("stages")
        .insert({
          vector_id: next.vector_id,
          milestone: next.milestone,
          started_on: next.started_on,
          deadline: next.deadline,
          status: next.status,
          stage_type: next.stage_type,
        })
        .select("*")
        .single();
      const row = await must<StageRow>("volgende etappe", inserted);
      return { ...row, milestone: Number(row.milestone) };
    },

    async signOut() {
      await client.auth.signOut();
    },
  };
}

export async function resolveStore(
  client: SupabaseClient | null,
): Promise<
  | { kind: "ready"; store: Store }
  | { kind: "needs-auth"; client: SupabaseClient; session: Session | null }
  | { kind: "no-cloud" }
> {
  if (!client) return { kind: "no-cloud" };

  const {
    data: { session },
  } = await client.auth.getSession();

  if (session?.user) {
    return { kind: "ready", store: createCloudStore(client, session.user) };
  }

  return { kind: "needs-auth", client, session: null };
}

export function localToday(): string {
  return todayISO();
}
