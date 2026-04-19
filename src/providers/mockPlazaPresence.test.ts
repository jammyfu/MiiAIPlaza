import { expect, test } from "bun:test";
import { listMockHotspots, listMockResidents } from "./mockPlazaPresence";

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
  }
});

test("mock hotspots are uniquely placed", () => {
  const positions = listMockHotspots().map(
    (hotspot) => `${hotspot.position.x}:${hotspot.position.z}`
  );
  expect(new Set(positions).size).toBe(positions.length);
});
