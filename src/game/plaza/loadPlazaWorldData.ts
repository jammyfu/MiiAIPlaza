import type {
  PlazaHotspot,
  PlazaWorldData,
  PlazaWorldDataProvider,
} from "../../contracts/plaza";
import {
  describeWorldDataHealth,
  describeWorldDataRequest,
} from "./plazaPresenceDiagnostics";

function createProviderFailureWorldData(
  provider: Pick<PlazaWorldDataProvider, "id" | "provider" | "mode">,
  error: unknown
): PlazaWorldData {
  const reason =
    error instanceof Error && error.message.trim().length > 0
      ? error.message.trim()
      : "Unknown provider failure";

  return {
    source: {
      id: provider.id,
      provider: provider.provider,
      mode: provider.mode,
      health: {
        state: "failing",
        headline: `${provider.provider} is currently unavailable.`,
        fallbackHint:
          "Walk to the status terminal while the plaza keeps the last safe shell online.",
        retryAfterMs: 2 * 60 * 1000,
        nextRetryAt: new Date(Date.now() + 2 * 60 * 1000).toISOString(),
      },
    },
    residents: [],
    hotspots: [
      {
        id: "provider-status",
        name: "Provider Status",
        prompt: "Inspect the provider outage details and fallback guidance.",
        description:
          "The plaza kept its shell online even though the selected provider failed to load.",
        details: [`Failure: ${reason}`],
        color: "#e76f51",
        position: { x: 0, z: 7.2 },
      },
    ],
  };
}

function providerStatusColor(state: PlazaWorldData["source"]["health"]["state"]): string {
  switch (state) {
    case "healthy":
      return "#57cc99";
    case "degraded":
      return "#f4a261";
    case "failing":
    default:
      return "#e76f51";
  }
}

function createProviderStatusHotspot(world: PlazaWorldData): PlazaHotspot {
  const healthCopy = describeWorldDataHealth(world.source.health);
  const requestCopy = world.source.request
    ? describeWorldDataRequest(world.source.request)
    : null;
  const existingStatusHotspot = world.hotspots.find(
    (hotspot) => hotspot.id === "provider-status"
  );

  return {
    id: "provider-status",
    name: "Provider Status",
    prompt: "Inspect provider health, retry timing, and fallback guidance.",
    description:
      existingStatusHotspot?.description ??
      "A shared status terminal for provider health, retry timing, and fallback behavior.",
    details: [
      `Provider: ${world.source.provider}`,
      `Mode: ${world.source.mode}`,
      `Health: ${healthCopy.label}`,
      `Retry: ${healthCopy.retryLabel}`,
      ...(requestCopy ? [`Request transport: ${requestCopy.transportLabel}`] : []),
      ...(requestCopy ? [`Request endpoint: ${requestCopy.endpointLabel}`] : []),
      ...(requestCopy ? [`Request auth: ${requestCopy.authLabel}`] : []),
      ...(requestCopy ? [`Live request: ${requestCopy.liveLabel}`] : []),
      ...(requestCopy?.workspaceLabel ? [requestCopy.workspaceLabel] : []),
      ...(requestCopy?.descriptorLabel
        ? [`Request descriptor: ${requestCopy.descriptorLabel}`]
        : []),
      ...(requestCopy?.descriptorQueryLabel ? [requestCopy.descriptorQueryLabel] : []),
      ...(requestCopy?.descriptorAcceptLabel
        ? [requestCopy.descriptorAcceptLabel]
        : []),
      ...(requestCopy?.descriptorAuthLabel ? [requestCopy.descriptorAuthLabel] : []),
      ...(requestCopy?.transportDelegateLabel
        ? [`Transport delegate: ${requestCopy.transportDelegateLabel}`]
        : []),
      ...(requestCopy?.transportDelegateSummary
        ? [requestCopy.transportDelegateSummary]
        : []),
      ...(requestCopy?.fetchRunnerLabel
        ? [`Fetch runner: ${requestCopy.fetchRunnerLabel}`]
        : []),
      ...(requestCopy?.fetchRunnerContractLabel
        ? [`Fetch runner contract: ${requestCopy.fetchRunnerContractLabel}`]
        : []),
      ...(requestCopy?.fetchRunnerSummary ? [requestCopy.fetchRunnerSummary] : []),
      ...(requestCopy?.fetchRunnerFactoryLabel
        ? [`Fetch runner factory: ${requestCopy.fetchRunnerFactoryLabel}`]
        : []),
      ...(requestCopy?.fetchRunnerFactorySummary
        ? [requestCopy.fetchRunnerFactorySummary]
        : []),
      ...(requestCopy?.runnerEnvelopeLabel
        ? [`Runner envelope: ${requestCopy.runnerEnvelopeLabel}`]
        : []),
      ...(requestCopy?.runnerEnvelopeSummary
        ? [requestCopy.runnerEnvelopeSummary]
        : []),
      ...(requestCopy?.runnerEnvelopeTargetLabel
        ? [requestCopy.runnerEnvelopeTargetLabel]
        : []),
      ...(requestCopy?.requestBuilderLabel
        ? [`Request builder: ${requestCopy.requestBuilderLabel}`]
        : []),
      ...(requestCopy?.requestBuilderSummary
        ? [requestCopy.requestBuilderSummary]
        : []),
      ...(requestCopy?.requestBuilderTargetLabel
        ? [requestCopy.requestBuilderTargetLabel]
        : []),
      ...(requestCopy?.requestBuilderHeadersLabel
        ? [requestCopy.requestBuilderHeadersLabel]
        : []),
      ...(requestCopy?.fetchAttemptLabel
        ? [`Fetch attempt: ${requestCopy.fetchAttemptLabel}`]
        : []),
      ...(requestCopy?.fetchAttemptSummary
        ? [requestCopy.fetchAttemptSummary]
        : []),
      ...(requestCopy?.fetchAttemptTargetLabel
        ? [`Fetch attempt target: ${requestCopy.fetchAttemptTargetLabel.replace("Fetch attempt: ", "")}`]
        : []),
      ...(requestCopy?.fetchAttemptHeadersLabel
        ? [requestCopy.fetchAttemptHeadersLabel]
        : []),
      ...(requestCopy?.fetchAttemptModeLabel
        ? [requestCopy.fetchAttemptModeLabel]
        : []),
      ...(requestCopy?.fetchResultLabel
        ? [`Fetch result: ${requestCopy.fetchResultLabel}`]
        : []),
      ...(requestCopy?.fetchResultSummary
        ? [requestCopy.fetchResultSummary]
        : []),
      ...(requestCopy?.fetchResultStatusLabel
        ? [requestCopy.fetchResultStatusLabel]
        : []),
      ...(requestCopy?.fetchResultPayloadLabel
        ? [requestCopy.fetchResultPayloadLabel]
        : []),
      ...(requestCopy?.fetchResultSourceLabel
        ? [requestCopy.fetchResultSourceLabel]
        : []),
      ...(requestCopy?.fetchResultModeLabel
        ? [requestCopy.fetchResultModeLabel]
        : []),
      ...(requestCopy?.responseEnvelopeLabel
        ? [`Response envelope: ${requestCopy.responseEnvelopeLabel}`]
        : []),
      ...(requestCopy?.responseEnvelopeSummary
        ? [requestCopy.responseEnvelopeSummary]
        : []),
      ...(requestCopy?.responseEnvelopeStatusLabel
        ? [requestCopy.responseEnvelopeStatusLabel]
        : []),
      ...(requestCopy?.responseEnvelopePayloadLabel
        ? [requestCopy.responseEnvelopePayloadLabel]
        : []),
      ...(requestCopy?.responseEnvelopeSourceLabel
        ? [requestCopy.responseEnvelopeSourceLabel]
        : []),
      ...(requestCopy?.responseEnvelopeTargetLabel
        ? [requestCopy.responseEnvelopeTargetLabel]
        : []),
      ...(requestCopy?.responseEnvelopeModeLabel
        ? [requestCopy.responseEnvelopeModeLabel]
        : []),
      ...(requestCopy?.normalizerHandoffLabel
        ? [`Normalizer handoff: ${requestCopy.normalizerHandoffLabel}`]
        : []),
      ...(requestCopy?.normalizerHandoffSummary
        ? [requestCopy.normalizerHandoffSummary]
        : []),
      ...(requestCopy?.normalizerHandoffStatusLabel
        ? [requestCopy.normalizerHandoffStatusLabel]
        : []),
      ...(requestCopy?.normalizerHandoffPayloadLabel
        ? [requestCopy.normalizerHandoffPayloadLabel]
        : []),
      ...(requestCopy?.normalizerHandoffSourceLabel
        ? [requestCopy.normalizerHandoffSourceLabel]
        : []),
      ...(requestCopy?.normalizerHandoffTargetLabel
        ? [requestCopy.normalizerHandoffTargetLabel]
        : []),
      ...(requestCopy?.normalizerHandoffModeLabel
        ? [requestCopy.normalizerHandoffModeLabel]
        : []),
      ...(requestCopy?.executionPayloadLabel
        ? [`Execution payload: ${requestCopy.executionPayloadLabel}`]
        : []),
      ...(requestCopy?.executionPayloadSummary
        ? [requestCopy.executionPayloadSummary]
        : []),
      ...(requestCopy?.executionPayloadStatusLabel
        ? [requestCopy.executionPayloadStatusLabel]
        : []),
      ...(requestCopy?.executionPayloadPayloadLabel
        ? [requestCopy.executionPayloadPayloadLabel]
        : []),
      ...(requestCopy?.executionPayloadSourceLabel
        ? [requestCopy.executionPayloadSourceLabel]
        : []),
      ...(requestCopy?.executionPayloadTargetLabel
        ? [requestCopy.executionPayloadTargetLabel]
        : []),
      ...(requestCopy?.executionPayloadModeLabel
        ? [requestCopy.executionPayloadModeLabel]
        : []),
      ...(requestCopy?.executionBridgeLabel
        ? [`Execution bridge: ${requestCopy.executionBridgeLabel}`]
        : []),
      ...(requestCopy?.executionBridgeSummary
        ? [requestCopy.executionBridgeSummary]
        : []),
      ...(requestCopy?.executionBridgeStatusLabel
        ? [requestCopy.executionBridgeStatusLabel]
        : []),
      ...(requestCopy?.executionBridgePayloadLabel
        ? [requestCopy.executionBridgePayloadLabel]
        : []),
      ...(requestCopy?.executionBridgeSourceLabel
        ? [requestCopy.executionBridgeSourceLabel]
        : []),
      ...(requestCopy?.executionBridgeTargetLabel
        ? [requestCopy.executionBridgeTargetLabel]
        : []),
      ...(requestCopy?.executionBridgeModeLabel
        ? [requestCopy.executionBridgeModeLabel]
        : []),
      ...(requestCopy?.fetchEntryLabel
        ? [`Fetch entry: ${requestCopy.fetchEntryLabel}`]
        : []),
      ...(requestCopy?.fetchEntrySummary
        ? [requestCopy.fetchEntrySummary]
        : []),
      ...(requestCopy?.fetchEntryStatusLabel
        ? [requestCopy.fetchEntryStatusLabel]
        : []),
      ...(requestCopy?.fetchEntryPayloadLabel
        ? [requestCopy.fetchEntryPayloadLabel]
        : []),
      ...(requestCopy?.fetchEntrySourceLabel
        ? [requestCopy.fetchEntrySourceLabel]
        : []),
      ...(requestCopy?.fetchEntryTargetLabel
        ? [requestCopy.fetchEntryTargetLabel]
        : []),
      ...(requestCopy?.fetchEntryModeLabel
        ? [requestCopy.fetchEntryModeLabel]
        : []),
      ...(requestCopy?.fetchDispatchLabel
        ? [`Fetch dispatch: ${requestCopy.fetchDispatchLabel}`]
        : []),
      ...(requestCopy?.fetchDispatchSummary
        ? [requestCopy.fetchDispatchSummary]
        : []),
      ...(requestCopy?.fetchDispatchStatusLabel
        ? [requestCopy.fetchDispatchStatusLabel]
        : []),
      ...(requestCopy?.fetchDispatchPayloadLabel
        ? [requestCopy.fetchDispatchPayloadLabel]
        : []),
      ...(requestCopy?.fetchDispatchSourceLabel
        ? [requestCopy.fetchDispatchSourceLabel]
        : []),
      ...(requestCopy?.fetchDispatchTargetLabel
        ? [requestCopy.fetchDispatchTargetLabel]
        : []),
      ...(requestCopy?.fetchDispatchModeLabel
        ? [requestCopy.fetchDispatchModeLabel]
        : []),
      ...(requestCopy?.transportCallLabel
        ? [`Transport call: ${requestCopy.transportCallLabel}`]
        : []),
      ...(requestCopy?.transportCallSummary
        ? [requestCopy.transportCallSummary]
        : []),
      ...(requestCopy?.transportCallStatusLabel
        ? [requestCopy.transportCallStatusLabel]
        : []),
      ...(requestCopy?.transportCallPayloadLabel
        ? [requestCopy.transportCallPayloadLabel]
        : []),
      ...(requestCopy?.transportCallSourceLabel
        ? [requestCopy.transportCallSourceLabel]
        : []),
      ...(requestCopy?.transportCallTargetLabel
        ? [requestCopy.transportCallTargetLabel]
        : []),
      ...(requestCopy?.transportCallModeLabel
        ? [requestCopy.transportCallModeLabel]
        : []),
      ...(requestCopy?.fetchExecutionLabel
        ? [`Fetch execution: ${requestCopy.fetchExecutionLabel}`]
        : []),
      ...(requestCopy?.fetchExecutionSummary
        ? [requestCopy.fetchExecutionSummary]
        : []),
      ...(requestCopy?.fetchExecutionStatusLabel
        ? [requestCopy.fetchExecutionStatusLabel]
        : []),
      ...(requestCopy?.fetchExecutionPayloadLabel
        ? [requestCopy.fetchExecutionPayloadLabel]
        : []),
      ...(requestCopy?.fetchExecutionSourceLabel
        ? [requestCopy.fetchExecutionSourceLabel]
        : []),
      ...(requestCopy?.fetchExecutionTargetLabel
        ? [requestCopy.fetchExecutionTargetLabel]
        : []),
      ...(requestCopy?.fetchExecutionModeLabel
        ? [requestCopy.fetchExecutionModeLabel]
        : []),
      ...(requestCopy?.executionDelegateLabel
        ? [`Execution delegate: ${requestCopy.executionDelegateLabel}`]
        : []),
      ...(requestCopy?.executionDelegateSummary
        ? [requestCopy.executionDelegateSummary]
        : []),
      ...(requestCopy?.executionDelegateStatusLabel
        ? [requestCopy.executionDelegateStatusLabel]
        : []),
      ...(requestCopy?.executionDelegatePayloadLabel
        ? [requestCopy.executionDelegatePayloadLabel]
        : []),
      ...(requestCopy?.executionDelegateSourceLabel
        ? [requestCopy.executionDelegateSourceLabel]
        : []),
      ...(requestCopy?.executionDelegateTargetLabel
        ? [requestCopy.executionDelegateTargetLabel]
        : []),
      ...(requestCopy?.executionDelegateModeLabel
        ? [requestCopy.executionDelegateModeLabel]
        : []),
      ...(requestCopy?.transportImplementationLabel
        ? [`Transport implementation: ${requestCopy.transportImplementationLabel}`]
        : []),
      ...(requestCopy?.transportImplementationSummary
        ? [requestCopy.transportImplementationSummary]
        : []),
      ...(requestCopy?.transportImplementationStatusLabel
        ? [requestCopy.transportImplementationStatusLabel]
        : []),
      ...(requestCopy?.transportImplementationPayloadLabel
        ? [requestCopy.transportImplementationPayloadLabel]
        : []),
      ...(requestCopy?.transportImplementationSourceLabel
        ? [requestCopy.transportImplementationSourceLabel]
        : []),
      ...(requestCopy?.transportImplementationTargetLabel
        ? [requestCopy.transportImplementationTargetLabel]
        : []),
      ...(requestCopy?.transportImplementationModeLabel
        ? [requestCopy.transportImplementationModeLabel]
        : []),
      ...(requestCopy?.transportRunnerLabel
        ? [`Transport runner: ${requestCopy.transportRunnerLabel}`]
        : []),
      ...(requestCopy?.transportRunnerSummary
        ? [requestCopy.transportRunnerSummary]
        : []),
      ...(requestCopy?.transportRunnerStatusLabel
        ? [requestCopy.transportRunnerStatusLabel]
        : []),
      ...(requestCopy?.transportRunnerPayloadLabel
        ? [requestCopy.transportRunnerPayloadLabel]
        : []),
      ...(requestCopy?.transportRunnerSourceLabel
        ? [requestCopy.transportRunnerSourceLabel]
        : []),
      ...(requestCopy?.transportRunnerTargetLabel
        ? [requestCopy.transportRunnerTargetLabel]
        : []),
      ...(requestCopy?.transportRunnerModeLabel
        ? [requestCopy.transportRunnerModeLabel]
        : []),
      ...(requestCopy?.executorLabel ? [`Executor: ${requestCopy.executorLabel}`] : []),
      ...(requestCopy?.executorSummary ? [requestCopy.executorSummary] : []),
      ...(healthCopy.nextRetryLabel ? [healthCopy.nextRetryLabel] : []),
      ...(healthCopy.lastUpdatedLabel ? [healthCopy.lastUpdatedLabel] : []),
      ...(healthCopy.fallbackHint ? [healthCopy.fallbackHint] : []),
      ...(existingStatusHotspot?.details ?? []),
    ],
    color: existingStatusHotspot?.color ?? providerStatusColor(world.source.health.state),
    position: existingStatusHotspot?.position ?? { x: 0, z: 7.2 },
  };
}

function withProviderStatusHotspot(world: PlazaWorldData): PlazaWorldData {
  const hotspots = world.hotspots.filter((hotspot) => hotspot.id !== "provider-status");
  hotspots.unshift(createProviderStatusHotspot(world));
  return {
    ...world,
    hotspots,
  };
}

export async function loadPlazaWorldData(
  provider: PlazaWorldDataProvider
): Promise<PlazaWorldData> {
  try {
    const world = await provider.load();
    return withProviderStatusHotspot(world);
  } catch (error) {
    console.error(`Failed to load plaza world data from ${provider.id}`, error);
    return withProviderStatusHotspot(createProviderFailureWorldData(provider, error));
  }
}
