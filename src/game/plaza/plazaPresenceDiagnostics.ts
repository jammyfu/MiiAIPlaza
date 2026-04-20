import type {
  PlazaWorldDataHealth,
  PlazaWorldDataRequestExecutor,
  PlazaWorldDataRequest,
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

export interface PlazaWorldDataRequestCopy {
  transportLabel: string;
  endpointLabel: string;
  authLabel: string;
  liveLabel: string;
  workspaceLabel: string | null;
  descriptorLabel: string | null;
  descriptorQueryLabel: string | null;
  descriptorAcceptLabel: string | null;
  descriptorAuthLabel: string | null;
  transportDelegateLabel: string | null;
  transportDelegateSummary: string | null;
  fetchRunnerLabel: string | null;
  fetchRunnerContractLabel: string | null;
  fetchRunnerSummary: string | null;
  fetchRunnerFactoryLabel: string | null;
  fetchRunnerFactorySummary: string | null;
  runnerEnvelopeLabel: string | null;
  runnerEnvelopeSummary: string | null;
  runnerEnvelopeTargetLabel: string | null;
  requestBuilderLabel: string | null;
  requestBuilderSummary: string | null;
  requestBuilderTargetLabel: string | null;
  requestBuilderHeadersLabel: string | null;
  fetchAttemptLabel: string | null;
  fetchAttemptSummary: string | null;
  fetchAttemptTargetLabel: string | null;
  fetchAttemptHeadersLabel: string | null;
  fetchAttemptModeLabel: string | null;
  fetchResultLabel: string | null;
  fetchResultSummary: string | null;
  fetchResultStatusLabel: string | null;
  fetchResultPayloadLabel: string | null;
  fetchResultSourceLabel: string | null;
  fetchResultModeLabel: string | null;
  responseEnvelopeLabel: string | null;
  responseEnvelopeSummary: string | null;
  responseEnvelopeStatusLabel: string | null;
  responseEnvelopePayloadLabel: string | null;
  responseEnvelopeSourceLabel: string | null;
  responseEnvelopeTargetLabel: string | null;
  responseEnvelopeModeLabel: string | null;
  normalizerHandoffLabel: string | null;
  normalizerHandoffSummary: string | null;
  normalizerHandoffStatusLabel: string | null;
  normalizerHandoffPayloadLabel: string | null;
  normalizerHandoffSourceLabel: string | null;
  normalizerHandoffTargetLabel: string | null;
  normalizerHandoffModeLabel: string | null;
  executionPayloadLabel: string | null;
  executionPayloadSummary: string | null;
  executionPayloadStatusLabel: string | null;
  executionPayloadPayloadLabel: string | null;
  executionPayloadSourceLabel: string | null;
  executionPayloadTargetLabel: string | null;
  executionPayloadModeLabel: string | null;
  executionBridgeLabel: string | null;
  executionBridgeSummary: string | null;
  executionBridgeStatusLabel: string | null;
  executionBridgePayloadLabel: string | null;
  executionBridgeSourceLabel: string | null;
  executionBridgeTargetLabel: string | null;
  executionBridgeModeLabel: string | null;
  fetchEntryLabel: string | null;
  fetchEntrySummary: string | null;
  fetchEntryStatusLabel: string | null;
  fetchEntryPayloadLabel: string | null;
  fetchEntrySourceLabel: string | null;
  fetchEntryTargetLabel: string | null;
  fetchEntryModeLabel: string | null;
  fetchDispatchLabel: string | null;
  fetchDispatchSummary: string | null;
  fetchDispatchStatusLabel: string | null;
  fetchDispatchPayloadLabel: string | null;
  fetchDispatchSourceLabel: string | null;
  fetchDispatchTargetLabel: string | null;
  fetchDispatchModeLabel: string | null;
  transportCallLabel: string | null;
  transportCallSummary: string | null;
  transportCallStatusLabel: string | null;
  transportCallPayloadLabel: string | null;
  transportCallSourceLabel: string | null;
  transportCallTargetLabel: string | null;
  transportCallModeLabel: string | null;
  fetchExecutionLabel: string | null;
  fetchExecutionSummary: string | null;
  fetchExecutionStatusLabel: string | null;
  fetchExecutionPayloadLabel: string | null;
  fetchExecutionSourceLabel: string | null;
  fetchExecutionTargetLabel: string | null;
  fetchExecutionModeLabel: string | null;
  executorLabel: string | null;
  executorSummary: string | null;
}

export interface PlazaWorldDataRequestExecutorCopy {
  label: string;
  summary: string;
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

export function describeWorldDataRequest(
  request: PlazaWorldDataRequest
): PlazaWorldDataRequestCopy {
  const executorCopy = request.executor
    ? describeWorldDataRequestExecutor(request.executor)
    : null;
  const descriptor = request.descriptor;

  return {
    transportLabel: request.transport.toUpperCase(),
    endpointLabel: request.endpointLabel,
    authLabel:
      request.authKind === "token"
        ? "Token"
        : request.authKind === "session"
          ? "Session"
          : "None",
    liveLabel: request.liveEnabled ? "Enabled" : "Config only",
    workspaceLabel: request.workspaceHint
      ? `Workspace: ${request.workspaceHint}`
      : null,
    descriptorLabel: descriptor
      ? `${descriptor.method} ${descriptor.pathLabel}`
      : null,
    descriptorQueryLabel: descriptor?.queryLabel
      ? `Query: ${descriptor.queryLabel}`
      : null,
    descriptorAcceptLabel: descriptor
      ? `Accepts: ${descriptor.acceptLabel}`
      : null,
    descriptorAuthLabel: descriptor?.authHeaderLabel
      ? `Auth header: ${descriptor.authHeaderLabel}`
      : null,
    transportDelegateLabel: request.transportDelegate?.label ?? null,
    transportDelegateSummary: request.transportDelegate?.summary ?? null,
    fetchRunnerLabel: request.fetchRunner?.label ?? null,
    fetchRunnerContractLabel: request.fetchRunner
      ? `${
          request.fetchRunner.contract.charAt(0).toUpperCase() +
          request.fetchRunner.contract.slice(1)
        } ${request.fetchRunner.mode} runner`
      : null,
    fetchRunnerSummary: request.fetchRunner?.summary ?? null,
    fetchRunnerFactoryLabel: request.fetchRunnerFactory?.label ?? null,
    fetchRunnerFactorySummary: request.fetchRunnerFactory?.summary ?? null,
    runnerEnvelopeLabel: request.runnerEnvelope?.label ?? null,
    runnerEnvelopeSummary: request.runnerEnvelope?.summary ?? null,
    runnerEnvelopeTargetLabel: request.runnerEnvelope
      ? `Envelope target: ${request.runnerEnvelope.descriptor.method} ${request.runnerEnvelope.descriptor.pathLabel} via ${request.runnerEnvelope.endpointLabel}`
      : null,
    requestBuilderLabel: request.requestBuilder?.label ?? null,
    requestBuilderSummary: request.requestBuilder?.summary ?? null,
    requestBuilderTargetLabel: request.requestBuilder
      ? `Request build: ${request.requestBuilder.method} ${request.requestBuilder.urlLabel}`
      : null,
    requestBuilderHeadersLabel:
      request.requestBuilder && request.requestBuilder.headerLabels.length > 0
        ? `Headers: ${request.requestBuilder.headerLabels.join("; ")}`
        : null,
    fetchAttemptLabel: request.fetchAttempt?.label ?? null,
    fetchAttemptSummary: request.fetchAttempt?.summary ?? null,
    fetchAttemptTargetLabel: request.fetchAttempt
      ? `Fetch attempt: ${request.fetchAttempt.method} ${request.fetchAttempt.urlLabel}`
      : null,
    fetchAttemptHeadersLabel:
      request.fetchAttempt && request.fetchAttempt.headerLabels.length > 0
        ? `Attempt headers: ${request.fetchAttempt.headerLabels.join("; ")}`
        : null,
    fetchAttemptModeLabel: request.fetchAttempt
      ? `Attempt mode: ${
          request.fetchAttempt.runnerMode === "live" ? "Live" : "Preview"
        }`
      : null,
    fetchResultLabel: request.fetchResult?.label ?? null,
    fetchResultSummary: request.fetchResult?.summary ?? null,
    fetchResultStatusLabel: request.fetchResult
      ? `Fetch result status: ${
          request.fetchResult.status === "live-ready"
            ? "Live ready"
            : "Preview payload"
        }`
      : null,
    fetchResultPayloadLabel: request.fetchResult
      ? `Result payload: ${request.fetchResult.payloadLabel}`
      : null,
    fetchResultSourceLabel: request.fetchResult
      ? `Result source attempt: ${request.fetchResult.sourceAttemptLabel}`
      : null,
    fetchResultModeLabel: request.fetchResult
      ? `Result mode: ${
          request.fetchResult.runnerMode === "live" ? "Live" : "Preview"
        }`
      : null,
    responseEnvelopeLabel: request.responseEnvelope?.label ?? null,
    responseEnvelopeSummary: request.responseEnvelope?.summary ?? null,
    responseEnvelopeStatusLabel: request.responseEnvelope
      ? `Response envelope status: ${
          request.responseEnvelope.status === "live-ready"
            ? "Live ready"
            : "Preview payload"
        }`
      : null,
    responseEnvelopePayloadLabel: request.responseEnvelope
      ? `Envelope payload: ${request.responseEnvelope.payloadLabel}`
      : null,
    responseEnvelopeSourceLabel: request.responseEnvelope
      ? `Envelope source result: ${request.responseEnvelope.sourceResultLabel}`
      : null,
    responseEnvelopeTargetLabel: request.responseEnvelope
      ? `Normalization handoff: ${request.responseEnvelope.normalizationTargetLabel}`
      : null,
    responseEnvelopeModeLabel: request.responseEnvelope
      ? `Envelope mode: ${
          request.responseEnvelope.runnerMode === "live" ? "Live" : "Preview"
        }`
      : null,
    normalizerHandoffLabel: request.normalizerHandoff?.label ?? null,
    normalizerHandoffSummary: request.normalizerHandoff?.summary ?? null,
    normalizerHandoffStatusLabel: request.normalizerHandoff
      ? `Normalizer handoff status: ${
          request.normalizerHandoff.status === "live-ready"
            ? "Live ready"
            : "Preview payload"
        }`
      : null,
    normalizerHandoffPayloadLabel: request.normalizerHandoff
      ? `Normalizer payload: ${request.normalizerHandoff.payloadLabel}`
      : null,
    normalizerHandoffSourceLabel: request.normalizerHandoff
      ? `Normalizer source envelope: ${request.normalizerHandoff.sourceEnvelopeLabel}`
      : null,
    normalizerHandoffTargetLabel: request.normalizerHandoff
      ? `Normalizer target: ${request.normalizerHandoff.normalizationTargetLabel}`
      : null,
    normalizerHandoffModeLabel: request.normalizerHandoff
      ? `Normalizer mode: ${
          request.normalizerHandoff.runnerMode === "live" ? "Live" : "Preview"
        }`
      : null,
    executionPayloadLabel: request.executionPayload?.label ?? null,
    executionPayloadSummary: request.executionPayload?.summary ?? null,
    executionPayloadStatusLabel: request.executionPayload
      ? `Execution payload status: ${
          request.executionPayload.status === "live-ready"
            ? "Live ready"
            : "Preview payload"
        }`
      : null,
    executionPayloadPayloadLabel: request.executionPayload
      ? `Execution payload: ${request.executionPayload.payloadLabel}`
      : null,
    executionPayloadSourceLabel: request.executionPayload
      ? `Execution source handoff: ${request.executionPayload.sourceHandoffLabel}`
      : null,
    executionPayloadTargetLabel: request.executionPayload
      ? `Execution target: ${request.executionPayload.executionTargetLabel}`
      : null,
    executionPayloadModeLabel: request.executionPayload
      ? `Execution mode: ${
          request.executionPayload.runnerMode === "live" ? "Live" : "Preview"
        }`
      : null,
    executionBridgeLabel: request.executionBridge?.label ?? null,
    executionBridgeSummary: request.executionBridge?.summary ?? null,
    executionBridgeStatusLabel: request.executionBridge
      ? `Execution bridge status: ${
          request.executionBridge.status === "live-ready"
            ? "Live ready"
            : "Preview payload"
        }`
      : null,
    executionBridgePayloadLabel: request.executionBridge
      ? `Bridge payload: ${request.executionBridge.payloadLabel}`
      : null,
    executionBridgeSourceLabel: request.executionBridge
      ? `Bridge source payload: ${request.executionBridge.sourceExecutionPayloadLabel}`
      : null,
    executionBridgeTargetLabel: request.executionBridge
      ? `Bridge target: ${request.executionBridge.bridgeTargetLabel}`
      : null,
    executionBridgeModeLabel: request.executionBridge
      ? `Bridge mode: ${
          request.executionBridge.runnerMode === "live" ? "Live" : "Preview"
        }`
      : null,
    fetchEntryLabel: request.fetchEntry?.label ?? null,
    fetchEntrySummary: request.fetchEntry?.summary ?? null,
    fetchEntryStatusLabel: request.fetchEntry
      ? `Fetch entry status: ${
          request.fetchEntry.status === "live-ready"
            ? "Live ready"
            : "Preview payload"
        }`
      : null,
    fetchEntryPayloadLabel: request.fetchEntry
      ? `Entry payload: ${request.fetchEntry.payloadLabel}`
      : null,
    fetchEntrySourceLabel: request.fetchEntry
      ? `Entry source bridge: ${request.fetchEntry.sourceExecutionBridgeLabel}`
      : null,
    fetchEntryTargetLabel: request.fetchEntry
      ? `Entry target: ${request.fetchEntry.fetchTargetLabel}`
      : null,
    fetchEntryModeLabel: request.fetchEntry
      ? `Entry mode: ${
          request.fetchEntry.runnerMode === "live" ? "Live" : "Preview"
        }`
      : null,
    fetchDispatchLabel: request.fetchDispatch?.label ?? null,
    fetchDispatchSummary: request.fetchDispatch?.summary ?? null,
    fetchDispatchStatusLabel: request.fetchDispatch
      ? `Fetch dispatch status: ${
          request.fetchDispatch.status === "live-ready"
            ? "Live ready"
            : "Preview payload"
        }`
      : null,
    fetchDispatchPayloadLabel: request.fetchDispatch
      ? `Dispatch payload: ${request.fetchDispatch.payloadLabel}`
      : null,
    fetchDispatchSourceLabel: request.fetchDispatch
      ? `Dispatch source entry: ${request.fetchDispatch.sourceFetchEntryLabel}`
      : null,
    fetchDispatchTargetLabel: request.fetchDispatch
      ? `Dispatch target: ${request.fetchDispatch.dispatchTargetLabel}`
      : null,
    fetchDispatchModeLabel: request.fetchDispatch
      ? `Dispatch mode: ${
          request.fetchDispatch.runnerMode === "live" ? "Live" : "Preview"
        }`
      : null,
    transportCallLabel: request.transportCall?.label ?? null,
    transportCallSummary: request.transportCall?.summary ?? null,
    transportCallStatusLabel: request.transportCall
      ? `Transport call status: ${
          request.transportCall.status === "live-ready"
            ? "Live ready"
            : "Preview payload"
        }`
      : null,
    transportCallPayloadLabel: request.transportCall
      ? `Transport payload: ${request.transportCall.payloadLabel}`
      : null,
    transportCallSourceLabel: request.transportCall
      ? `Transport source dispatch: ${request.transportCall.sourceFetchDispatchLabel}`
      : null,
    transportCallTargetLabel: request.transportCall
      ? `Transport target: ${request.transportCall.transportTargetLabel}`
      : null,
    transportCallModeLabel: request.transportCall
      ? `Transport mode: ${
          request.transportCall.runnerMode === "live" ? "Live" : "Preview"
        }`
      : null,
    fetchExecutionLabel: request.fetchExecution?.label ?? null,
    fetchExecutionSummary: request.fetchExecution?.summary ?? null,
    fetchExecutionStatusLabel: request.fetchExecution
      ? `Fetch execution status: ${
          request.fetchExecution.status === "live-ready"
            ? "Live ready"
            : "Preview payload"
        }`
      : null,
    fetchExecutionPayloadLabel: request.fetchExecution
      ? `Execution payload: ${request.fetchExecution.payloadLabel}`
      : null,
    fetchExecutionSourceLabel: request.fetchExecution
      ? `Execution source transport call: ${request.fetchExecution.sourceTransportCallLabel}`
      : null,
    fetchExecutionTargetLabel: request.fetchExecution
      ? `Execution target: ${request.fetchExecution.executionTargetLabel}`
      : null,
    fetchExecutionModeLabel: request.fetchExecution
      ? `Execution mode: ${
          request.fetchExecution.runnerMode === "live" ? "Live" : "Preview"
        }`
      : null,
    executorLabel: executorCopy?.label ?? null,
    executorSummary: executorCopy?.summary ?? null,
  };
}

export function describeWorldDataRequestExecutor(
  executor: PlazaWorldDataRequestExecutor
): PlazaWorldDataRequestExecutorCopy {
  const modeLabel = executor.mode === "live" ? "Live" : "Dry run";
  const statusLabel = executor.status === "ready" ? "ready" : "needs config";
  return {
    label: `${modeLabel} ${statusLabel}`,
    summary: executor.summary,
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
