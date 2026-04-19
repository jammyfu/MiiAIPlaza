import type {
  PlazaAgentStatus,
  PlazaPresenceAdapter,
  PlazaPresenceSnapshot,
  PlazaResident,
  PlazaWorldData,
  PlazaWorldDataProvider,
} from "../contracts/plaza";
import { listMockHotspots } from "./mockPlazaPresence";

export interface OpenClawFixtureAgent {
  id: string;
  name: string;
  occupation: string;
  state: "running" | "ready" | "waiting" | "blocked" | "offline";
  summary: string;
  task: string;
  vibe: string;
  seenAt: string;
  zone: string;
  score: number;
  tags: string[];
  palette: {
    primary: string;
    accent: string;
  };
  bio: string;
  prompt: string;
  highlights: string[];
  plazaPosition: {
    x: number;
    z: number;
  };
}

export interface OpenClawFixturePayload {
  generatedAt: string;
  workspace: string;
  agents: OpenClawFixtureAgent[];
}

function isoOffset(baseTimestamp: number, minutesAgo: number): string {
  return new Date(baseTimestamp - minutesAgo * 60_000).toISOString();
}

export function createOpenClawPresenceFixture(
  now: Date | string | number = Date.now()
): OpenClawFixturePayload {
  const baseTimestamp =
    now instanceof Date ? now.getTime() : new Date(now).getTime();

  return {
    generatedAt: new Date(baseTimestamp).toISOString(),
    workspace: "mii-plaza-client",
    agents: [
      {
        id: "openclaw",
        name: "OpenClaw",
        occupation: "Execution Captain",
        state: "running",
        summary: "Coordinating the provider seam rollout",
        task: "Mapping provider payloads into plaza residents",
        vibe: "focused",
        seenAt: isoOffset(baseTimestamp, 1),
        zone: "Fountain Walk",
        score: 0.96,
        tags: ["plans", "tools", "builds"],
        palette: {
          primary: "#ff8a4c",
          accent: "#ffd166",
        },
        bio: "Turns multi-step shipping work into visible forward motion for the plaza.",
        prompt: "Inspect the provider adapter seam OpenClaw is driving.",
        highlights: [
          "Normalizes external presence snapshots into the client contract.",
          "Will later swap fixture payloads for live provider polling.",
        ],
        plazaPosition: {
          x: -5.5,
          z: -2,
        },
      },
      {
        id: "release-orbit",
        name: "Release Orbit",
        occupation: "Stability Pilot",
        state: "ready",
        summary: "Watching the next sync window",
        task: "Preparing fallback rules for stale provider data",
        vibe: "steady",
        seenAt: isoOffset(baseTimestamp, 7),
        zone: "Board Walk",
        score: 0.61,
        tags: ["verification", "ops", "status"],
        palette: {
          primary: "#4cc9f0",
          accent: "#90f1ef",
        },
        bio: "Keeps provider transitions smooth by surfacing safe fallback behavior early.",
        prompt: "Preview how stale provider data will degrade gracefully.",
        highlights: [
          "Tracks freshness windows before live transport arrives.",
          "Will eventually power stale-data and health diagnostics.",
        ],
        plazaPosition: {
          x: 3.5,
          z: 4,
        },
      },
      {
        id: "mailbox-lantern",
        name: "Mailbox Lantern",
        occupation: "Social Relay",
        state: "waiting",
        summary: "Holding the social layer in reserve",
        task: "Keeping board and mailbox hooks aligned with the world shell",
        vibe: "hopeful",
        seenAt: isoOffset(baseTimestamp, 24),
        zone: "Mailbox Corner",
        score: 0.39,
        tags: ["mail", "board", "social"],
        palette: {
          primary: "#80ed99",
          accent: "#57cc99",
        },
        bio: "Represents the future social systems that will sit beside provider-backed presence.",
        prompt: "See how social hooks stay decoupled from provider data ingestion.",
        highlights: [
          "Keeps the social layer out of the provider adapter boundary.",
          "Will power postcards and shared board updates later on.",
        ],
        plazaPosition: {
          x: 8,
          z: -4.5,
        },
      },
    ],
  };
}

export const openClawPresenceFixture: OpenClawFixturePayload =
  createOpenClawPresenceFixture("2026-04-20T10:12:00Z");

function normalizeState(state: OpenClawFixtureAgent["state"]): PlazaAgentStatus {
  switch (state) {
    case "running":
      return "active";
    case "ready":
      return "idle";
    case "waiting":
      return "busy";
    case "blocked":
      return "blocked";
    case "offline":
    default:
      return "offline";
  }
}

export const openClawPresenceAdapter: PlazaPresenceAdapter<OpenClawFixturePayload> =
  {
    id: "openclaw-fixture",
    provider: "OpenClaw",
    listSnapshots(payload) {
      return payload.agents.map<PlazaPresenceSnapshot>((agent) => ({
        agentId: agent.id,
        status: normalizeState(agent.state),
        headline: agent.summary,
        currentTask: agent.task,
        mood: agent.vibe,
        updatedAt: agent.seenAt,
        locationHint: agent.zone,
        activityScore: agent.score,
      }));
    },
    listResidents(payload) {
      const snapshots = new Map(
        this.listSnapshots(payload).map((snapshot) => [snapshot.agentId, snapshot])
      );

      return payload.agents.map<PlazaResident>((agent) => ({
        agent: {
          id: agent.id,
          displayName: agent.name,
          provider: this.provider,
          role: agent.occupation,
          capabilityTags: agent.tags,
          themeColor: agent.palette.primary,
          accentColor: agent.palette.accent,
        },
        presence: snapshots.get(agent.id)!,
        bio: agent.bio,
        prompt: agent.prompt,
        details: [
          ...agent.highlights,
          `Workspace: ${payload.workspace}`,
        ],
        position: agent.plazaPosition,
      }));
    },
  };

export function createOpenClawFixtureWorldData(
  payload: OpenClawFixturePayload = openClawPresenceFixture
): PlazaWorldData {
  return {
    source: {
      id: "openclaw-fixture",
      provider: "OpenClaw",
      mode: "fixture",
      health: {
        state: "degraded",
        headline: "Fixture feed is available, but at least one resident snapshot is stale.",
        lastSuccessfulUpdate: payload.generatedAt,
        fallbackHint:
          "Using the last normalized snapshot while live polling is unavailable.",
        retryAfterMs: 3 * 60 * 1000,
        nextRetryAt: new Date(
          new Date(payload.generatedAt).getTime() + 3 * 60 * 1000
        ).toISOString(),
      },
    },
    residents: openClawPresenceAdapter.listResidents(payload),
    hotspots: listMockHotspots(),
  };
}

export const openClawFixtureWorldDataProvider: PlazaWorldDataProvider = {
  id: "openclaw-fixture",
  provider: "OpenClaw",
  mode: "fixture",
  async load() {
    return createOpenClawFixtureWorldData(createOpenClawPresenceFixture());
  },
};
