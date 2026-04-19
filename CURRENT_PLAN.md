# Current Plan

## Goal

Prepare the plaza for eventual live polling by adding typed retry metadata and recovery affordances to provider health.

## In Scope

- Add retry-oriented fields to provider health metadata so the client can describe recovery timing
- Surface retry timing and recovery guidance in the plaza HUD without breaking the current shell
- Keep mock, fixture, and fallback providers aligned on the same recovery contract
- Extend tests and docs for recovery metadata before real network polling is introduced

## Tasks

- [ ] Add retry-oriented metadata to `PlazaWorldDataHealth`
- [ ] Surface retry timing and recovery copy in the plaza HUD
- [ ] Keep mock, fixture, and failing fallback providers aligned on the same recovery contract
- [ ] Extend tests and governance docs for recovery metadata and live polling handoff

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The plaza can describe when a provider should be retried after degraded or failing states
- The existing diagnostics HUD remains compatible with recovery metadata
- The next step from retry metadata to real live polling remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- realtime sync
- persistent plaza board and mailbox data
- full animation-state polish for all residents

## Next Candidates

- Add persistent plaza board and mailbox data
- Add proper walk, idle, and emote animation states for residents
- Replace billboard Mii residents with fully embodied 3D Mii bodies
