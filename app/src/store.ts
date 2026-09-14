import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { newId, nowISO, todayISO } from "./dates";
import { isUndoableEvent } from "./loop";
import { emptyIdentity } from "./identity";
import { applyStartSelection } from "./goals";
import {
  applyItemLater,
  applyItemRemoval,
  applyItemWeekdays,
  canAddItem,
  canRenameItem,
  createUserItem,
  findRemovedUserItem,
  mergeSeedItems,
  nextItemSort,
  normalizeItem,
  normalizeItemLabel,
  recoverSnapshots,
  restoreUserItem,
  toggleWeekday,
  updateUserItem,
  type UserItemKind,
} from "./items";
import { parseImport, mergeImport } from "./import";
import { applySeedLock, emptyProfile, emptySnapshot, emptyStage, seedSnapshot, seedStage, testTenantItems } from "./seed";
import { normalizeThemes } from "./themes";
import {
  LOCAL_CHOSEN_KEY,
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_LEGACY_KEYS,
  LOCAL_TENANT_KEY,
  LOCAL_USER_KEY,
  type AgeBand,
  type GoalId,
  type Item,
  type LogEvent,
  type Profile,
  type Snapshot,
  type Stage,
} from "./types";

export type SessionMode = "local" | "cloud";

export interface Store {
  mode: SessionMode;
  userId: string;
  tenantId: string;
  email: string | null;
  load(): Promise<Snapshot>;
  addEvent(
    event: Omit<LogEvent, "id" | "user_id" | "tenant_id" | "created_at"> & {
      id?: string;
    },
  ): Promise<LogEvent>;
  removeEvent(eventId: string): Promise<void>;
  saveProfile(profile: Profile): Promise<void>;
  saveOnboarding(input: { goals: GoalId[]; age_band: AgeBand; startIds: string[] }): Promise<void>;
  saveThemes(themes: string[]): Promise<void>;
  setItemLater(itemId: string, later: boolean): Promise<void>;
  toggleItemWeekday(itemId: string, day: number): Promise<Item>;
  addItem(input: { label: string; kind: UserItemKind; timing?: string }): Promise<Item>;
  updateItem(input: { id: string; label: string; kind: UserItemKind; timing?: string }): Promise<Item>;
  removeItem(itemId: string): Promise<Item>;
  saveVectorConstraint(vectorId: string, paceConstraint: string | null): Promise<void>;
  advanceStage(current: Stage, nextMilestone: number): Promise<Stage>;
  importJson(raw: string): Promise<Snapshot>;
  signOut(): Promise<void>;
}

function readLocalUserId(): string {
  const existing = localStorage.getItem(LOCAL_USER_KEY);
  if (existing) return existing;
  const id = newId();
  localStorage.setItem(LOCAL_USER_KEY, id);
  return id;
}

function readLocalTenantId(): string {
  const existing = localStorage.getItem(LOCAL_TENANT_KEY);
  if (existing) return existing;
  const id = newId();
  localStorage.setItem(LOCAL_TENANT_KEY, id);
  return id;
}

function writeLocal(snapshot: Snapshot): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(snapshot));
}

function parseSnapshot(raw: string | null): Snapshot | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Snapshot;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function storedSnapshots(): Snapshot[] {
  return [LOCAL_STORAGE_KEY, ...LOCAL_STORAGE_LEGACY_KEYS]
    .map((key) => parseSnapshot(localStorage.getItem(key)))
    .filter((snap): snap is Snapshot => snap !== null);
}

function normalizeSnapshot(raw: Snapshot, userId: string, tenantId: string): Snapshot {
  const items = mergeSeedItems(raw.items ?? [], testTenantItems(tenantId), tenantId).map((item) =>
    normalizeItem(item, tenantId),
  );
  return {
    ...raw,
    profile: {
      ...emptyProfile(userId, tenantId),
      ...raw.profile,
      tenant_id: raw.profile?.tenant_id ?? tenantId,
      ...emptyIdentity(),
      ...{
        identity_anti: raw.profile?.identity_anti ?? null,
        identity_new: raw.profile?.identity_new ?? null,
        identity_constraint: raw.profile?.identity_constraint ?? null,
        horizon_1y: raw.profile?.horizon_1y ?? null,
        age_band: raw.profile?.age_band ?? null,
        goals: Array.isArray(raw.profile?.goals) ? raw.profile.goals : [],
        themes: normalizeThemes(raw.profile?.themes),
      },
    },
    items,
    vector: {
      ...raw.vector,
      tenant_id: raw.vector?.tenant_id ?? tenantId,
    },
    stage: {
      ...raw.stage,
      tenant_id: raw.stage?.tenant_id ?? tenantId,
    },
    events: (raw.events ?? []).map((event) => ({
      ...event,
      tenant_id: event.tenant_id ?? tenantId,
      item_id: event.item_id ?? null,
    })),
    rotated: Boolean(raw.rotated),
    onboarded: raw.onboarded ?? true,
    theme_step: raw.theme_step ?? false,
  };
}

function readLocal(userId: string, tenantId: string): Snapshot {
  const stored = storedSnapshots();
  if (stored.length === 0) {
    const seeded = seedSnapshot(userId, todayISO(), tenantId);
    writeLocal(seeded);
    return seeded;
  }
  const recovered =
    recoverSnapshots(stored, testTenantItems(tenantId), userId, tenantId) ?? stored[0];
  const next = applySeedLock(normalizeSnapshot(recovered, userId, tenantId));
  writeLocal(next);
  return next;
}

function hasStoredSnapshot(): boolean {
  return storedSnapshots().length > 0;
}

export function hasLocalSession(): boolean {
  return Boolean(localStorage.getItem(LOCAL_CHOSEN_KEY) || hasStoredSnapshot());
}

export function createLocalStore(): Store {
  localStorage.setItem(LOCAL_CHOSEN_KEY, "1");
  const userId = readLocalUserId();
  const tenantId = readLocalTenantId();

  return {
    mode: "local",
    userId,
    tenantId,
    email: null,

    async load() {
      return readLocal(userId, tenantId);
    },

    async addEvent(input) {
      const snapshot = readLocal(userId, tenantId);
      const event: LogEvent = {
        id: input.id ?? newId(),
        tenant_id: tenantId,
        user_id: userId,
        item_id: input.item_id ?? null,
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

    async removeEvent(eventId) {
      const snapshot = readLocal(userId, tenantId);
      const event = snapshot.events.find((row) => row.id === eventId);
      if (!event) return;
      if (!isUndoableEvent(event, todayISO())) throw new Error("alleen vandaag");
      snapshot.events = snapshot.events.filter((row) => row.id !== eventId);
      writeLocal(snapshot);
    },

    async saveProfile(profile) {
      const snapshot = readLocal(userId, tenantId);
      snapshot.profile = profile;
      writeLocal(snapshot);
    },

    async saveOnboarding(input) {
      const snapshot = readLocal(userId, tenantId);
      snapshot.profile = {
        ...snapshot.profile,
        goals: input.goals,
        age_band: input.age_band,
        themes: normalizeThemes(snapshot.profile.themes),
      };
      snapshot.items = applyStartSelection(snapshot.items, input.startIds);
      snapshot.onboarded = true;
      snapshot.theme_step = true;
      writeLocal(snapshot);
    },

    async saveThemes(themes) {
      const snapshot = readLocal(userId, tenantId);
      snapshot.profile = {
        ...snapshot.profile,
        themes: normalizeThemes(themes),
      };
      snapshot.theme_step = true;
      writeLocal(snapshot);
    },

    async setItemLater(itemId, later) {
      const snapshot = readLocal(userId, tenantId);
      snapshot.items = snapshot.items.map((item) => {
        if (item.id !== itemId) return item;
        return applyItemLater(item, later) ?? item;
      });
      writeLocal(snapshot);
    },

    async toggleItemWeekday(itemId, day) {
      const snapshot = readLocal(userId, tenantId);
      const current = snapshot.items.find((item) => item.id === itemId);
      if (!current) throw new Error("item ontbreekt");
      const item = applyItemWeekdays(current, toggleWeekday(current.weekdays, day));
      if (!item) throw new Error("geen weekdagen");
      snapshot.items = snapshot.items.map((row) => (row.id === item.id ? item : row));
      writeLocal(snapshot);
      return item;
    },

    async addItem(input) {
      const snapshot = readLocal(userId, tenantId);
      const restorable = findRemovedUserItem(snapshot.items, input.label);
      if (restorable) {
        const restored = restoreUserItem(restorable, {
          label: input.label,
          kind: input.kind,
          timing: input.timing,
        });
        if (!restored) throw new Error("naam ontbreekt");
        snapshot.items = snapshot.items.map((row) => (row.id === restored.id ? restored : row));
        writeLocal(snapshot);
        return restored;
      }
      const item = createUserItem({
        tenantId,
        label: input.label,
        kind: input.kind,
        timing: input.timing,
        sort: nextItemSort(snapshot.items),
      });
      if (!item) throw new Error("naam ontbreekt");
      if (!canAddItem(snapshot.items, item.label)) throw new Error("item bestaat al");
      snapshot.items = [...snapshot.items, item];
      writeLocal(snapshot);
      return item;
    },

    async updateItem(input) {
      const snapshot = readLocal(userId, tenantId);
      const current = snapshot.items.find((row) => row.id === input.id);
      if (!current) throw new Error("item ontbreekt");
      if (!normalizeItemLabel(input.label)) throw new Error("naam ontbreekt");
      if (!canRenameItem(snapshot.items, current.id, input.label)) throw new Error("item bestaat al");
      const item = updateUserItem(current, input);
      if (!item) throw new Error("alleen eigen item");
      snapshot.items = snapshot.items.map((row) => (row.id === item.id ? item : row));
      writeLocal(snapshot);
      return item;
    },

    async removeItem(itemId) {
      const snapshot = readLocal(userId, tenantId);
      const current = snapshot.items.find((row) => row.id === itemId);
      if (!current) throw new Error("item ontbreekt");
      const next = applyItemRemoval(current);
      if (!next) throw new Error("item blijft");
      snapshot.items = snapshot.items.map((row) => (row.id === next.item.id ? next.item : row));
      writeLocal(snapshot);
      return next.item;
    },

    async saveVectorConstraint(vectorId, paceConstraint) {
      const snapshot = readLocal(userId, tenantId);
      if (snapshot.vector.id === vectorId) {
        snapshot.vector.pace_constraint = paceConstraint;
        writeLocal(snapshot);
      }
    },

    async advanceStage(current, nextMilestone) {
      const snapshot = readLocal(userId, tenantId);
      const next = seedStage(current.vector_id, tenantId);
      next.milestone = nextMilestone;
      snapshot.stage = next;
      snapshot.items = snapshot.items.map((item) =>
        item.id === current.vector_id ? { ...item, milestone: nextMilestone } : item,
      );
      snapshot.rotated = true;
      writeLocal(snapshot);
      return next;
    },

    async importJson(raw) {
      const incoming = parseImport(raw);
      const snapshot = readLocal(userId, tenantId);
      const next = applySeedLock(normalizeSnapshot(mergeImport(snapshot, incoming), userId, tenantId));
      writeLocal(next);
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

export function createCloudStore(client: SupabaseClient, user: User, tenantId: string): Store {
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
    tenantId,
    email: user.email ?? null,

    async load() {
      const profileRes = await client.from("profiles").select("*").eq("id", userId).maybeSingle();
      reject("profiel", profileRes.error);

      let profile = profileRes.data as ProfileRow | null;
      if (!profile) {
        const inserted = await client
          .from("profiles")
          .insert({ id: userId, tenant_id: tenantId })
          .select("*")
          .single();
        profile = await must<ProfileRow>("profiel aanmaken", inserted);
      }

      const vectorRes = await client
        .from("vectors")
        .select("*")
        .eq("tenant_id", tenantId)
        .eq("domain", "strength")
        .maybeSingle();
      reject("vector", vectorRes.error);
      let vector = vectorRes.data as VectorRow | null;

      if (!vector) {
        const blank = emptySnapshot(userId, todayISO(), tenantId);
        const inserted = await client
          .from("vectors")
          .insert({
            tenant_id: tenantId,
            user_id: userId,
            domain: blank.vector.domain,
            a: blank.vector.a,
            b: blank.vector.b,
            unit: blank.vector.unit,
            pace_constraint: blank.vector.pace_constraint,
          })
          .select("*")
          .single();
        vector = await must<VectorRow>("vector aanmaken", inserted);
      }

      const stageRes = await client
        .from("stages")
        .select("*")
        .eq("tenant_id", tenantId)
        .eq("vector_id", vector.id)
        .eq("status", "active")
        .maybeSingle();
      reject("etappe", stageRes.error);
      let stage = stageRes.data as StageRow | null;

      if (!stage) {
        const blank = emptyStage(vector.id, tenantId);
        const inserted = await client
          .from("stages")
          .insert({
            tenant_id: tenantId,
            vector_id: vector.id,
            milestone: blank.milestone,
            started_on: blank.started_on,
            deadline: blank.deadline,
            status: blank.status,
            stage_type: blank.stage_type,
          })
          .select("*")
          .single();
        stage = await must<StageRow>("etappe aanmaken", inserted);
      }

      const doneRes = await client
        .from("stages")
        .select("id")
        .eq("tenant_id", tenantId)
        .eq("vector_id", vector.id)
        .eq("status", "done");
      reject("etappe-historie", doneRes.error);

      const eventsRes = await client
        .from("events")
        .select("*")
        .eq("tenant_id", tenantId)
        .order("created_at", { ascending: true });
      reject("log", eventsRes.error);
      const events = (eventsRes.data ?? []) as EventRow[];

      const itemsRes = await client
        .from("items")
        .select("*")
        .eq("tenant_id", tenantId)
        .order("sort", { ascending: true });
      const items = ((itemsRes.error ? [] : (itemsRes.data ?? [])) as Item[]).map((item) =>
        normalizeItem(item, tenantId),
      );

      return {
        profile: {
          id: profile.id,
          tenant_id: profile.tenant_id ?? tenantId,
          display_name: profile.display_name,
          identity_anti: profile.identity_anti ?? null,
          identity_new: profile.identity_new ?? null,
          identity_constraint: profile.identity_constraint ?? null,
          horizon_1y: profile.horizon_1y ?? null,
          age_band: (profile as Profile).age_band ?? null,
          goals: Array.isArray((profile as Profile).goals) ? (profile as Profile).goals : [],
          themes: normalizeThemes((profile as Profile).themes),
        },
        items,
        vector: {
          id: vector.id,
          tenant_id: vector.tenant_id ?? tenantId,
          user_id: vector.user_id,
          domain: vector.domain,
          a: Number(vector.a),
          b: Number(vector.b),
          unit: vector.unit,
          pace_constraint: vector.pace_constraint,
        },
        stage: {
          id: stage.id,
          tenant_id: stage.tenant_id ?? tenantId,
          vector_id: stage.vector_id,
          milestone: Number(stage.milestone),
          started_on: stage.started_on,
          deadline: stage.deadline,
          status: stage.status,
          stage_type: stage.stage_type,
        },
        events: events.map((row) => ({
          ...row,
          tenant_id: row.tenant_id ?? tenantId,
          item_id: row.item_id ?? null,
          value: row.value === null ? null : Number(row.value),
        })),
        rotated: (doneRes.data ?? []).length > 0,
        onboarded: true,
        theme_step: Boolean((profile as Profile & { theme_step?: boolean }).theme_step),
      };
    },

    async addEvent(input) {
      const inserted = await client
        .from("events")
        .insert({
          ...(input.id ? { id: input.id } : {}),
          tenant_id: tenantId,
          user_id: userId,
          item_id: input.item_id ?? null,
          date: input.date,
          kind: input.kind,
          value: input.value ?? null,
          skip_reason: input.skip_reason ?? null,
        })
        .select("*")
        .single();
      const row = await must<EventRow>("event", inserted);
      return { ...row, tenant_id: row.tenant_id ?? tenantId, item_id: row.item_id ?? null, value: row.value === null ? null : Number(row.value) };
    },

    async removeEvent(eventId) {
      const current = await this.load();
      const event = current.events.find((row) => row.id === eventId);
      if (!event) return;
      if (!isUndoableEvent(event, todayISO())) throw new Error("alleen vandaag");
      const result = await client
        .from("events")
        .delete()
        .eq("id", eventId)
        .eq("tenant_id", tenantId)
        .eq("user_id", userId);
      if (result.error) throw new Error(`event: ${result.error.message}`);
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
          age_band: profile.age_band,
          goals: profile.goals,
          themes: normalizeThemes(profile.themes),
        })
        .eq("id", userId)
        .eq("tenant_id", tenantId);
      if (result.error) throw new Error(`profiel: ${result.error.message}`);
    },

    async saveOnboarding(input) {
      const result = await client
        .from("profiles")
        .update({ age_band: input.age_band, goals: input.goals, theme_step: true })
        .eq("id", userId)
        .eq("tenant_id", tenantId);
      if (result.error) throw new Error(`onboarding: ${result.error.message}`);
    },

    async saveThemes(themes) {
      const result = await client
        .from("profiles")
        .update({ themes: normalizeThemes(themes), theme_step: true })
        .eq("id", userId)
        .eq("tenant_id", tenantId);
      if (result.error) throw new Error(`themas: ${result.error.message}`);
    },

    async setItemLater(itemId, later) {
      const current = (await this.load()).items.find((item) => item.id === itemId);
      const next = current ? applyItemLater(current, later) : null;
      if (!next) return;
      const result = await client
        .from("items")
        .update({ later: next.later })
        .eq("id", itemId)
        .eq("tenant_id", tenantId);
      if (result.error) throw new Error(`later: ${result.error.message}`);
    },

    async toggleItemWeekday(itemId, day) {
      const current = (await this.load()).items.find((item) => item.id === itemId);
      if (!current) throw new Error("item ontbreekt");
      const item = applyItemWeekdays(current, toggleWeekday(current.weekdays, day));
      if (!item) throw new Error("geen weekdagen");
      const result = await client
        .from("items")
        .update({ weekdays: item.weekdays ?? [] })
        .eq("id", item.id)
        .eq("tenant_id", tenantId)
        .select("*")
        .single();
      const row = await must<Item>("weekdagen", result);
      return normalizeItem(row, tenantId);
    },

    async addItem(input) {
      const current = await this.load();
      const restorable = findRemovedUserItem(current.items, input.label);
      if (restorable) {
        const restored = restoreUserItem(restorable, {
          label: input.label,
          kind: input.kind,
          timing: input.timing,
        });
        if (!restored) throw new Error("naam ontbreekt");
        const result = await client
          .from("items")
          .update({
            type: restored.type,
            label: restored.label,
            timing: restored.timing,
            later: restored.later,
            removed: restored.removed,
          })
          .eq("id", restored.id)
          .eq("tenant_id", tenantId)
          .select("*")
          .single();
        const row = await must<Item>("item", result);
        return normalizeItem(row, tenantId);
      }
      const item = createUserItem({
        tenantId,
        label: input.label,
        kind: input.kind,
        timing: input.timing,
        sort: nextItemSort(current.items),
      });
      if (!item) throw new Error("naam ontbreekt");
      if (!canAddItem(current.items, item.label)) throw new Error("item bestaat al");
      const inserted = await client
        .from("items")
        .insert({
          id: item.id,
          tenant_id: tenantId,
          type: item.type,
          label: item.label,
          unit: item.unit,
          a: item.a,
          b: item.b,
          milestone: item.milestone,
          weekdays: item.weekdays ?? [],
          times_per_week: item.times_per_week,
          sort: item.sort,
          timing: item.timing,
          role: item.role,
          template: item.template,
          later: item.later,
          removed: item.removed ?? false,
        })
        .select("*")
        .single();
      const row = await must<Item>("item", inserted);
      return normalizeItem(row, tenantId);
    },

    async updateItem(input) {
      const current = await this.load();
      const existing = current.items.find((row) => row.id === input.id);
      if (!existing) throw new Error("item ontbreekt");
      if (!normalizeItemLabel(input.label)) throw new Error("naam ontbreekt");
      if (!canRenameItem(current.items, existing.id, input.label)) throw new Error("item bestaat al");
      const item = updateUserItem(existing, input);
      if (!item) throw new Error("alleen eigen item");
      const result = await client
        .from("items")
        .update({
          type: item.type,
          label: item.label,
          timing: item.timing,
        })
        .eq("id", item.id)
        .eq("tenant_id", tenantId)
        .select("*")
        .single();
      const row = await must<Item>("item", result);
      return normalizeItem(row, tenantId);
    },

    async removeItem(itemId) {
      const current = await this.load();
      const existing = current.items.find((row) => row.id === itemId);
      if (!existing) throw new Error("item ontbreekt");
      const next = applyItemRemoval(existing);
      if (!next) throw new Error("item blijft");
      const result = await client
        .from("items")
        .update({
          later: next.item.later,
          removed: next.item.removed ?? false,
        })
        .eq("id", next.item.id)
        .eq("tenant_id", tenantId)
        .select("*")
        .single();
      const row = await must<Item>("item", result);
      return normalizeItem(row, tenantId);
    },

    async saveVectorConstraint(vectorId, paceConstraint) {
      const result = await client
        .from("vectors")
        .update({ pace_constraint: paceConstraint })
        .eq("id", vectorId)
        .eq("tenant_id", tenantId);
      if (result.error) throw new Error(`vector: ${result.error.message}`);
    },

    async advanceStage(current, nextMilestone) {
      const close = await client
        .from("stages")
        .update({ status: "done" })
        .eq("id", current.id)
        .eq("tenant_id", tenantId);
      if (close.error) throw new Error(`etappe sluiten: ${close.error.message}`);

      const next = seedStage(current.vector_id, tenantId);
      next.milestone = nextMilestone;
      const inserted = await client
        .from("stages")
        .insert({
          tenant_id: tenantId,
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
      return { ...row, tenant_id: row.tenant_id ?? tenantId, milestone: Number(row.milestone) };
    },

    async importJson(raw) {
      const incoming = parseImport(raw);
      const current = await this.load();
      const merged = mergeImport(current, incoming);
      await this.saveProfile(merged.profile);
      if (merged.theme_step) {
        await this.saveThemes(merged.profile.themes);
      }
      const haveItem = new Set(current.items.map((item) => item.id));
      for (const item of merged.items) {
        if (haveItem.has(item.id)) continue;
        const inserted = await client
          .from("items")
          .insert({
            id: item.id,
            tenant_id: tenantId,
            type: item.type,
            label: item.label,
            unit: item.unit,
            a: item.a,
            b: item.b,
            milestone: item.milestone,
            weekdays: item.weekdays ?? [],
            times_per_week: item.times_per_week,
            sort: item.sort,
            timing: item.timing,
            role: item.role,
            template: item.template,
            later: item.later,
            removed: item.removed ?? false,
          })
          .select("*")
          .single();
        await must<Item>("item", inserted);
      }
      const haveEvent = new Set(current.events.map((event) => event.id));
      for (const event of merged.events) {
        if (haveEvent.has(event.id)) continue;
        await this.addEvent({
          id: event.id,
          item_id: event.item_id,
          date: event.date,
          kind: event.kind,
          value: event.value,
          skip_reason: event.skip_reason,
        });
      }
      return this.load();
    },

    async signOut() {
      await client.auth.signOut();
    },
  };
}

export async function ensureOwnTenant(client: SupabaseClient): Promise<string> {
  const { data, error } = await client.rpc("ensure_own_tenant");
  if (error) throw new Error(`tenant: ${error.message}`);
  if (!data || typeof data !== "string") throw new Error("tenant: geen id");
  return data;
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
    const tenantId = await ensureOwnTenant(client);
    return { kind: "ready", store: createCloudStore(client, session.user, tenantId) };
  }

  return { kind: "needs-auth", client, session: null };
}

export function localToday(): string {
  return todayISO();
}
