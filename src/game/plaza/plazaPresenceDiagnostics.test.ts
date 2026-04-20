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
    requestBuilder: {
      id: "openclaw-live-request-builder",
      label: "OpenClaw live request builder",
      summary:
        "Resolves the runner envelope into a concrete fetch-ready request shape without executing network calls.",
      method: "GET",
      urlLabel:
        "OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
      headerLabels: [
        "Accept: application/json",
        "Authorization: Bearer OPENCLAW_TOKEN",
      ],
    },
    fetchAttempt: {
      id: "openclaw-live-fetch-attempt",
      label: "OpenClaw live fetch attempt",
      summary:
        "Represents the next transport-ready fetch input derived from the request builder without executing it.",
      method: "GET",
      urlLabel:
        "OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
      headerLabels: [
        "Accept: application/json",
        "Authorization: Bearer OPENCLAW_TOKEN",
      ],
      runnerMode: "preview",
    },
    fetchResult: {
      id: "openclaw-live-fetch-result",
      label: "OpenClaw live fetch result",
      summary:
        "Represents the placeholder transport response shape that future live fetches will hydrate after a fetch attempt.",
      status: "preview-payload",
      payloadLabel: "Preview payload available from no-network live-preview execution.",
      sourceAttemptLabel:
        "GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
      runnerMode: "preview",
    },
    responseEnvelope: {
      id: "openclaw-live-response-envelope",
      label: "OpenClaw live response envelope",
      summary:
        "Represents the normalization-ready handoff state derived from the fetch result before real transport responses are processed.",
      status: "preview-payload",
      payloadLabel: "Preview payload available from no-network live-preview execution.",
      sourceResultLabel:
        "Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
      normalizationTargetLabel: "OpenClaw live response normalizer",
      runnerMode: "preview",
    },
    normalizerHandoff: {
      id: "openclaw-live-normalizer-handoff",
      label: "OpenClaw live normalizer handoff",
      summary:
        "Represents the placeholder normalization-boundary state derived from the response envelope before payload normalization runs.",
      status: "preview-payload",
      payloadLabel: "Preview payload available from no-network live-preview execution.",
      sourceEnvelopeLabel:
        "Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
      normalizationTargetLabel: "OpenClaw live response normalizer",
      runnerMode: "preview",
    },
    executionPayload: {
      id: "openclaw-live-execution-payload",
      label: "OpenClaw live execution payload",
      summary:
        "Represents the placeholder execution-boundary payload derived from the normalizer handoff before live transport execution runs.",
      status: "preview-payload",
      payloadLabel: "Preview payload available from no-network live-preview execution.",
      sourceHandoffLabel:
        "Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
      executionTargetLabel: "OpenClaw live execution bridge",
      runnerMode: "preview",
    },
    executionBridge: {
      id: "openclaw-live-execution-bridge",
      label: "OpenClaw live execution bridge",
      summary:
        "Represents the placeholder bridge-boundary record derived from the execution payload before actual live fetch execution runs.",
      status: "preview-payload",
      payloadLabel: "Preview payload available from no-network live-preview execution.",
      sourceExecutionPayloadLabel:
        "Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
      bridgeTargetLabel: "OpenClaw live fetch entrypoint",
      runnerMode: "preview",
    },
    fetchEntry: {
      id: "openclaw-live-fetch-entry",
      label: "OpenClaw live fetch entry",
      summary:
        "Represents the placeholder fetch-call-boundary record derived from the execution bridge before actual live fetch execution runs.",
      status: "preview-payload",
      payloadLabel: "Preview payload available from no-network live-preview execution.",
      sourceExecutionBridgeLabel:
        "Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
      fetchTargetLabel: "OpenClaw live fetch call",
      runnerMode: "preview",
    },
    fetchDispatch: {
      id: "openclaw-live-fetch-dispatch",
      label: "OpenClaw live fetch dispatch",
      summary:
        "Represents the placeholder network-invocation-boundary record derived from the fetch entry before actual live network execution runs.",
      status: "preview-payload",
      payloadLabel: "Preview payload available from no-network live-preview execution.",
      sourceFetchEntryLabel:
        "Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
      dispatchTargetLabel: "OpenClaw live network invocation",
      runnerMode: "preview",
    },
    transportCall: {
      id: "openclaw-live-transport-call",
      label: "OpenClaw live transport call",
      summary:
        "Represents the placeholder transport-invocation-boundary record derived from the fetch dispatch before actual live network calls run.",
      status: "preview-payload",
      payloadLabel:
        "Preview payload available from no-network live-preview execution.",
      sourceFetchDispatchLabel:
        "Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
      transportTargetLabel: "OpenClaw live transport invocation",
      runnerMode: "preview",
    },
    fetchExecution: {
      id: "openclaw-live-fetch-execution",
      label: "OpenClaw live fetch execution",
      summary:
        "Represents the placeholder network-execution-boundary record derived from the transport call before actual live network execution runs.",
      status: "preview-payload",
      payloadLabel:
        "Preview payload available from no-network live-preview execution.",
      sourceTransportCallLabel:
        "Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
      executionTargetLabel: "OpenClaw live network execution",
      runnerMode: "preview",
    },
    executionDelegate: {
      id: "openclaw-live-execution-delegate",
      label: "OpenClaw live execution delegate",
      summary:
        "Represents the placeholder transport-implementation-boundary record derived from the fetch execution before actual live network transport implementation runs.",
      status: "preview-payload",
      payloadLabel:
        "Preview payload available from no-network live-preview execution.",
      sourceFetchExecutionLabel:
        "Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
      delegateTargetLabel: "OpenClaw live transport implementation",
      runnerMode: "preview",
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
    requestBuilderLabel: "OpenClaw live request builder",
    requestBuilderSummary:
      "Resolves the runner envelope into a concrete fetch-ready request shape without executing network calls.",
    requestBuilderTargetLabel:
      "Request build: GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
    requestBuilderHeadersLabel:
      "Headers: Accept: application/json; Authorization: Bearer OPENCLAW_TOKEN",
    fetchAttemptLabel: "OpenClaw live fetch attempt",
    fetchAttemptSummary:
      "Represents the next transport-ready fetch input derived from the request builder without executing it.",
    fetchAttemptTargetLabel:
      "Fetch attempt: GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
    fetchAttemptHeadersLabel:
      "Attempt headers: Accept: application/json; Authorization: Bearer OPENCLAW_TOKEN",
    fetchAttemptModeLabel: "Attempt mode: Preview",
    fetchResultLabel: "OpenClaw live fetch result",
    fetchResultSummary:
      "Represents the placeholder transport response shape that future live fetches will hydrate after a fetch attempt.",
    fetchResultStatusLabel: "Fetch result status: Preview payload",
    fetchResultPayloadLabel:
      "Result payload: Preview payload available from no-network live-preview execution.",
    fetchResultSourceLabel:
      "Result source attempt: GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
    fetchResultModeLabel: "Result mode: Preview",
    responseEnvelopeLabel: "OpenClaw live response envelope",
    responseEnvelopeSummary:
      "Represents the normalization-ready handoff state derived from the fetch result before real transport responses are processed.",
    responseEnvelopeStatusLabel: "Response envelope status: Preview payload",
    responseEnvelopePayloadLabel:
      "Envelope payload: Preview payload available from no-network live-preview execution.",
    responseEnvelopeSourceLabel:
      "Envelope source result: Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
    responseEnvelopeTargetLabel:
      "Normalization handoff: OpenClaw live response normalizer",
    responseEnvelopeModeLabel: "Envelope mode: Preview",
    normalizerHandoffLabel: "OpenClaw live normalizer handoff",
    normalizerHandoffSummary:
      "Represents the placeholder normalization-boundary state derived from the response envelope before payload normalization runs.",
    normalizerHandoffStatusLabel: "Normalizer handoff status: Preview payload",
    normalizerHandoffPayloadLabel:
      "Normalizer payload: Preview payload available from no-network live-preview execution.",
    normalizerHandoffSourceLabel:
      "Normalizer source envelope: Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
    normalizerHandoffTargetLabel:
      "Normalizer target: OpenClaw live response normalizer",
    normalizerHandoffModeLabel: "Normalizer mode: Preview",
    executionPayloadLabel: "OpenClaw live execution payload",
    executionPayloadSummary:
      "Represents the placeholder execution-boundary payload derived from the normalizer handoff before live transport execution runs.",
    executionPayloadStatusLabel: "Execution payload status: Preview payload",
    executionPayloadPayloadLabel:
      "Execution payload: Preview payload available from no-network live-preview execution.",
    executionPayloadSourceLabel:
      "Execution source handoff: Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
    executionPayloadTargetLabel:
      "Execution target: OpenClaw live execution bridge",
    executionPayloadModeLabel: "Execution mode: Preview",
    executionBridgeLabel: "OpenClaw live execution bridge",
    executionBridgeSummary:
      "Represents the placeholder bridge-boundary record derived from the execution payload before actual live fetch execution runs.",
    executionBridgeStatusLabel: "Execution bridge status: Preview payload",
    executionBridgePayloadLabel:
      "Bridge payload: Preview payload available from no-network live-preview execution.",
    executionBridgeSourceLabel:
      "Bridge source payload: Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
    executionBridgeTargetLabel:
      "Bridge target: OpenClaw live fetch entrypoint",
    executionBridgeModeLabel: "Bridge mode: Preview",
    fetchEntryLabel: "OpenClaw live fetch entry",
    fetchEntrySummary:
      "Represents the placeholder fetch-call-boundary record derived from the execution bridge before actual live fetch execution runs.",
    fetchEntryStatusLabel: "Fetch entry status: Preview payload",
    fetchEntryPayloadLabel:
      "Entry payload: Preview payload available from no-network live-preview execution.",
    fetchEntrySourceLabel:
      "Entry source bridge: Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
    fetchEntryTargetLabel:
      "Entry target: OpenClaw live fetch call",
    fetchEntryModeLabel: "Entry mode: Preview",
    fetchDispatchLabel: "OpenClaw live fetch dispatch",
    fetchDispatchSummary:
      "Represents the placeholder network-invocation-boundary record derived from the fetch entry before actual live network execution runs.",
    fetchDispatchStatusLabel: "Fetch dispatch status: Preview payload",
    fetchDispatchPayloadLabel:
      "Dispatch payload: Preview payload available from no-network live-preview execution.",
    fetchDispatchSourceLabel:
      "Dispatch source entry: Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
    fetchDispatchTargetLabel:
      "Dispatch target: OpenClaw live network invocation",
    fetchDispatchModeLabel: "Dispatch mode: Preview",
    transportCallLabel: "OpenClaw live transport call",
    transportCallSummary:
      "Represents the placeholder transport-invocation-boundary record derived from the fetch dispatch before actual live network calls run.",
    transportCallStatusLabel: "Transport call status: Preview payload",
    transportCallPayloadLabel:
      "Transport payload: Preview payload available from no-network live-preview execution.",
    transportCallSourceLabel:
      "Transport source dispatch: Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
    transportCallTargetLabel:
      "Transport target: OpenClaw live transport invocation",
    transportCallModeLabel: "Transport mode: Preview",
    fetchExecutionLabel: "OpenClaw live fetch execution",
    fetchExecutionSummary:
      "Represents the placeholder network-execution-boundary record derived from the transport call before actual live network execution runs.",
    fetchExecutionStatusLabel: "Fetch execution status: Preview payload",
    fetchExecutionPayloadLabel:
      "Execution payload: Preview payload available from no-network live-preview execution.",
    fetchExecutionSourceLabel:
      "Execution source transport call: Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
    fetchExecutionTargetLabel:
      "Execution target: OpenClaw live network execution",
    fetchExecutionModeLabel: "Execution mode: Preview",
    executionDelegateLabel: "OpenClaw live execution delegate",
    executionDelegateSummary:
      "Represents the placeholder transport-implementation-boundary record derived from the fetch execution before actual live network transport implementation runs.",
    executionDelegateStatusLabel: "Execution delegate status: Preview payload",
    executionDelegatePayloadLabel:
      "Delegate payload: Preview payload available from no-network live-preview execution.",
    executionDelegateSourceLabel:
      "Delegate source execution: Preview payload from GET OpenClaw live endpoint pending configuration?view=plaza&workspace=mii-plaza-client",
    executionDelegateTargetLabel:
      "Delegate target: OpenClaw live transport implementation",
    executionDelegateModeLabel: "Delegate mode: Preview",
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
