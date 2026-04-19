# Worklog

## 2026-04-20

- Wrote and approved the Mii Plaza platform design spec.
- Switched active work to `main` and committed the approved design.
- Started Phase 0 governance bootstrap and early Phase 1 plaza shell work.
- Added the project-governance baseline, automation docs, and planning files.
- Added a non-interactive verification path and a next-plan helper.
- Shipped the first `?plaza=1` prototype with third-person movement, camera orbit, resident inspection, and hotspot panels.
- Added `AGENTS.md` and tightened the repository loop so heartbeat automation has a single first-read entrypoint.
- Replaced the old mixed bootstrap/current-slice plan with a narrower single-goal plan for Mii-based resident embodiment.
- Hardened `tools/verify.py` to resolve `bun` from explicit fallback locations for non-interactive automation environments.
- Added a resident avatar adapter with deterministic Mii presets for the mock plaza residents.
- Upgraded plaza residents from colored proxy bodies to Mii-rendered billboard residents while preserving prompts and detail panels.
- Verified the new avatar path with adapter tests, the provider tests, and a one-shot build.
- Studied `ai-analysis-mcp` and `AegisGraph` git submission logic and imported their safe-sync pattern into this repository.
- Added safe sync, local queue, local flush, LaunchAgent install, and git-writable probe tools to support long-running automation.
- Expanded verification to cover the new sync automation tests and documented the preferred submission flow.
- Tightened the automation rule so heartbeat submissions default to `sync_or_queue --prefer-local` instead of generic commit/push wording.
- Added provider-facing plaza contracts for adapter and world-data seams so runtime data can load through explicit providers instead of hardcoded mock calls.
- Added a tested `OpenClaw` fixture adapter and world-data provider that normalize external-style payloads into the shared plaza resident contract.
- Updated `Plaza.ts` to resolve a named provider explicitly, keeping mock boot as the default while enabling fixture-backed provider swaps.
- Advanced `CURRENT_PLAN.md` to the next provider-diagnostics slice after verifying the new adapter seam with the repository standard verification command.
- Added a pure plaza presence diagnostics helper so freshness and stale-state behavior are derived from timestamps instead of hardcoded text.
- Updated mock and fixture providers to emit parseable timestamps and intentionally surface stale cases through the shared diagnostics path.
- Surfaced provider source, resident freshness, and stale-state cues in the plaza HUD and resident inspection flow.
- Advanced `CURRENT_PLAN.md` to a new provider-health slice once diagnostics landed and passed verification.
- Added typed provider health metadata to plaza world sources so providers can describe healthy and degraded states with last-good-update copy.
- Surfaced provider health status, summary, and fallback hints in the plaza HUD without breaking the existing diagnostics UI.
- Kept mock and fixture providers aligned on the same health contract and verified the new copy path with tests plus the standard repository verification command.
- Advanced `CURRENT_PLAN.md` to the next outage-handling slice after provider health landed cleanly.
- Added a typed provider-failure fallback loader so provider exceptions now recover into structured plaza world data instead of a separate error page.
- Taught `Plaza.ts` to route provider failures back into the normal plaza shell, including an inspectable provider status hotspot.
- Extended verification to cover the new fallback loader path and advanced `CURRENT_PLAN.md` to a retry-metadata slice for future live polling work.
- Added retry-oriented provider health metadata so healthy, degraded, and failing sources can all describe recovery timing on the same contract.
- Surfaced retry timing and next-retry copy through the shared plaza health diagnostics helper and HUD provider meta area.
- Kept mock, fixture, and failing fallback providers aligned on the same retry contract, and advanced `CURRENT_PLAN.md` to a follow-up manual retry interaction slice after verification passed.
