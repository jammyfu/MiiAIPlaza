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
            fetchRunner: {
              id: "openclaw-preview-runner",
              label: "Preview fetch runner",
              contract: "network-capable",
              mode: "preview",
              summary:
                "Provides preview payloads for the transport delegate without invoking a real network fetch.",
            },
            fetchRunnerFactory: {
              id: "openclaw-runner-factory",
              label: "OpenClaw fetch-runner factory",
              summary:
                "Chooses between preview and live-capable runner implementations without changing the transport delegate seam.",
            },
            runnerEnvelope: {
              id: "openclaw-runner-envelope",
              label: "OpenClaw runner request envelope",
              summary:
                "Normalizes endpoint, auth, and descriptor inputs into one runner-consumable shape before live fetches exist.",
              transport: "http",
              endpointLabel: "Configured via future live request seam",
              authKind: "token",
              runnerMode: "preview",
              descriptor: {
                method: "GET",
                pathLabel: "/presence",
                queryLabel: "view=plaza&workspace=mii-plaza-client",
                acceptLabel: "application/json",
                authHeaderLabel: "Authorization: Bearer OPENCLAW_TOKEN",
              },
            },
            requestBuilder: {
              id: "openclaw-live-request-builder",
              label: "OpenClaw live request builder",
              summary:
                "Resolves the runner envelope into a concrete fetch-ready request shape without executing network calls.",
              method: "GET",
              urlLabel:
                "Configured via future live request seam?view=plaza&workspace=mii-plaza-client",
              headerLabels: [
                "Accept: application/json",
                "Authorization: Bearer OPENCLAW_TOKEN",
              ],
            },
            fetchAttempt: {
              id: "openclaw-live-fetch-attempt",
              label: "OpenClaw live fetch attempt",
              summary:
                "Represents the next transport-ready fetch input derived from the request builder without executing it.",
              method: "GET",
              urlLabel:
                "Configured via future live request seam?view=plaza&workspace=mii-plaza-client",
              headerLabels: [
                "Accept: application/json",
                "Authorization: Bearer OPENCLAW_TOKEN",
              ],
              runnerMode: "preview",
            },
            fetchResult: {
              id: "openclaw-live-fetch-result",
              label: "OpenClaw live fetch result",
              summary:
                "Represents the placeholder transport response shape that future live fetches will hydrate after a fetch attempt.",
              status: "preview-payload",
              payloadLabel:
                "Preview payload available from no-network live-preview execution.",
              sourceAttemptLabel:
                "GET Configured via future live request seam?view=plaza&workspace=mii-plaza-client",
              runnerMode: "preview",
            },
            responseEnvelope: {
              id: "openclaw-live-response-envelope",
              label: "OpenClaw live response envelope",
              summary:
                "Represents the normalization-ready handoff state derived from the fetch result before real transport responses are processed.",
              status: "preview-payload",
              payloadLabel:
                "Preview payload available from no-network live-preview execution.",
              sourceResultLabel:
                "Preview payload from GET Configured via future live request seam?view=plaza&workspace=mii-plaza-client",
              normalizationTargetLabel: "OpenClaw live response normalizer",
              runnerMode: "preview",
            },
            normalizerHandoff: {
              id: "openclaw-live-normalizer-handoff",
              label: "OpenClaw live normalizer handoff",
              summary:
                "Represents the placeholder normalization-boundary state derived from the response envelope before payload normalization runs.",
              status: "preview-payload",
              payloadLabel:
                "Preview payload available from no-network live-preview execution.",
              sourceEnvelopeLabel:
                "Preview payload from GET Configured via future live request seam?view=plaza&workspace=mii-plaza-client",
              normalizationTargetLabel: "OpenClaw live response normalizer",
              runnerMode: "preview",
            },
            executionPayload: {
              id: "openclaw-live-execution-payload",
              label: "OpenClaw live execution payload",
              summary:
                "Represents the placeholder execution-boundary payload derived from the normalizer handoff before live transport execution runs.",
              status: "preview-payload",
              payloadLabel:
                "Preview payload available from no-network live-preview execution.",
              sourceHandoffLabel:
                "Preview payload from GET Configured via future live request seam?view=plaza&workspace=mii-plaza-client",
              executionTargetLabel: "OpenClaw live execution bridge",
              runnerMode: "preview",
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
  expect(world.hotspots[0]?.details).toContain(
    "Fetch runner: Preview fetch runner"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Fetch runner contract: Network-capable preview runner"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Fetch runner factory: OpenClaw fetch-runner factory"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Runner envelope: OpenClaw runner request envelope"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Envelope target: GET /presence via Configured via future live request seam"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Request builder: OpenClaw live request builder"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Request build: GET Configured via future live request seam?view=plaza&workspace=mii-plaza-client"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Headers: Accept: application/json; Authorization: Bearer OPENCLAW_TOKEN"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Fetch attempt: OpenClaw live fetch attempt"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Fetch attempt target: GET Configured via future live request seam?view=plaza&workspace=mii-plaza-client"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Attempt headers: Accept: application/json; Authorization: Bearer OPENCLAW_TOKEN"
  );
  expect(world.hotspots[0]?.details).toContain("Attempt mode: Preview");
  expect(world.hotspots[0]?.details).toContain(
    "Fetch result: OpenClaw live fetch result"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Fetch result status: Preview payload"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Result payload: Preview payload available from no-network live-preview execution."
  );
  expect(world.hotspots[0]?.details).toContain(
    "Result source attempt: GET Configured via future live request seam?view=plaza&workspace=mii-plaza-client"
  );
  expect(world.hotspots[0]?.details).toContain("Result mode: Preview");
  expect(world.hotspots[0]?.details).toContain(
    "Response envelope: OpenClaw live response envelope"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Response envelope status: Preview payload"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Envelope payload: Preview payload available from no-network live-preview execution."
  );
  expect(world.hotspots[0]?.details).toContain(
    "Envelope source result: Preview payload from GET Configured via future live request seam?view=plaza&workspace=mii-plaza-client"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Normalization handoff: OpenClaw live response normalizer"
  );
  expect(world.hotspots[0]?.details).toContain("Envelope mode: Preview");
  expect(world.hotspots[0]?.details).toContain(
    "Normalizer handoff: OpenClaw live normalizer handoff"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Normalizer handoff status: Preview payload"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Normalizer payload: Preview payload available from no-network live-preview execution."
  );
  expect(world.hotspots[0]?.details).toContain(
    "Normalizer source envelope: Preview payload from GET Configured via future live request seam?view=plaza&workspace=mii-plaza-client"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Normalizer target: OpenClaw live response normalizer"
  );
  expect(world.hotspots[0]?.details).toContain("Normalizer mode: Preview");
  expect(world.hotspots[0]?.details).toContain(
    "Execution payload: OpenClaw live execution payload"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Execution payload status: Preview payload"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Execution payload: Preview payload available from no-network live-preview execution."
  );
  expect(world.hotspots[0]?.details).toContain(
    "Execution source handoff: Preview payload from GET Configured via future live request seam?view=plaza&workspace=mii-plaza-client"
  );
  expect(world.hotspots[0]?.details).toContain(
    "Execution target: OpenClaw live execution bridge"
  );
  expect(world.hotspots[0]?.details).toContain("Execution mode: Preview");
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
