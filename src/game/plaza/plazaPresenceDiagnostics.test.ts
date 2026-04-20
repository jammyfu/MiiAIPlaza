import { expect, test } from "bun:test";
import type {
  PlazaPresenceSnapshot,
  PlazaWorldDataHealth,
  PlazaWorldDataRequest,
  PlazaWorldDataSource,
} from "../../contracts/plaza";
import {
  describeWorldDataRequest,
  describePresenceFreshness,
  describeWorldDataHealth,
  describeWorldDataSource,
  getPresenceDiagnostics,
} from "./plazaPresenceDiagnostics";

function makeSnapshot(overrides: Partial<PlazaPresenceSnapshot> = {}): PlazaPresenceSnapshot {
  return {
    agentId: "resident",
    status: "active",
    headline: "Shipping diagnostics",
    currentTask: "Teaching the plaza how to read provider freshness",
    mood: "focused",
    updatedAt: "2026-04-20T10:00:00Z",
    locationHint: "Fountain Walk",
    activityScore: 0.82,
    ...overrides,
  };
}

test("presence diagnostics classify fresh, aging, stale, and unknown snapshots", () => {
  const now = "2026-04-20T10:12:00Z";

  expect(
    getPresenceDiagnostics(makeSnapshot({ updatedAt: "2026-04-20T10:11:30Z" }), { now })
      .freshness
  ).toBe("fresh");
  expect(
    getPresenceDiagnostics(makeSnapshot({ updatedAt: "2026-04-20T10:06:00Z" }), { now })
      .freshness
  ).toBe("aging");
  expect(
    getPresenceDiagnostics(makeSnapshot({ updatedAt: "2026-04-20T09:48:00Z" }), { now })
      .freshness
  ).toBe("stale");
  expect(
    getPresenceDiagnostics(makeSnapshot({ updatedAt: "just now" }), { now }).freshness
  ).toBe("unknown");
});

test("presence diagnostics expose stale flags and readable update copy", () => {
  const diagnostics = getPresenceDiagnostics(
    makeSnapshot({ updatedAt: "2026-04-20T09:48:00Z" }),
    { now: "2026-04-20T10:12:00Z" }
  );

  expect(diagnostics.isStale).toBe(true);
  expect(diagnostics.updatedLabel).toContain("24m");
  expect(describePresenceFreshness(diagnostics.freshness)).toBe("Stale");
});

test("world data source copy stays readable in the hud", () => {
  const source: PlazaWorldDataSource = {
    id: "openclaw-fixture",
    provider: "OpenClaw",
    mode: "fixture",
    health: {
      state: "degraded",
      headline: "Fixture feed is available with stale residents.",
      lastSuccessfulUpdate: "2026-04-20T10:05:00Z",
      fallbackHint: "Using the last normalized snapshot while live polling is unavailable.",
    },
  };

  expect(describeWorldDataSource(source)).toBe("OpenClaw fixture feed");
});

test("world data health copy stays readable in the hud", () => {
  const health: PlazaWorldDataHealth = {
    state: "degraded",
    headline: "Fixture feed is available with stale residents.",
    lastSuccessfulUpdate: "2026-04-20T10:05:00Z",
    fallbackHint: "Using the last normalized snapshot while live polling is unavailable.",
    retryAfterMs: 180_000,
    nextRetryAt: "2026-04-20T10:15:00Z",
  };

  expect(describeWorldDataHealth(health, { now: "2026-04-20T10:12:00Z" })).toEqual({
    label: "Degraded",
    summary: "Fixture feed is available with stale residents.",
    lastUpdatedLabel: "Last good update 7m ago",
    fallbackHint: "Using the last normalized snapshot while live polling is unavailable.",
    retryLabel: "Retry in 3m",
    nextRetryLabel: "Next retry at 10:15",
  });
});

test("world data health copy can describe healthy and failing recovery timing", () => {
  const healthy: PlazaWorldDataHealth = {
    state: "healthy",
    headline: "Mock provider is healthy.",
    lastSuccessfulUpdate: "2026-04-20T10:11:00Z",
  };

  const failing: PlazaWorldDataHealth = {
    state: "failing",
    headline: "OpenClaw is currently unavailable.",
    fallbackHint: "Using the provider status terminal while recovery is pending.",
    retryAfterMs: 120_000,
    nextRetryAt: "2026-04-20T10:14:00Z",
  };

  expect(describeWorldDataHealth(healthy, { now: "2026-04-20T10:12:00Z" })).toEqual({
    label: "Healthy",
    summary: "Mock provider is healthy.",
    lastUpdatedLabel: "Last good update 1m ago",
    fallbackHint: null,
    retryLabel: "Retry on demand",
    nextRetryLabel: null,
  });

  expect(describeWorldDataHealth(failing, { now: "2026-04-20T10:12:00Z" })).toEqual({
    label: "Failing",
    summary: "OpenClaw is currently unavailable.",
    lastUpdatedLabel: null,
    fallbackHint: "Using the provider status terminal while recovery is pending.",
    retryLabel: "Retry in 2m",
    nextRetryLabel: "Next retry at 10:14",
  });
});

test("world data request copy stays readable in the hud and provider status flow", () => {
  const request: PlazaWorldDataRequest = {
    transport: "http",
    endpointLabel: "OpenClaw live endpoint pending configuration",
    authKind: "token",
    liveEnabled: false,
    workspaceHint: "mii-plaza-client",
  };

  expect(describeWorldDataRequest(request)).toEqual({
    transportLabel: "HTTP",
    endpointLabel: "OpenClaw live endpoint pending configuration",
    authLabel: "Token",
    liveLabel: "Config only",
    workspaceLabel: "Workspace: mii-plaza-client",
  });
});
