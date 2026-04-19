import { expect, test } from "bun:test";
import type {
  PlazaWorldDataPollingPlan,
  PlazaWorldDataSnapshot,
} from "../../contracts/plaza";
import {
  createProviderStatusRefreshDetails,
  describePollingPlanUi,
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
  const pollingPlan: PlazaWorldDataPollingPlan = {
    mode: "cadence-ready",
    recommendedIntervalMs: 180000,
    nextSuggestedRefreshAt: "2026-04-20T10:15:00.000Z",
    reason:
      "Future background polling can reuse the provider retry timing without changing the refresh boundary.",
  };

  expect(createProviderStatusRefreshDetails(createSnapshot("manual-refresh", 2), pollingPlan))
    .toEqual([
      "Refresh status: Load #2 · Manual refresh ready",
      "Refresh action: Use Refresh Provider in the plaza HUD to fetch a new snapshot.",
      "Polling posture: Cadence-ready polling seam (3m)",
      "Suggested next auto refresh at 10:15",
    ]);
});

test("describePollingPlanUi keeps manual-only and cadence-ready copy readable", () => {
  expect(
    describePollingPlanUi({
      mode: "manual-only",
      recommendedIntervalMs: null,
      nextSuggestedRefreshAt: undefined,
      reason: "Stay on manual refresh until provider retry timing is available.",
    })
  ).toEqual({
    label: "Manual-only refresh boundary",
    detail: "Future polling is disabled until provider retry timing is available.",
  });

  expect(
    describePollingPlanUi({
      mode: "cadence-ready",
      recommendedIntervalMs: 180000,
      nextSuggestedRefreshAt: "2026-04-20T10:15:00.000Z",
      reason:
        "Future background polling can reuse the provider retry timing without changing the refresh boundary.",
    })
  ).toEqual({
    label: "Cadence-ready polling seam (3m)",
    detail: "Suggested next auto refresh at 10:15",
  });
});
