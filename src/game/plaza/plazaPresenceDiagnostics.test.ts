import { expect, test } from "bun:test";
import type {
  PlazaPresenceSnapshot,
  PlazaWorldDataHealth,
  PlazaWorldDataSource,
} from "../../contracts/plaza";
import {
  describePresenceFreshness,
  describeWorldDataHealth,
  describeWorldDataSource,
  getPresenceDiagnostics,
} from "./plazaPresenceDiagnostics";

function makeSnapshot(overrides: Partial<PlazaPresenceSnapshot> = {}): PlazaPresenceSnapshot {
  return {
    agentId: "resident",
    status: "active",
    headline: "Shipping diagnostics",
    currentTask: "Teaching the plaza how to read provider freshness",
    mood: "focused",
    updatedAt: "2026-04-20T10:00:00Z",
    locationHint: "Fountain Walk",
    activityScore: 0.82,
    ...overrides,
  };
}

test("presence diagnostics classify fresh, aging, stale, and unknown snapshots", () => {
  const now = "2026-04-20T10:12:00Z";

  expect(
    getPresenceDiagnostics(makeSnapshot({ updatedAt: "2026-04-20T10:11:30Z" }), { now })
      .freshness
  ).toBe("fresh");
  expect(
    getPresenceDiagnostics(makeSnapshot({ updatedAt: "2026-04-20T10:06:00Z" }), { now })
      .freshness
  ).toBe("aging");
  expect(
    getPresenceDiagnostics(makeSnapshot({ updatedAt: "2026-04-20T09:48:00Z" }), { now })
      .freshness
  ).toBe("stale");
  expect(
    getPresenceDiagnostics(makeSnapshot({ updatedAt: "just now" }), { now }).freshness
  ).toBe("unknown");
});

test("presence diagnostics expose stale flags and readable update copy", () => {
  const diagnostics = getPresenceDiagnostics(
    makeSnapshot({ updatedAt: "2026-04-20T09:48:00Z" }),
    { now: "2026-04-20T10:12:00Z" }
  );

  expect(diagnostics.isStale).toBe(true);
  expect(diagnostics.updatedLabel).toContain("24m");
  expect(describePresenceFreshness(diagnostics.freshness)).toBe("Stale");
});

test("world data source copy stays readable in the hud", () => {
  const source: PlazaWorldDataSource = {
    id: "openclaw-fixture",
    provider: "OpenClaw",
    mode: "fixture",
    health: {
      state: "degraded",
      headline: "Fixture feed is available with stale residents.",
      lastSuccessfulUpdate: "2026-04-20T10:05:00Z",
      fallbackHint: "Using the last normalized snapshot while live polling is unavailable.",
    },
  };

  expect(describeWorldDataSource(source)).toBe("OpenClaw fixture feed");
});

test("world data health copy stays readable in the hud", () => {
  const health: PlazaWorldDataHealth = {
    state: "degraded",
    headline: "Fixture feed is available with stale residents.",
    lastSuccessfulUpdate: "2026-04-20T10:05:00Z",
    fallbackHint: "Using the last normalized snapshot while live polling is unavailable.",
  };

  expect(describeWorldDataHealth(health, { now: "2026-04-20T10:12:00Z" })).toEqual({
    label: "Degraded",
    summary: "Fixture feed is available with stale residents.",
    lastUpdatedLabel: "Last good update 7m ago",
    fallbackHint: "Using the last normalized snapshot while live polling is unavailable.",
  });
});
