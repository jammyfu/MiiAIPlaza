import type {
  PlazaWorldDataHealth,
  PlazaPresenceSnapshot,
  PlazaResident,
  PlazaWorldDataSource,
} from "../../contracts/plaza";

export type PlazaPresenceFreshness = "fresh" | "aging" | "stale" | "unknown";

export interface PlazaPresenceDiagnostics {
  freshness: PlazaPresenceFreshness;
  isStale: boolean;
  ageMs: number | null;
  updatedLabel: string;
}

export interface PlazaPresenceDiagnosticsOptions {
  now?: Date | number | string;
  freshForMs?: number;
  staleAfterMs?: number;
}

export interface PlazaWorldDataHealthCopy {
  label: string;
  summary: string;
  lastUpdatedLabel: string | null;
  fallbackHint: string | null;
  retryLabel: string;
  nextRetryLabel: string | null;
}

const DEFAULT_FRESH_FOR_MS = 2 * 60 * 1000;
const DEFAULT_STALE_AFTER_MS = 15 * 60 * 1000;

function resolveNow(input?: Date | number | string): number {
  if (input instanceof Date) {
    return input.getTime();
  }
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    return new Date(input).getTime();
  }
  return Date.now();
}

function toTimestamp(value: string): number | null {
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) {
    return null;
  }
  return timestamp;
}

function formatDuration(ageMs: number): string {
  const minutes = Math.floor(ageMs / 60_000);
  if (minutes < 1) {
    const seconds = Math.max(0, Math.floor(ageMs / 1_000));
    return `${seconds}s ago`;
  }
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  const hours = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;
  if (remainderMinutes === 0) {
    return `${hours}h ago`;
  }
  return `${hours}h ${remainderMinutes}m ago`;
}

function formatClockTime(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function getPresenceDiagnostics(
  snapshot: PlazaPresenceSnapshot,
  options: PlazaPresenceDiagnosticsOptions = {}
): PlazaPresenceDiagnostics {
  const timestamp = toTimestamp(snapshot.updatedAt);
  if (timestamp === null) {
    return {
      freshness: "unknown",
      isStale: false,
      ageMs: null,
      updatedLabel: "Update time unavailable",
    };
  }

  const now = resolveNow(options.now);
  const ageMs = Math.max(0, now - timestamp);
  const freshForMs = options.freshForMs ?? DEFAULT_FRESH_FOR_MS;
  const staleAfterMs = options.staleAfterMs ?? DEFAULT_STALE_AFTER_MS;

  let freshness: PlazaPresenceFreshness = "aging";
  if (ageMs <= freshForMs) {
    freshness = "fresh";
  } else if (ageMs >= staleAfterMs) {
    freshness = "stale";
  }

  return {
    freshness,
    isStale: freshness === "stale",
    ageMs,
    updatedLabel: formatDuration(ageMs),
  };
}

export function describePresenceFreshness(
  freshness: PlazaPresenceFreshness
): string {
  switch (freshness) {
    case "fresh":
      return "Fresh";
    case "aging":
      return "Aging";
    case "stale":
      return "Stale";
    case "unknown":
    default:
      return "Unknown";
  }
}

export function describeWorldDataSource(source: PlazaWorldDataSource): string {
  return `${source.provider} ${source.mode} feed`;
}

export function describeWorldDataHealth(
  health: PlazaWorldDataHealth,
  options: PlazaPresenceDiagnosticsOptions = {}
): PlazaWorldDataHealthCopy {
  const label =
    health.state.charAt(0).toUpperCase() + health.state.slice(1);
  const now = resolveNow(options.now);
  let lastUpdatedLabel: string | null = null;
  let nextRetryLabel: string | null = null;

  if (health.lastSuccessfulUpdate) {
    const timestamp = toTimestamp(health.lastSuccessfulUpdate);
    if (timestamp !== null) {
      lastUpdatedLabel = `Last good update ${formatDuration(Math.max(0, now - timestamp))}`;
    }
  }

  let retryLabel = "Retry on demand";
  if (typeof health.retryAfterMs === "number") {
    retryLabel = `Retry in ${formatDuration(Math.max(0, health.retryAfterMs)).replace(" ago", "")}`;
  }

  if (health.nextRetryAt) {
    const timestamp = toTimestamp(health.nextRetryAt);
    if (timestamp !== null) {
      nextRetryLabel = `Next retry at ${formatClockTime(timestamp)}`;
    }
  }

  return {
    label,
    summary: health.headline,
    lastUpdatedLabel,
    fallbackHint: health.fallbackHint ?? null,
    retryLabel,
    nextRetryLabel,
  };
}

export function summarizeResidentDiagnostics(
  residents: PlazaResident[],
  options: PlazaPresenceDiagnosticsOptions = {}
): { staleResidents: number; blockedResidents: number } {
  let staleResidents = 0;
  let blockedResidents = 0;

  for (const resident of residents) {
    const diagnostics = getPresenceDiagnostics(resident.presence, options);
    if (diagnostics.isStale) {
      staleResidents += 1;
    }
    if (resident.presence.status === "blocked") {
      blockedResidents += 1;
    }
  }

  return { staleResidents, blockedResidents };
}
