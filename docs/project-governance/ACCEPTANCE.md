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
- The plaza exposes provider retry guidance through a shared `Provider Status` hotspot in both success and failure paths.
- The plaza page owns a typed initial-load and manual-refresh controller at the provider boundary without changing the shell contract.
- The plaza now exposes a player-facing manual refresh affordance that reuses the shared controller and keeps provider-status inspection aligned.
- The plaza controller now exposes typed polling-plan metadata so future scheduled refreshes can reuse the current refresh boundary without adding timers yet.
- The plaza source contract now carries typed live-request metadata so future `OpenClaw` endpoint/auth setup is visible without making network calls.
- The `OpenClaw` provider now resolves typed endpoint/auth overrides through a single helper before any live fetch execution exists.
- The `OpenClaw` request seam now carries typed executor posture so future live fetch readiness is visible without making network calls.
- The `OpenClaw` provider now has a typed live response normalizer that feeds future payloads back into the existing fixture-backed contract path.
- The `OpenClaw` provider now has a composed live-provider skeleton that wires together request, executor, normalization, and world-data seams without network traffic.
- The plaza now has a selectable `OpenClaw` live-preview provider entrypoint that exercises the live-mode branch without network calls.
- The `OpenClaw` live-preview path now uses a typed no-network executor step instead of calling preview payload helpers directly.
- The `OpenClaw` live-preview path now runs through a typed network-ready async executor contract that future live transport implementations can share.
- The shared `OpenClaw` request contract now carries a typed live request descriptor that diagnostics and provider status can surface before real transport exists.
- The `OpenClaw` live-preview path now routes through a typed transport delegate that consumes the request descriptor before returning preview payloads.
- The `OpenClaw` live-preview transport delegate now calls through an injected preview fetch runner instead of generating payloads inline.

## Current Verification Evidence

- `bun test src/providers/mockPlazaPresence.test.ts src/providers/openClawPresenceAdapter.test.ts src/game/plaza/createPlazaWorldDataController.test.ts src/game/plaza/loadPlazaWorldData.test.ts src/game/plaza/plazaPresenceDiagnostics.test.ts src/game/plaza/plazaRefreshUi.test.ts src/game/plaza/plazaResidentAvatarAdapter.test.ts` passes
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
- Provider loads now upsert a shared `Provider Status` hotspot so inspection-driven recovery guidance works in both success and failure paths.
- The plaza page now loads provider data through a typed controller that can distinguish initial load and manual refresh triggers while reusing the same fallback behavior.
- The plaza HUD now exposes a `Refresh Provider` action, and the provider-status inspection path reflects the same refresh boundary.
- The plaza HUD and provider-status inspection now expose typed polling-posture copy derived from the shared controller cadence plan.
- The `OpenClaw` fixture source now exposes typed live-request metadata, and provider diagnostics render that request posture without requiring a real endpoint.
- The `OpenClaw` request seam now has a dedicated override resolver so future live executors can consume one normalized endpoint/auth configuration path.
- The plaza HUD and provider-status diagnostics now expose typed `OpenClaw` executor posture without requiring a real fetch implementation.
- Future live `OpenClaw` responses can now normalize into the existing fixture payload shape and hydrate through the current adapter/world-data path.
- The future live `OpenClaw` path now has a composed provider skeleton that reuses the existing fixture-backed contract path end to end.
- The page can now select a live-mode `OpenClaw` provider entrypoint while still reusing the composed no-network provider skeleton.
- The live-preview provider now executes through a typed preview executor that accepts resolved request metadata and returns preview payloads.
- The live-preview provider now awaits a typed network-ready async executor contract instead of relying on a synchronous special-case helper.
- The `OpenClaw` request seam now resolves a typed request descriptor so future transport work can consume request method/path/query/auth posture directly.
- The network-ready executor now reuses a named preview transport delegate so future injected fetch runners can slot in behind the same delegate boundary.
- The preview transport delegate now reuses a named preview fetch runner so future network-capable runners can swap in behind the same transport boundary.
