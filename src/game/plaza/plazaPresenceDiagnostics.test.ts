import { expect, test } from "bun:test";
import type {
  PlazaPresenceSnapshot,
  PlazaWorldDataHealth,
  PlazaWorldDataRequest,
  PlazaWorldDataSource,
} from "../../contracts/plaza";
import {
  describeWorldDataRequest,
  describeWorldDataRequestExecutor,
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
    descriptor: {
      method: "GET",
      pathLabel: "/presence",
      queryLabel: "view=plaza&workspace=mii-plaza-client",
      acceptLabel: "application/json",
      authHeaderLabel: "Authorization: Bearer OPENCLAW_TOKEN",
    },
    transportDelegate: {
      id: "openclaw-preview-transport",
      label: "Preview transport delegate",
      summary:
        "Consumes the request descriptor and returns a preview payload without network I/O.",
    },
    fetchRunner: {
      id: "openclaw-preview-runner",
      label: "Preview fetch runner",
      contract: "network-capable",
      mode: "preview",
      summary:
        "Provides preview payloads for the transport delegate without invoking a real network fetch.",
    },
    fetchRunnerFactory: {
      id: "openclaw-runner-factory",
      label: "OpenClaw fetch-runner factory",
      summary:
        "Chooses between preview and live-capable runner implementations without changing the transport delegate seam.",
    },
    runnerEnvelope: {
      id: "openclaw-runner-envelope",
      label: "OpenClaw runner request envelope",
      summary:
        "Normalizes endpoint, auth, and descriptor inputs into one runner-consumable shape before live fetches exist.",
      transport: "http",
      endpointLabel: "OpenClaw live endpoint pending configuration",
      authKind: "token",
      runnerMode: "preview",
      workspaceHint: "mii-plaza-client",
      descriptor: {
        method: "GET",
        pathLabel: "/presence",
        queryLabel: "view=plaza&workspace=mii-plaza-client",
        acceptLabel: "application/json",
        authHeaderLabel: "Authorization: Bearer OPENCLAW_TOKEN",
      },
    },
    executor: {
      status: "needs-config",
      mode: "dry-run",
      summary: "Configure a live OpenClaw endpoint before enabling fetch execution.",
    },
  };

  expect(describeWorldDataRequest(request)).toEqual({
    transportLabel: "HTTP",
    endpointLabel: "OpenClaw live endpoint pending configuration",
    authLabel: "Token",
    liveLabel: "Config only",
    workspaceLabel: "Workspace: mii-plaza-client",
    descriptorLabel: "GET /presence",
    descriptorQueryLabel: "Query: view=plaza&workspace=mii-plaza-client",
    descriptorAcceptLabel: "Accepts: application/json",
    descriptorAuthLabel: "Auth header: Authorization: Bearer OPENCLAW_TOKEN",
    transportDelegateLabel: "Preview transport delegate",
    transportDelegateSummary:
      "Consumes the request descriptor and returns a preview payload without network I/O.",
    fetchRunnerLabel: "Preview fetch runner",
    fetchRunnerContractLabel: "Network-capable preview runner",
    fetchRunnerSummary:
      "Provides preview payloads for the transport delegate without invoking a real network fetch.",
    fetchRunnerFactoryLabel: "OpenClaw fetch-runner factory",
    fetchRunnerFactorySummary:
      "Chooses between preview and live-capable runner implementations without changing the transport delegate seam.",
    runnerEnvelopeLabel: "OpenClaw runner request envelope",
    runnerEnvelopeSummary:
      "Normalizes endpoint, auth, and descriptor inputs into one runner-consumable shape before live fetches exist.",
    runnerEnvelopeTargetLabel:
      "Envelope target: GET /presence via OpenClaw live endpoint pending configuration",
    executorLabel: "Dry run needs config",
    executorSummary: "Configure a live OpenClaw endpoint before enabling fetch execution.",
  });
});

test("world data request executor copy stays readable in diagnostics", () => {
  expect(
    describeWorldDataRequestExecutor({
      status: "ready",
      mode: "live",
      summary: "Executor seam is configured for live OpenClaw fetches once network calls are allowed.",
    })
  ).toEqual({
    label: "Live ready",
    summary:
      "Executor seam is configured for live OpenClaw fetches once network calls are allowed.",
  });
});
