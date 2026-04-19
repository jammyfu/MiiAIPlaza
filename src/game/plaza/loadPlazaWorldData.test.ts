import { expect, test } from "bun:test";
import type { PlazaWorldDataProvider } from "../../contracts/plaza";
import { loadPlazaWorldData } from "./loadPlazaWorldData";

test("loadPlazaWorldData passes through successful provider results", async () => {
  const provider: PlazaWorldDataProvider = {
    id: "mock",
    provider: "Mock",
    mode: "mock",
    async load() {
      return {
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
      };
    },
  };

  const world = await loadPlazaWorldData(provider);
  expect(world.source.health.state).toBe("healthy");
  expect(world.hotspots.length).toBe(1);
  expect(world.hotspots[0]?.id).toBe("provider-status");
  expect(world.hotspots[0]?.name).toBe("Provider Status");
  expect(world.hotspots[0]?.details).toContain("Health: Healthy");
  expect(world.hotspots[0]?.details).toContain("Retry: Retry on demand");
});

test("loadPlazaWorldData recovers provider failures into structured fallback world data", async () => {
  const provider: PlazaWorldDataProvider = {
    id: "openclaw-live",
    provider: "OpenClaw",
    mode: "live",
    async load() {
      throw new Error("gateway timed out");
    },
  };

  const world = await loadPlazaWorldData(provider);

  expect(world.source.id).toBe("openclaw-live");
  expect(world.source.provider).toBe("OpenClaw");
  expect(world.source.mode).toBe("live");
  expect(world.source.health.state).toBe("failing");
  expect(world.source.health.headline).toContain("unavailable");
  expect(world.source.health.fallbackHint).toContain("status terminal");
  expect(world.residents.length).toBe(0);
  expect(world.hotspots.length).toBeGreaterThan(0);
  expect(world.hotspots[0]?.name).toBe("Provider Status");
  expect(world.hotspots[0]?.details).toContain("Health: Failing");
  expect(world.hotspots[0]?.details.some((detail) => detail.startsWith("Retry: "))).toBe(
    true
  );
});
