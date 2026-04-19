import { expect, test } from "bun:test";
import {
  createOpenClawFixtureWorldData,
  openClawPresenceAdapter,
  openClawPresenceFixture,
  openClawFixtureWorldDataProvider,
} from "./openClawPresenceAdapter";

test("openclaw fixture snapshots normalize external states", () => {
  const snapshots = openClawPresenceAdapter.listSnapshots(openClawPresenceFixture);
  expect(snapshots.map((snapshot) => snapshot.status)).toEqual([
    "active",
    "idle",
    "busy",
  ]);
  expect(snapshots[0]?.agentId).toBe("openclaw");
});

test("openclaw fixture residents hydrate from normalized snapshots", () => {
  const residents = openClawPresenceAdapter.listResidents(openClawPresenceFixture);
  expect(residents.length).toBe(openClawPresenceFixture.agents.length);

  for (const resident of residents) {
    expect(resident.presence.agentId).toBe(resident.agent.id);
    expect(resident.agent.provider).toBe("OpenClaw");
    expect(resident.details.some((detail) => detail.includes("Workspace:"))).toBe(
      true
    );
  }
});

test("openclaw fixture world data preserves hotspots through the provider seam", async () => {
  const directData = createOpenClawFixtureWorldData();
  const providerData = await openClawFixtureWorldDataProvider.load();

  expect(providerData.source.id).toBe("openclaw-fixture");
  expect(providerData.source.mode).toBe("fixture");
  expect(providerData.residents.length).toBe(directData.residents.length);
  expect(providerData.hotspots.length).toBeGreaterThan(0);
});
