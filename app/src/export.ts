import type { Snapshot } from "./types";
import { LOCAL_STORAGE_KEY } from "./types";

/** Full v6 snapshot. Read-only. Does not write or wipe storage. */
export function exportPayload(snapshot: Snapshot): string {
  return JSON.stringify(
    {
      exported_at: new Date().toISOString(),
      key: LOCAL_STORAGE_KEY,
      profile: snapshot.profile,
      items: snapshot.items,
      vector: snapshot.vector,
      stage: snapshot.stage,
      events: snapshot.events,
      rotated: snapshot.rotated,
      onboarded: snapshot.onboarded,
      theme_step: snapshot.theme_step,
    },
    null,
    2,
  );
}

export function downloadExport(snapshot: Snapshot): void {
  const blob = new Blob([exportPayload(snapshot)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `routine-${snapshot.profile.id.slice(0, 8)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}
