import type { PlazaWorldData, PlazaWorldDataProvider } from "../../contracts/plaza";

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
        details: [
          `Provider: ${provider.provider}`,
          `Mode: ${provider.mode}`,
          `Failure: ${reason}`,
          "Fallback path: keep the world shell online and wait for provider recovery.",
        ],
        color: "#e76f51",
        position: { x: 0, z: 7.2 },
      },
    ],
  };
}

export async function loadPlazaWorldData(
  provider: PlazaWorldDataProvider
): Promise<PlazaWorldData> {
  try {
    return await provider.load();
  } catch (error) {
    console.error(`Failed to load plaza world data from ${provider.id}`, error);
    return createProviderFailureWorldData(provider, error);
  }
}
