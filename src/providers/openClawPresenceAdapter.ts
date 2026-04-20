import type {
  PlazaAgentStatus,
  PlazaPresenceAdapter,
  PlazaPresenceSnapshot,
  PlazaResident,
  PlazaWorldData,
  PlazaWorldDataRequestDescriptor,
  PlazaWorldDataRequestFetchRunner,
  PlazaWorldDataRequestFetchRunnerFactory,
  PlazaWorldDataRequestFetchAttempt,
  PlazaWorldDataRequestFetchResult,
  PlazaWorldDataRequestResponseEnvelope,
  PlazaWorldDataRequestNormalizerHandoff,
  PlazaWorldDataRequestExecutionPayload,
  PlazaWorldDataRequestExecutionBridge,
  PlazaWorldDataRequestBuilder,
  PlazaWorldDataRequestRunnerEnvelope,
  PlazaWorldDataRequestTransportDelegate,
  PlazaWorldDataRequestExecutor,
  PlazaWorldDataRequest,
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

export interface OpenClawLiveResponseAgent {
  agent_id: string;
  display_name: string;
  role_name: string;
  state: OpenClawFixtureAgent["state"];
  summary: string;
  task: string;
  mood: string;
  updated_at: string;
  location: string;
  activity_score: number;
  tags: string[];
  palette: {
    primary: string;
    accent: string;
  };
  bio: string;
  prompt: string;
  highlights: string[];
  position: {
    x: number;
    z: number;
  };
}

export interface OpenClawLiveResponsePayload {
  generated_at: string;
  workspace: string;
  agents: OpenClawLiveResponseAgent[];
}

export interface OpenClawLiveProviderSkeleton {
  request: PlazaWorldDataRequest;
  normalizeResponse: (
    payload: OpenClawLiveResponsePayload
  ) => OpenClawFixturePayload;
  createWorldDataFromResponse: (
    payload: OpenClawLiveResponsePayload
  ) => PlazaWorldData;
}

export interface OpenClawNetworkReadyExecution<TPayload> {
  contract: "network-ready";
  mode: "preview" | "live";
  request: PlazaWorldDataRequest;
  payload: TPayload;
}

export interface OpenClawNetworkReadyExecutorContract<TPayload> {
  contract: "network-ready";
  request: PlazaWorldDataRequest;
  fetchRunnerFactory: OpenClawFetchRunnerFactory<TPayload>;
  transportDelegate: OpenClawTransportDelegate<TPayload>;
  execute(
    now?: Date | string | number
  ): Promise<OpenClawNetworkReadyExecution<TPayload>>;
}

export interface OpenClawTransportDelegate<TPayload> {
  metadata: PlazaWorldDataRequestTransportDelegate;
  execute(now?: Date | string | number): Promise<TPayload>;
}

export interface OpenClawFetchRunner<TPayload> {
  metadata: PlazaWorldDataRequestFetchRunner;
  envelope: PlazaWorldDataRequestRunnerEnvelope;
  requestBuilder: PlazaWorldDataRequestBuilder;
  fetchAttempt: PlazaWorldDataRequestFetchAttempt;
  fetchResult: PlazaWorldDataRequestFetchResult;
  responseEnvelope: PlazaWorldDataRequestResponseEnvelope;
  normalizerHandoff: PlazaWorldDataRequestNormalizerHandoff;
  executionPayload: PlazaWorldDataRequestExecutionPayload;
  executionBridge: PlazaWorldDataRequestExecutionBridge;
  run(now?: Date | string | number): Promise<TPayload>;
}

export interface OpenClawFetchRunnerFactory<TPayload> {
  metadata: PlazaWorldDataRequestFetchRunnerFactory;
  createRunner(): OpenClawFetchRunner<TPayload>;
}

export interface OpenClawLivePreviewExecution {
  contract: "network-ready";
  mode: "preview";
  request: PlazaWorldDataRequest;
  payload: OpenClawLiveResponsePayload;
}

export interface OpenClawFixtureOptions {
  workspace?: string;
}

function isoOffset(baseTimestamp: number, minutesAgo: number): string {
  return new Date(baseTimestamp - minutesAgo * 60_000).toISOString();
}

export function createOpenClawPresenceFixture(
  now: Date | string | number = Date.now(),
  options: OpenClawFixtureOptions = {}
): OpenClawFixturePayload {
  const baseTimestamp =
    now instanceof Date ? now.getTime() : new Date(now).getTime();

  return {
    generatedAt: new Date(baseTimestamp).toISOString(),
    workspace: options.workspace ?? "mii-plaza-client",
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

export function createOpenClawLivePreviewResponsePayload(
  now: Date | string | number = Date.now(),
  options: OpenClawFixtureOptions = {}
): OpenClawLiveResponsePayload {
  const fixture = createOpenClawPresenceFixture(now, options);
  return {
    generated_at: fixture.generatedAt,
    workspace: fixture.workspace,
    agents: fixture.agents.map((agent) => ({
      agent_id: agent.id,
      display_name: agent.name,
      role_name: agent.occupation,
      state: agent.state,
      summary: agent.summary,
      task: agent.task,
      mood: agent.vibe,
      updated_at: agent.seenAt,
      location: agent.zone,
      activity_score: agent.score,
      tags: agent.tags,
      palette: agent.palette,
      bio: agent.bio,
      prompt: agent.prompt,
      highlights: agent.highlights,
      position: agent.plazaPosition,
    })),
  };
}

export function createOpenClawPreviewExecutorContract(
  request: PlazaWorldDataRequest
): OpenClawNetworkReadyExecutorContract<OpenClawLiveResponsePayload> {
  const fetchRunnerFactory = createOpenClawPreviewFetchRunnerFactory(request);
  const transportDelegate = createOpenClawPreviewTransportDelegate(
    request,
    fetchRunnerFactory.createRunner()
  );
  return {
    contract: "network-ready",
    request,
    fetchRunnerFactory,
    transportDelegate,
    async execute(now: Date | string | number = Date.now()) {
      return {
        contract: "network-ready",
        mode: "preview",
        request,
        payload: await transportDelegate.execute(now),
      };
    },
  };
}

export function createOpenClawFetchRunnerFactory(
  request: PlazaWorldDataRequest
): OpenClawFetchRunnerFactory<OpenClawLiveResponsePayload> {
  const envelope =
    request.runnerEnvelope ?? createOpenClawRunnerRequestEnvelope(request);
  const requestBuilder =
    request.requestBuilder ?? createOpenClawLiveRequestBuilder(envelope);
  const fetchAttempt =
    request.fetchAttempt ??
    createOpenClawLiveFetchAttempt(requestBuilder, envelope.runnerMode);
  const fetchResult =
    request.fetchResult ?? createOpenClawLiveFetchResult(fetchAttempt);
  const responseEnvelope =
    request.responseEnvelope ??
    createOpenClawLiveResponseEnvelope(fetchResult);
  const normalizerHandoff =
    request.normalizerHandoff ??
    createOpenClawLiveNormalizerHandoff(responseEnvelope);
  const executionPayload =
    request.executionPayload ??
    createOpenClawLiveExecutionPayload(normalizerHandoff);
  const executionBridge =
    request.executionBridge ??
    createOpenClawLiveExecutionBridge(executionPayload);

  return {
    metadata:
      request.fetchRunnerFactory ?? {
        id: "openclaw-runner-factory",
        label: "OpenClaw fetch-runner factory",
        summary:
          "Chooses between preview and live-capable runner implementations without changing the transport delegate seam.",
      },
    createRunner() {
      return request.liveEnabled
        ? createOpenClawLiveStubFetchRunner(
            request,
            envelope,
            requestBuilder,
            fetchAttempt,
            fetchResult,
            responseEnvelope,
            normalizerHandoff,
            executionPayload,
            executionBridge
          )
        : createOpenClawPreviewFetchRunner(
            request,
            envelope,
            requestBuilder,
            fetchAttempt,
            fetchResult,
            responseEnvelope,
            normalizerHandoff,
            executionPayload,
            executionBridge
          );
    },
  };
}

export const createOpenClawPreviewFetchRunnerFactory =
  createOpenClawFetchRunnerFactory;

export function createOpenClawPreviewTransportDelegate(
  request: PlazaWorldDataRequest,
  fetchRunner: OpenClawFetchRunner<OpenClawLiveResponsePayload> =
    createOpenClawPreviewFetchRunner(request)
): OpenClawTransportDelegate<OpenClawLiveResponsePayload> {
  return {
    metadata:
      request.transportDelegate ?? {
        id: "openclaw-preview-transport",
        label: "Preview transport delegate",
        summary:
          "Consumes the request descriptor and returns a preview payload without network I/O.",
      },
    async execute(now: Date | string | number = Date.now()) {
      return fetchRunner.run(now);
    },
  };
}

export function createOpenClawPreviewFetchRunner(
  request: PlazaWorldDataRequest,
  envelope: PlazaWorldDataRequestRunnerEnvelope =
    request.runnerEnvelope ?? createOpenClawRunnerRequestEnvelope(request),
  requestBuilder: PlazaWorldDataRequestBuilder =
    request.requestBuilder ?? createOpenClawLiveRequestBuilder(envelope),
  fetchAttempt: PlazaWorldDataRequestFetchAttempt =
    request.fetchAttempt ??
    createOpenClawLiveFetchAttempt(requestBuilder, envelope.runnerMode),
  fetchResult: PlazaWorldDataRequestFetchResult =
    request.fetchResult ?? createOpenClawLiveFetchResult(fetchAttempt),
  responseEnvelope: PlazaWorldDataRequestResponseEnvelope =
    request.responseEnvelope ?? createOpenClawLiveResponseEnvelope(fetchResult),
  normalizerHandoff: PlazaWorldDataRequestNormalizerHandoff =
    request.normalizerHandoff ??
    createOpenClawLiveNormalizerHandoff(responseEnvelope),
  executionPayload: PlazaWorldDataRequestExecutionPayload =
    request.executionPayload ??
    createOpenClawLiveExecutionPayload(normalizerHandoff),
  executionBridge: PlazaWorldDataRequestExecutionBridge =
    request.executionBridge ??
    createOpenClawLiveExecutionBridge(executionPayload)
): OpenClawFetchRunner<OpenClawLiveResponsePayload> {
  return {
    metadata:
      request.fetchRunner ?? {
        id: "openclaw-preview-runner",
        label: "Preview fetch runner",
        contract: "network-capable",
        mode: "preview",
        summary:
          "Provides preview payloads for the transport delegate without invoking a real network fetch.",
      },
    envelope,
    requestBuilder,
    fetchAttempt,
    fetchResult,
    responseEnvelope,
    normalizerHandoff,
    executionPayload,
    executionBridge,
    async run(now: Date | string | number = Date.now()) {
      return createOpenClawLivePreviewResponsePayload(now, {
        workspace: envelope.workspaceHint,
      });
    },
  };
}

export function createOpenClawLiveStubFetchRunner(
  request: PlazaWorldDataRequest,
  envelope: PlazaWorldDataRequestRunnerEnvelope =
    request.runnerEnvelope ?? createOpenClawRunnerRequestEnvelope(request),
  requestBuilder: PlazaWorldDataRequestBuilder =
    request.requestBuilder ?? createOpenClawLiveRequestBuilder(envelope),
  fetchAttempt: PlazaWorldDataRequestFetchAttempt =
    request.fetchAttempt ??
    createOpenClawLiveFetchAttempt(requestBuilder, envelope.runnerMode),
  fetchResult: PlazaWorldDataRequestFetchResult =
    request.fetchResult ?? createOpenClawLiveFetchResult(fetchAttempt),
  responseEnvelope: PlazaWorldDataRequestResponseEnvelope =
    request.responseEnvelope ?? createOpenClawLiveResponseEnvelope(fetchResult),
  normalizerHandoff: PlazaWorldDataRequestNormalizerHandoff =
    request.normalizerHandoff ??
    createOpenClawLiveNormalizerHandoff(responseEnvelope),
  executionPayload: PlazaWorldDataRequestExecutionPayload =
    request.executionPayload ??
    createOpenClawLiveExecutionPayload(normalizerHandoff),
  executionBridge: PlazaWorldDataRequestExecutionBridge =
    request.executionBridge ??
    createOpenClawLiveExecutionBridge(executionPayload)
): OpenClawFetchRunner<OpenClawLiveResponsePayload> {
  return {
    metadata:
      request.fetchRunner ?? {
        id: "openclaw-live-runner-stub",
        label: "Live-capable fetch runner stub",
        contract: "network-capable",
        mode: "live",
        summary:
          "Represents the future live fetch runner while still returning preview payloads without network I/O.",
      },
    envelope,
    requestBuilder,
    fetchAttempt,
    fetchResult,
    responseEnvelope,
    normalizerHandoff,
    executionPayload,
    executionBridge,
    async run(now: Date | string | number = Date.now()) {
      return createOpenClawLivePreviewResponsePayload(now, {
        workspace: envelope.workspaceHint,
      });
    },
  };
}

export async function executeOpenClawLivePreview(
  request: PlazaWorldDataRequest,
  now: Date | string | number = Date.now()
): Promise<OpenClawLivePreviewExecution> {
  return createOpenClawPreviewExecutorContract(request).execute(now);
}

export function normalizeOpenClawLiveResponsePayload(
  payload: OpenClawLiveResponsePayload
): OpenClawFixturePayload {
  return {
    generatedAt: payload.generated_at,
    workspace: payload.workspace,
    agents: payload.agents.map((agent) => ({
      id: agent.agent_id,
      name: agent.display_name,
      occupation: agent.role_name,
      state: agent.state,
      summary: agent.summary,
      task: agent.task,
      vibe: agent.mood,
      seenAt: agent.updated_at,
      zone: agent.location,
      score: agent.activity_score,
      tags: agent.tags,
      palette: agent.palette,
      bio: agent.bio,
      prompt: agent.prompt,
      highlights: agent.highlights,
      plazaPosition: agent.position,
    })),
  };
}

export function createOpenClawLiveProviderSkeleton(
  overrides: OpenClawLiveRequestOverrides = {}
): OpenClawLiveProviderSkeleton {
  const request = resolveOpenClawLiveRequestOverrides(overrides);

  return {
    request,
    normalizeResponse(payload) {
      return normalizeOpenClawLiveResponsePayload(payload);
    },
    createWorldDataFromResponse(payload) {
      const normalizedPayload = normalizeOpenClawLiveResponsePayload(payload);
      const worldData = createOpenClawFixtureWorldData(normalizedPayload);
      return {
        ...worldData,
        source: {
          ...worldData.source,
          request,
        },
      };
    },
  };
}

export interface OpenClawLiveRequestOverrides {
  endpointUrl?: string;
  authKind?: PlazaWorldDataRequest["authKind"];
  authTokenName?: string;
  liveEnabled?: boolean;
  workspaceHint?: string;
}

export function createOpenClawLiveRequestDescriptor(
  overrides: OpenClawLiveRequestOverrides = {}
): PlazaWorldDataRequestDescriptor {
  const queryParts = ["view=plaza"];
  if (overrides.workspaceHint) {
    queryParts.push(`workspace=${overrides.workspaceHint}`);
  }

  let authHeaderLabel: string | undefined;
  if (overrides.authKind === "session") {
    authHeaderLabel = "Session cookie";
  } else if ((overrides.authKind ?? "token") === "token") {
    authHeaderLabel = overrides.authTokenName
      ? `Authorization: Bearer ${overrides.authTokenName}`
      : "Authorization: Bearer configured token";
  }

  return {
    method: "GET",
    pathLabel: "/presence",
    queryLabel: queryParts.join("&"),
    acceptLabel: "application/json",
    ...(authHeaderLabel ? { authHeaderLabel } : {}),
  };
}

export function createOpenClawRunnerRequestEnvelope(
  request: PlazaWorldDataRequest
): PlazaWorldDataRequestRunnerEnvelope {
  return {
    id: "openclaw-runner-envelope",
    label: "OpenClaw runner request envelope",
    summary:
      "Normalizes endpoint, auth, and descriptor inputs into one runner-consumable shape before live fetches exist.",
    transport: request.transport,
    endpointLabel: request.endpointLabel,
    authKind: request.authKind,
    runnerMode: request.liveEnabled ? "live" : "preview",
    ...(request.workspaceHint ? { workspaceHint: request.workspaceHint } : {}),
    descriptor:
      request.descriptor ?? createOpenClawLiveRequestDescriptor({
        authKind: request.authKind,
        workspaceHint: request.workspaceHint,
      }),
  };
}

export function createOpenClawLiveRequestBuilder(
  envelope: PlazaWorldDataRequestRunnerEnvelope
): PlazaWorldDataRequestBuilder {
  const urlLabel = envelope.descriptor.queryLabel
    ? `${envelope.endpointLabel}?${envelope.descriptor.queryLabel}`
    : envelope.endpointLabel;
  const headerLabels = [
    `Accept: ${envelope.descriptor.acceptLabel}`,
    ...(envelope.descriptor.authHeaderLabel
      ? [envelope.descriptor.authHeaderLabel]
      : []),
  ];

  return {
    id: "openclaw-live-request-builder",
    label: "OpenClaw live request builder",
    summary:
      "Resolves the runner envelope into a concrete fetch-ready request shape without executing network calls.",
    method: envelope.descriptor.method,
    urlLabel,
    headerLabels,
  };
}

export function createOpenClawLiveFetchAttempt(
  requestBuilder: PlazaWorldDataRequestBuilder,
  runnerMode: PlazaWorldDataRequestRunnerEnvelope["runnerMode"]
): PlazaWorldDataRequestFetchAttempt {
  return {
    id: "openclaw-live-fetch-attempt",
    label: "OpenClaw live fetch attempt",
    summary:
      "Represents the next transport-ready fetch input derived from the request builder without executing it.",
    method: requestBuilder.method,
    urlLabel: requestBuilder.urlLabel,
    headerLabels: requestBuilder.headerLabels,
    runnerMode,
  };
}

export function createOpenClawLiveFetchResult(
  fetchAttempt: PlazaWorldDataRequestFetchAttempt
): PlazaWorldDataRequestFetchResult {
  const isLive = fetchAttempt.runnerMode === "live";
  return {
    id: "openclaw-live-fetch-result",
    label: "OpenClaw live fetch result",
    summary:
      "Represents the placeholder transport response shape that future live fetches will hydrate after a fetch attempt.",
    status: isLive ? "live-ready" : "preview-payload",
    payloadLabel: isLive
      ? "Awaiting a real transport response once live network execution is enabled."
      : "Preview payload available from no-network live-preview execution.",
    sourceAttemptLabel: `${fetchAttempt.method} ${fetchAttempt.urlLabel}`,
    runnerMode: fetchAttempt.runnerMode,
  };
}

export function createOpenClawLiveResponseEnvelope(
  fetchResult: PlazaWorldDataRequestFetchResult
): PlazaWorldDataRequestResponseEnvelope {
  return {
    id: "openclaw-live-response-envelope",
    label: "OpenClaw live response envelope",
    summary:
      "Represents the normalization-ready handoff state derived from the fetch result before real transport responses are processed.",
    status: fetchResult.status,
    payloadLabel: fetchResult.payloadLabel,
    sourceResultLabel:
      fetchResult.status === "live-ready"
        ? `Live-ready placeholder from ${fetchResult.sourceAttemptLabel}`
        : `Preview payload from ${fetchResult.sourceAttemptLabel}`,
    normalizationTargetLabel: "OpenClaw live response normalizer",
    runnerMode: fetchResult.runnerMode,
  };
}

export function createOpenClawLiveNormalizerHandoff(
  responseEnvelope: PlazaWorldDataRequestResponseEnvelope
): PlazaWorldDataRequestNormalizerHandoff {
  return {
    id: "openclaw-live-normalizer-handoff",
    label: "OpenClaw live normalizer handoff",
    summary:
      "Represents the placeholder normalization-boundary state derived from the response envelope before payload normalization runs.",
    status: responseEnvelope.status,
    payloadLabel: responseEnvelope.payloadLabel,
    sourceEnvelopeLabel: responseEnvelope.sourceResultLabel,
    normalizationTargetLabel: responseEnvelope.normalizationTargetLabel,
    runnerMode: responseEnvelope.runnerMode,
  };
}

export function createOpenClawLiveExecutionPayload(
  normalizerHandoff: PlazaWorldDataRequestNormalizerHandoff
): PlazaWorldDataRequestExecutionPayload {
  return {
    id: "openclaw-live-execution-payload",
    label: "OpenClaw live execution payload",
    summary:
      "Represents the placeholder execution-boundary payload derived from the normalizer handoff before live transport execution runs.",
    status: normalizerHandoff.status,
    payloadLabel: normalizerHandoff.payloadLabel,
    sourceHandoffLabel: normalizerHandoff.sourceEnvelopeLabel,
    executionTargetLabel: "OpenClaw live execution bridge",
    runnerMode: normalizerHandoff.runnerMode,
  };
}

export function createOpenClawLiveExecutionBridge(
  executionPayload: PlazaWorldDataRequestExecutionPayload
): PlazaWorldDataRequestExecutionBridge {
  return {
    id: "openclaw-live-execution-bridge",
    label: "OpenClaw live execution bridge",
    summary:
      "Represents the placeholder bridge-boundary record derived from the execution payload before actual live fetch execution runs.",
    status: executionPayload.status,
    payloadLabel: executionPayload.payloadLabel,
    sourceExecutionPayloadLabel: executionPayload.sourceHandoffLabel,
    bridgeTargetLabel: "OpenClaw live fetch entrypoint",
    runnerMode: executionPayload.runnerMode,
  };
}

export function resolveOpenClawLiveRequestOverrides(
  overrides: OpenClawLiveRequestOverrides = {}
): PlazaWorldDataRequest {
  const authKind =
    overrides.authKind ?? (overrides.authTokenName ? "token" : "token");
  const endpointLabel =
    overrides.endpointUrl ?? "OpenClaw live endpoint pending configuration";
  const descriptor = createOpenClawLiveRequestDescriptor({
    authKind,
    authTokenName: overrides.authTokenName,
    workspaceHint: overrides.workspaceHint,
  });
  const transportDelegate: PlazaWorldDataRequestTransportDelegate = {
    id: "openclaw-preview-transport",
    label: "Preview transport delegate",
    summary:
      "Consumes the request descriptor and returns a preview payload without network I/O.",
  };
  const fetchRunner: PlazaWorldDataRequestFetchRunner = {
    id: overrides.liveEnabled ? "openclaw-live-runner-stub" : "openclaw-preview-runner",
    label: overrides.liveEnabled
      ? "Live-capable fetch runner stub"
      : "Preview fetch runner",
    contract: "network-capable",
    mode: overrides.liveEnabled ? "live" : "preview",
    summary:
      overrides.liveEnabled
        ? "Represents the future live fetch runner while still returning preview payloads without network I/O."
        : "Provides preview payloads for the transport delegate without invoking a real network fetch.",
  };
  const fetchRunnerFactory: PlazaWorldDataRequestFetchRunnerFactory = {
    id: "openclaw-runner-factory",
    label: "OpenClaw fetch-runner factory",
    summary:
      "Chooses between preview and live-capable runner implementations without changing the transport delegate seam.",
  };
  const runnerEnvelope = createOpenClawRunnerRequestEnvelope({
    transport: "http",
    endpointLabel,
    authKind,
    liveEnabled: overrides.liveEnabled ?? false,
    descriptor,
    transportDelegate,
    fetchRunner,
    fetchRunnerFactory,
    ...(overrides.workspaceHint
      ? { workspaceHint: overrides.workspaceHint }
      : {}),
  });
  const requestBuilder = createOpenClawLiveRequestBuilder(runnerEnvelope);
  const fetchAttempt = createOpenClawLiveFetchAttempt(
    requestBuilder,
    runnerEnvelope.runnerMode
  );
  const fetchResult = createOpenClawLiveFetchResult(fetchAttempt);
  const responseEnvelope = createOpenClawLiveResponseEnvelope(fetchResult);
  const normalizerHandoff =
    createOpenClawLiveNormalizerHandoff(responseEnvelope);
  const executionPayload =
    createOpenClawLiveExecutionPayload(normalizerHandoff);
  const executionBridge =
    createOpenClawLiveExecutionBridge(executionPayload);
  const executor = planOpenClawLiveFetchExecutor({
    transport: "http",
    endpointLabel,
    authKind,
    liveEnabled: overrides.liveEnabled ?? false,
    descriptor,
    transportDelegate,
    fetchRunner,
    fetchRunnerFactory,
    runnerEnvelope,
    requestBuilder,
    fetchAttempt,
    fetchResult,
    responseEnvelope,
    normalizerHandoff,
    executionPayload,
    executionBridge,
    ...(overrides.workspaceHint
      ? { workspaceHint: overrides.workspaceHint }
      : {}),
  });

  return {
    transport: "http",
    endpointLabel,
    authKind,
    liveEnabled: overrides.liveEnabled ?? false,
    descriptor,
    transportDelegate,
    fetchRunner,
    fetchRunnerFactory,
    runnerEnvelope,
    requestBuilder,
    fetchAttempt,
    fetchResult,
    responseEnvelope,
    normalizerHandoff,
    executionPayload,
    executionBridge,
    ...(overrides.workspaceHint
      ? { workspaceHint: overrides.workspaceHint }
      : {}),
    executor,
  };
}

export function createOpenClawLiveRequestConfig(
  overrides: Partial<PlazaWorldDataRequest> = {}
): PlazaWorldDataRequest {
  return resolveOpenClawLiveRequestOverrides(overrides);
}

export function planOpenClawLiveFetchExecutor(
  request: PlazaWorldDataRequest
): PlazaWorldDataRequestExecutor {
  const endpointConfigured = !request.endpointLabel.includes("pending configuration");
  if (!endpointConfigured) {
    return {
      status: "needs-config",
      mode: "dry-run",
      summary: "Configure a live OpenClaw endpoint before enabling fetch execution.",
    };
  }

  if (request.liveEnabled) {
    return {
      status: "ready",
      mode: "live",
      summary:
        "Executor seam is configured for live OpenClaw fetches once network calls are allowed.",
    };
  }

  return {
    status: "ready",
    mode: "dry-run",
    summary:
      "Executor seam is ready; enable live requests when network fetches are introduced.",
  };
}

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
      request: createOpenClawLiveRequestConfig({
        workspaceHint: payload.workspace,
      }),
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

export const openClawLivePreviewWorldDataProvider: PlazaWorldDataProvider = {
  id: "openclaw-live-preview",
  provider: "OpenClaw",
  mode: "live",
  async load() {
    const skeleton = createOpenClawLiveProviderSkeleton({
      endpointUrl: "https://openclaw.example.com/presence",
      authTokenName: "OPENCLAW_TOKEN",
      workspaceHint: "mii-plaza-client",
    });
    const execution = await executeOpenClawLivePreview(skeleton.request);
    const worldData = skeleton.createWorldDataFromResponse(execution.payload);

    return {
      ...worldData,
      source: {
        ...worldData.source,
        id: "openclaw-live-preview",
        mode: "live",
        provider: "OpenClaw",
      },
    };
  },
};
