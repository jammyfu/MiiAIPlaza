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
