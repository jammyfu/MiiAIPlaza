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
          request: {
            transport: "http",
            endpointLabel: "Configured via future live request seam",
            authKind: "token",
            liveEnabled: false,
            descriptor: {
              method: "GET",
              pathLabel: "/presence",
              queryLabel: "view=plaza&workspace=mii-plaza-client",
              acceptLabel: "application/json",
              authHeaderLabel: "Authorization: Bearer OPENCLAW_TOKEN",
            },
            transportDelegate: {
              id: "openclaw-preview-transport",
              label: "Preview transport delegate",
              summary:
                "Consumes the request descriptor and returns a preview payload without network I/O.",
            },
            executor: {
              status: "ready",
              mode: "dry-run",
              summary:
                "Executor seam is ready; enable live requests when network fetches are introduced.",
            },
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
  expect(world.hotspots[0]?.details).toContain("Request transport: HTTP");
  expect(world.hotspots[0]?.details).toContain(
    "Request endpoint: Configured via future live request seam"
  );
  expect(world.hotspots[0]?.details).toContain("Request descriptor: GET /presence");
  expect(world.hotspots[0]?.details).toContain(
    "Query: view=plaza&workspace=mii-plaza-client"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Transport delegate: Preview transport delegate"
  );
  expect(world.hotspots[0]?.details).toContain("Live request: Config only");
  expect(world.hotspots[0]?.details).toContain("Executor: Dry run ready");
  expect(world.hotspots[0]?.details).toContain(
    "Executor seam is ready; enable live requests when network fetches are introduced."
  );
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
