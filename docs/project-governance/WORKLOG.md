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
