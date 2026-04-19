# Current Plan

## Goal

Prepare the plaza for live provider polling by surfacing provider health and fallback behavior alongside the existing diagnostics UI.

## In Scope

- Add provider health metadata so data sources can describe healthy, degraded, or failing states
- Surface provider health and fallback copy in the plaza HUD without breaking the current world loop
- Preserve the current mock and fixture providers while making live-polling handoff explicit
- Extend tests and docs for provider health before network polling is introduced

## Tasks

- [ ] Add provider health metadata to the world-data source contract
- [ ] Surface provider health, last-successful-update copy, and fallback hints in the plaza HUD
- [ ] Keep mock and fixture providers aligned on the same health contract
- [ ] Extend tests and governance docs for provider health and live polling handoff

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The plaza can show whether the selected provider is healthy, degraded, or failing
- The existing diagnostics HUD remains compatible with the provider health layer
- The next step from provider health metadata to live polling remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- realtime sync
- persistent plaza board and mailbox data
- full animation-state polish for all residents

## Next Candidates

- Add persistent plaza board and mailbox data
- Add proper walk, idle, and emote animation states for residents
- Replace billboard Mii residents with fully embodied 3D Mii bodies
