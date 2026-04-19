import { expect, test } from "bun:test";
import { getPresenceDiagnostics } from "../game/plaza/plazaPresenceDiagnostics";
import {
  createMockPlazaWorldData,
  listMockHotspots,
  listMockResidents,
  mockPlazaWorldDataProvider,
} from "./mockPlazaPresence";

test("mock residents expose stable unique ids", () => {
  const residents = listMockResidents();
  expect(residents.length).toBeGreaterThanOrEqual(3);
  expect(new Set(residents.map((resident) => resident.agent.id)).size).toBe(
    residents.length
  );
});

test("mock residents match their presence snapshots", () => {
  for (const resident of listMockResidents()) {
    expect(resident.presence.agentId).toBe(resident.agent.id);
    expect(resident.agent.capabilityTags.length).toBeGreaterThan(0);
    expect(Number.isNaN(new Date(resident.presence.updatedAt).getTime())).toBe(false);
  }
});

test("mock hotspots are uniquely placed", () => {
  const positions = listMockHotspots().map(
    (hotspot) => `${hotspot.position.x}:${hotspot.position.z}`
  );
  expect(new Set(positions).size).toBe(positions.length);
});

test("mock provider exposes plaza world data through an explicit provider seam", async () => {
  const directData = createMockPlazaWorldData();
  const providerData = await mockPlazaWorldDataProvider.load();

  expect(providerData.source.id).toBe("mock");
  expect(providerData.source.mode).toBe("mock");
  expect(providerData.source.health.state).toBe("healthy");
  expect(providerData.source.health.retryAfterMs).toBe(0);
  expect(providerData.residents.length).toBe(directData.residents.length);
  expect(providerData.hotspots.length).toBe(directData.hotspots.length);
});

test("mock residents can surface stale diagnostics through timestamps", () => {
  const residents = listMockResidents();
  const staleResidents = residents.filter((resident) =>
    getPresenceDiagnostics(resident.presence).isStale
  );

  expect(staleResidents.length).toBeGreaterThanOrEqual(1);
});
