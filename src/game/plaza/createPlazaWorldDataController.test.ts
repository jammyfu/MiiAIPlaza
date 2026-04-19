import { expect, test } from "bun:test";
import type { PlazaWorldDataProvider } from "../../contracts/plaza";
import { createPlazaWorldDataController } from "./createPlazaWorldDataController";

test("createPlazaWorldDataController tracks initial load and manual refresh metadata", async () => {
  let loadCount = 0;
  const provider: PlazaWorldDataProvider = {
    id: "mock",
    provider: "Mock",
    mode: "mock",
    async load() {
      loadCount += 1;
      return {
        source: {
          id: "mock",
          provider: "Mock",
          mode: "mock",
          health: {
            state: "healthy",
            headline: `Mock snapshot ${loadCount}`,
          },
        },
        residents: [],
        hotspots: [],
      };
    },
  };

  const controller = createPlazaWorldDataController(provider);

  expect(controller.getLatestSnapshot()).toBeNull();

  const initial = await controller.loadInitial();
  expect(initial.trigger).toBe("initial");
  expect(initial.sequence).toBe(1);
  expect(initial.world.source.health.headline).toBe("Mock snapshot 1");
  expect(initial.world.hotspots[0]?.id).toBe("provider-status");

  const refreshed = await controller.refresh();
  expect(refreshed.trigger).toBe("manual-refresh");
  expect(refreshed.sequence).toBe(2);
  expect(refreshed.world.source.health.headline).toBe("Mock snapshot 2");
  expect(refreshed.world.hotspots[0]?.id).toBe("provider-status");

  expect(controller.getLatestSnapshot()).toEqual(refreshed);
  expect(controller.getPollingPlan()).toEqual({
    mode: "manual-only",
    recommendedIntervalMs: null,
    nextSuggestedRefreshAt: undefined,
    reason: "Stay on manual refresh until provider retry timing is available.",
  });
  expect(loadCount).toBe(2);
});

test("createPlazaWorldDataController keeps fallback loading behavior during manual refresh", async () => {
  let loadCount = 0;
  const provider: PlazaWorldDataProvider = {
    id: "openclaw-live",
    provider: "OpenClaw",
    mode: "live",
    async load() {
      loadCount += 1;
      if (loadCount === 1) {
        return {
          source: {
            id: "openclaw-live",
            provider: "OpenClaw",
            mode: "live",
            health: {
              state: "degraded",
              headline: "Fixture-backed feed is online.",
            },
          },
          residents: [],
          hotspots: [],
        };
      }

      throw new Error("manual refresh timed out");
    },
  };

  const controller = createPlazaWorldDataController(provider);

  const initial = await controller.loadInitial();
  expect(initial.trigger).toBe("initial");
  expect(initial.world.source.health.state).toBe("degraded");
  expect(controller.getPollingPlan()).toEqual({
    mode: "manual-only",
    recommendedIntervalMs: null,
    nextSuggestedRefreshAt: undefined,
    reason: "Stay on manual refresh until provider retry timing is available.",
  });

  const refreshed = await controller.refresh();
  expect(refreshed.trigger).toBe("manual-refresh");
  expect(refreshed.sequence).toBe(2);
  expect(refreshed.world.source.health.state).toBe("failing");
  expect(refreshed.world.hotspots[0]?.id).toBe("provider-status");
  expect(refreshed.world.hotspots[0]?.details).toContain("Failure: manual refresh timed out");
  expect(controller.getPollingPlan()).toEqual({
    mode: "cadence-ready",
    recommendedIntervalMs: 120000,
    nextSuggestedRefreshAt: refreshed.world.source.health.nextRetryAt,
    reason: "Future background polling can reuse the provider retry timing without changing the refresh boundary.",
  });
});
