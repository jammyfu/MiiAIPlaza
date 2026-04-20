import { expect, test } from "bun:test";
import { getPresenceDiagnostics } from "../game/plaza/plazaPresenceDiagnostics";
import {
  createOpenClawPresenceFixture,
  createOpenClawFixtureWorldData,
  createOpenClawLiveRequestConfig,
  resolveOpenClawLiveRequestOverrides,
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
  expect(providerData.source.health.state).toBe("degraded");
  expect(providerData.source.health.retryAfterMs).toBe(180000);
  expect(providerData.source.health.nextRetryAt).toBeDefined();
  expect(
    new Date(providerData.source.health.nextRetryAt!).getTime() -
      new Date(providerData.source.health.lastSuccessfulUpdate!).getTime()
  ).toBe(180000);
  expect(providerData.source.health.fallbackHint).toContain("last normalized snapshot");
  expect(providerData.residents.length).toBe(directData.residents.length);
  expect(providerData.hotspots.length).toBeGreaterThan(0);
});

test("openclaw fixture can expose stale residents for provider diagnostics", () => {
  const fixture = createOpenClawPresenceFixture("2026-04-20T10:12:00Z");
  const residents = openClawPresenceAdapter.listResidents(fixture);
  const staleResidents = residents.filter((resident) =>
    getPresenceDiagnostics(resident.presence, { now: fixture.generatedAt }).isStale
  );

  expect(staleResidents.length).toBe(1);
  expect(staleResidents[0]?.agent.id).toBe("mailbox-lantern");
});

test("openclaw fixture carries a typed live-request configuration seam", () => {
  const requestConfig = createOpenClawLiveRequestConfig({
    workspaceHint: "mii-plaza-client",
  });
  const worldData = createOpenClawFixtureWorldData();

  expect(requestConfig.transport).toBe("http");
  expect(requestConfig.authKind).toBe("token");
  expect(requestConfig.liveEnabled).toBe(false);
  expect(requestConfig.endpointLabel).toContain("pending");
  expect(worldData.source.request).toEqual(requestConfig);
});

test("openclaw request overrides resolve endpoint and auth posture without enabling fetches by default", () => {
  expect(
    resolveOpenClawLiveRequestOverrides({
      endpointUrl: "https://openclaw.example.com/presence",
      authTokenName: "OPENCLAW_TOKEN",
      workspaceHint: "mii-plaza-client",
    })
  ).toEqual({
    transport: "http",
    endpointLabel: "https://openclaw.example.com/presence",
    authKind: "token",
    liveEnabled: false,
    workspaceHint: "mii-plaza-client",
  });
});

test("openclaw request overrides can opt into a session-backed live configuration", () => {
  expect(
    resolveOpenClawLiveRequestOverrides({
      endpointUrl: "https://openclaw.example.com/presence",
      authKind: "session",
      liveEnabled: true,
    })
  ).toEqual({
    transport: "http",
    endpointLabel: "https://openclaw.example.com/presence",
    authKind: "session",
    liveEnabled: true,
  });
});
