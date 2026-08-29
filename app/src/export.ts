import type { Snapshot } from "./types";

export function exportPayload(snapshot: Snapshot): string {
  return JSON.stringify(
    {
      exported_at: new Date().toISOString(),
      profile: snapshot.profile,
      vector: snapshot.vector,
      stage: snapshot.stage,
      events: snapshot.events,
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
