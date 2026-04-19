import { expect, test } from "bun:test";
import type { PlazaWorldDataSnapshot } from "../../contracts/plaza";
import {
  createProviderStatusRefreshDetails,
  describeRefreshUiState,
} from "./plazaRefreshUi";

function createSnapshot(
  trigger: PlazaWorldDataSnapshot["trigger"],
  sequence: number
): PlazaWorldDataSnapshot {
  return {
    trigger,
    sequence,
    world: {
      source: {
        id: "mock",
        provider: "Mock",
        mode: "mock",
        health: {
          state: "healthy",
          headline: "Mock provider is healthy.",
        },
      },
      residents: [],
      hotspots: [],
    },
  };
}

test("describeRefreshUiState keeps initial-load and manual-refresh copy readable", () => {
  expect(describeRefreshUiState(createSnapshot("initial", 1), false)).toEqual({
    actionLabel: "Refresh Provider",
    actionHint: "Initial load ready",
    statusLabel: "Load #1 · Initial load ready",
  });

  expect(describeRefreshUiState(createSnapshot("manual-refresh", 3), false)).toEqual({
    actionLabel: "Refresh Provider",
    actionHint: "Manual refresh ready",
    statusLabel: "Load #3 · Manual refresh ready",
  });

  expect(describeRefreshUiState(createSnapshot("manual-refresh", 4), true)).toEqual({
    actionLabel: "Refreshing...",
    actionHint: "Refreshing provider snapshot...",
    statusLabel: "Load #4 · Refreshing provider snapshot...",
  });
});

test("createProviderStatusRefreshDetails keeps hotspot copy aligned with the same refresh boundary", () => {
  expect(createProviderStatusRefreshDetails(createSnapshot("manual-refresh", 2))).toEqual([
    "Refresh status: Load #2 · Manual refresh ready",
    "Refresh action: Use Refresh Provider in the plaza HUD to fetch a new snapshot.",
  ]);
});
