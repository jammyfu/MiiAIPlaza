import type {
  PlazaWorldDataPollingPlan,
  PlazaWorldDataProvider,
  PlazaWorldDataSnapshot,
} from "../../contracts/plaza";
import { loadPlazaWorldData } from "./loadPlazaWorldData";

export interface PlazaWorldDataController {
  loadInitial(): Promise<PlazaWorldDataSnapshot>;
  refresh(): Promise<PlazaWorldDataSnapshot>;
  getLatestSnapshot(): PlazaWorldDataSnapshot | null;
  getPollingPlan(): PlazaWorldDataPollingPlan | null;
}

function createPollingPlan(
  snapshot: PlazaWorldDataSnapshot | null
): PlazaWorldDataPollingPlan | null {
  if (!snapshot) {
    return null;
  }

  const retryAfterMs = snapshot.world.source.health.retryAfterMs;
  if (typeof retryAfterMs === "number" && retryAfterMs > 0) {
    return {
      mode: "cadence-ready",
      recommendedIntervalMs: retryAfterMs,
      nextSuggestedRefreshAt: snapshot.world.source.health.nextRetryAt,
      reason:
        "Future background polling can reuse the provider retry timing without changing the refresh boundary.",
    };
  }

  return {
    mode: "manual-only",
    recommendedIntervalMs: null,
    nextSuggestedRefreshAt: undefined,
    reason: "Stay on manual refresh until provider retry timing is available.",
  };
}

export function createPlazaWorldDataController(
  provider: PlazaWorldDataProvider
): PlazaWorldDataController {
  let sequence = 0;
  let latestSnapshot: PlazaWorldDataSnapshot | null = null;

  async function runLoad(
    trigger: PlazaWorldDataSnapshot["trigger"]
  ): Promise<PlazaWorldDataSnapshot> {
    const world = await loadPlazaWorldData(provider);
    sequence += 1;
    latestSnapshot = {
      sequence,
      trigger,
      world,
    };
    return latestSnapshot;
  }

  return {
    loadInitial() {
      return runLoad("initial");
    },
    refresh() {
      return runLoad("manual-refresh");
    },
    getLatestSnapshot() {
      return latestSnapshot;
    },
    getPollingPlan() {
      return createPollingPlan(latestSnapshot);
    },
  };
}
