# Changelog

## 2026-04-20

- Added the Mii Plaza platform design spec.
- Added standard governance and automation documentation.
- Added a non-interactive verification and next-plan toolchain.
- Began Phase 1 work on a playable plaza shell with mock presence.
- Added a plaza route entrypoint at `/?plaza=1` and a library button to enter it.
- Added typed plaza contracts plus a tested mock resident and hotspot provider.
- Added a third-person Three.js plaza prototype with resident inspection and mobile-safe touch controls.
- Added `AGENTS.md` and aligned the repository with the continuous project loop entry rules.
- Hardened the verification script for automation-friendly `bun` resolution.
- Added a resident avatar adapter and Mii-driven billboard residents for the plaza prototype.
- Added safe-sync automation tools and tests modeled after `ai-analysis-mcp` and `AegisGraph`, including queued local git sync fallback support.
- Updated the automation guidance so heartbeat runs default to the queued local safe-sync path instead of raw commit/push behavior.
- Added explicit plaza world-data provider contracts plus a tested `OpenClaw` fixture adapter behind the shared resident contract.
- Updated the plaza page to choose its data source through a provider seam while keeping mock boot as the default path.
- Added shared plaza freshness diagnostics, timestamp-based stale detection, and provider source cues in the plaza HUD and resident inspection panels.
- Added typed provider health metadata to plaza data sources and surfaced health summaries plus fallback hints in the plaza HUD.
- Added typed fallback plaza world data for provider failures so outages stay inside the normal plaza shell instead of switching to a separate error page.
- Added retry-oriented provider health metadata and surfaced retry timing in plaza health copy.
- Added a shared `Provider Status` hotspot so provider retry guidance is inspectable in both normal and failure fallback plaza shells.
- Added a typed plaza world-data controller so future manual refresh and live polling can reuse the same provider-boundary load path.
- Added the first player-facing `Refresh Provider` action and aligned provider-status inspection with the same refresh boundary.
- Added typed polling-plan metadata so the plaza can describe future scheduled refresh posture without starting background timers.
- Added typed live-request metadata for `OpenClaw` so future endpoint/auth setup is visible in plaza diagnostics before real fetches exist.
- Added a typed `OpenClaw` endpoint/auth override resolver so future live request setup flows through one normalized provider-layer seam.
