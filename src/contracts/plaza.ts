export type PlazaAgentStatus =
  | "offline"
  | "idle"
  | "active"
  | "busy"
  | "blocked";

export interface PlazaAgentRecord {
  id: string;
  displayName: string;
  provider: string;
  role: string;
  capabilityTags: string[];
  themeColor: string;
  accentColor: string;
}

export interface PlazaPresenceSnapshot {
  agentId: string;
  status: PlazaAgentStatus;
  headline: string;
  currentTask: string;
  mood: string;
  updatedAt: string;
  locationHint: string;
  activityScore: number;
}

export interface PlazaResident {
  agent: PlazaAgentRecord;
  presence: PlazaPresenceSnapshot;
  bio: string;
  prompt: string;
  details: string[];
  position: {
    x: number;
    z: number;
  };
}

export interface PlazaPresenceAdapter<TPayload = unknown> {
  id: string;
  provider: string;
  listSnapshots(payload: TPayload): PlazaPresenceSnapshot[];
  listResidents(payload: TPayload): PlazaResident[];
}

export interface PlazaHotspot {
  id: string;
  name: string;
  prompt: string;
  description: string;
  details: string[];
  color: string;
  position: {
    x: number;
    z: number;
  };
}

export interface PlazaWorldDataSource {
  id: string;
  provider: string;
  mode: "mock" | "fixture" | "live";
  health: PlazaWorldDataHealth;
}

export interface PlazaWorldDataHealth {
  state: "healthy" | "degraded" | "failing";
  headline: string;
  lastSuccessfulUpdate?: string;
  fallbackHint?: string;
  retryAfterMs?: number;
  nextRetryAt?: string;
}

export interface PlazaWorldData {
  source: PlazaWorldDataSource;
  residents: PlazaResident[];
  hotspots: PlazaHotspot[];
}

export type PlazaWorldDataLoadTrigger = "initial" | "manual-refresh";

export interface PlazaWorldDataSnapshot {
  sequence: number;
  trigger: PlazaWorldDataLoadTrigger;
  world: PlazaWorldData;
}

export interface PlazaWorldDataPollingPlan {
  mode: "manual-only" | "cadence-ready";
  recommendedIntervalMs: number | null;
  nextSuggestedRefreshAt?: string;
  reason: string;
}

export interface PlazaWorldDataProvider {
  id: string;
  provider: string;
  mode: PlazaWorldDataSource["mode"];
  load(): Promise<PlazaWorldData>;
}
