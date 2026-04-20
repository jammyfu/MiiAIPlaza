import { expect, test } from "bun:test";
import { getPresenceDiagnostics } from "../game/plaza/plazaPresenceDiagnostics";
import {
  createOpenClawPresenceFixture,
  createOpenClawFixtureWorldData,
  createOpenClawLiveRequestConfig,
  createOpenClawLiveProviderSkeleton,
  normalizeOpenClawLiveResponsePayload,
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
  expect(requestConfig.executor).toEqual({
    status: "needs-config",
    mode: "dry-run",
    summary: "Configure a live OpenClaw endpoint before enabling fetch execution.",
  });
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
    executor: {
      status: "ready",
      mode: "dry-run",
      summary: "Executor seam is ready; enable live requests when network fetches are introduced.",
    },
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
    executor: {
      status: "ready",
      mode: "live",
      summary: "Executor seam is configured for live OpenClaw fetches once network calls are allowed.",
    },
  });
});

test("openclaw live responses normalize into the existing fixture payload shape", () => {
  const normalized = normalizeOpenClawLiveResponsePayload({
    generated_at: "2026-04-20T10:12:00Z",
    workspace: "mii-plaza-client",
    agents: [
      {
        agent_id: "openclaw-live",
        display_name: "OpenClaw Live",
        role_name: "Execution Captain",
        state: "running",
        summary: "Streaming a live rollout",
        task: "Normalizing live payloads into fixture-compatible residents",
        mood: "focused",
        updated_at: "2026-04-20T10:11:00Z",
        location: "Fountain Walk",
        activity_score: 0.97,
        tags: ["plans", "tools"],
        palette: {
          primary: "#ff8a4c",
          accent: "#ffd166",
        },
        bio: "Carries future live provider data into the plaza contract.",
        prompt: "Inspect how live response payloads normalize into plaza residents.",
        highlights: [
          "Maps future live payload fields into the shared fixture shape.",
        ],
        position: {
          x: -3,
          z: 2,
        },
      },
    ],
  });

  expect(normalized).toEqual({
    generatedAt: "2026-04-20T10:12:00Z",
    workspace: "mii-plaza-client",
    agents: [
      {
        id: "openclaw-live",
        name: "OpenClaw Live",
        occupation: "Execution Captain",
        state: "running",
        summary: "Streaming a live rollout",
        task: "Normalizing live payloads into fixture-compatible residents",
        vibe: "focused",
        seenAt: "2026-04-20T10:11:00Z",
        zone: "Fountain Walk",
        score: 0.97,
        tags: ["plans", "tools"],
        palette: {
          primary: "#ff8a4c",
          accent: "#ffd166",
        },
        bio: "Carries future live provider data into the plaza contract.",
        prompt: "Inspect how live response payloads normalize into plaza residents.",
        highlights: [
          "Maps future live payload fields into the shared fixture shape.",
        ],
        plazaPosition: {
          x: -3,
          z: 2,
        },
      },
    ],
  });
});

test("openclaw normalized live responses can hydrate through the existing world-data path", () => {
  const normalized = normalizeOpenClawLiveResponsePayload({
    generated_at: "2026-04-20T10:12:00Z",
    workspace: "mii-plaza-client",
    agents: [
      {
        agent_id: "openclaw-live",
        display_name: "OpenClaw Live",
        role_name: "Execution Captain",
        state: "ready",
        summary: "Live payload normalized",
        task: "Passing through the existing plaza adapter seam",
        mood: "steady",
        updated_at: "2026-04-20T10:10:00Z",
        location: "Board Walk",
        activity_score: 0.72,
        tags: ["verification"],
        palette: {
          primary: "#4cc9f0",
          accent: "#90f1ef",
        },
        bio: "Proves that live responses can reuse the current contract path.",
        prompt: "Inspect the normalized live response seam.",
        highlights: ["Reuses the existing fixture-backed world-data path."],
        position: {
          x: 4,
          z: 1,
        },
      },
    ],
  });

  const worldData = createOpenClawFixtureWorldData(normalized);

  expect(worldData.residents.length).toBe(1);
  expect(worldData.residents[0]?.agent.id).toBe("openclaw-live");
  expect(worldData.residents[0]?.presence.status).toBe("idle");
  expect(worldData.source.request?.executor?.status).toBe("needs-config");
});

test("openclaw live provider skeleton composes request, normalization, and world hydration", () => {
  const skeleton = createOpenClawLiveProviderSkeleton({
    endpointUrl: "https://openclaw.example.com/presence",
    authTokenName: "OPENCLAW_TOKEN",
    workspaceHint: "mii-plaza-client",
  });

  const livePayload = {
    generated_at: "2026-04-20T10:12:00Z",
    workspace: "mii-plaza-client",
    agents: [
      {
        agent_id: "openclaw-live",
        display_name: "OpenClaw Live",
        role_name: "Execution Captain",
        state: "running" as const,
        summary: "Live provider skeleton is ready",
        task: "Composing future live provider pieces",
        mood: "focused",
        updated_at: "2026-04-20T10:11:00Z",
        location: "Fountain Walk",
        activity_score: 0.97,
        tags: ["plans", "tools"],
        palette: {
          primary: "#ff8a4c",
          accent: "#ffd166",
        },
        bio: "Proves the live provider seam composes without network traffic.",
        prompt: "Inspect the composed live provider skeleton.",
        highlights: ["Reuses request, executor, and normalization seams together."],
        position: {
          x: -2,
          z: 1,
        },
      },
    ],
  };

  expect(skeleton.request.endpointLabel).toBe("https://openclaw.example.com/presence");
  expect(skeleton.request.executor).toEqual({
    status: "ready",
    mode: "dry-run",
    summary: "Executor seam is ready; enable live requests when network fetches are introduced.",
  });

  const normalized = skeleton.normalizeResponse(livePayload);
  expect(normalized.agents[0]?.id).toBe("openclaw-live");

  const worldData = skeleton.createWorldDataFromResponse(livePayload);
  expect(worldData.source.request).toEqual(skeleton.request);
  expect(worldData.residents[0]?.agent.id).toBe("openclaw-live");
  expect(worldData.residents[0]?.presence.status).toBe("active");
});
