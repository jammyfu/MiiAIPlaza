# Acceptance

## Current Acceptance Targets

- The governance file set exists and is documented from the README.
- `tools/verify.py` succeeds in a non-interactive shell.
- The project has a current implementation plan and a next-plan helper.
- The plaza shell is reachable through `/?plaza=1`.
- The plaza shell supports movement, orbiting the camera, and interaction with residents or hotspots.
- The plaza runtime can hydrate residents through an explicit world-data provider seam.
- A fixture-backed `OpenClaw` adapter exists and is covered by automated tests.
- The plaza HUD can identify the active provider feed and resident freshness diagnostics.
- Stale resident snapshots can be detected from timestamps through shared diagnostics helpers.
- The plaza HUD can identify provider health state, summary, and fallback guidance from the world-data source contract.
- Provider load failures can recover into structured fallback plaza world data instead of a separate error screen.
- The plaza can describe retry timing for healthy, degraded, and failing provider states through the shared health contract.

## Current Verification Evidence

- `bun test src/providers/mockPlazaPresence.test.ts src/providers/openClawPresenceAdapter.test.ts src/game/plaza/loadPlazaWorldData.test.ts src/game/plaza/plazaPresenceDiagnostics.test.ts src/game/plaza/plazaResidentAvatarAdapter.test.ts` passes
- `python3 -m unittest tools.test_sync_or_queue tools.test_queue_local_git_sync tools.test_verify` passes
- `bun run build.ts --once` passes
- `python3 tools/verify.py` passes

## Completed Slice

- Mock plaza residents now have deterministic Mii avatar mappings.
- The plaza upgrades resident visuals through the Mii render pipeline instead of only using proxy box-body geometry.
- The repository now has ai-analysis-mcp/AegisGraph-style safe sync tooling for direct sync, local queue, local flush, and LaunchAgent install flows.
- Plaza runtime data now loads through explicit `PlazaWorldDataProvider` seams instead of only hardcoded mock functions.
- A tested `OpenClaw` fixture adapter now normalizes external-style payloads into shared plaza residents and hotspots.
- Plaza HUD now surfaces provider source, resident freshness, and stale-state cues derived from timestamps.
- Plaza world sources now carry typed provider health metadata that the HUD renders directly.
- Provider load failures now recover into a structured plaza shell with a status hotspot instead of a separate error page.
- Provider health metadata now includes retry timing so recovery guidance is consistent across healthy, degraded, and failing states.
