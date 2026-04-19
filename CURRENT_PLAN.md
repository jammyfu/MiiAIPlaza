# Current Plan

## Goal

Prepare the plaza for real provider outages by adding a typed failing-provider fallback path instead of the current generic load-error page.

## In Scope

- Add a typed failing-provider result path that still returns structured plaza world data
- Surface failing-provider fallback copy inside the regular plaza HUD instead of replacing the whole page shell
- Preserve the current mock and fixture providers while making outage handling explicit for future live polling
- Extend tests and docs for failing-provider behavior before network polling is introduced

## Tasks

- [ ] Add a failing-provider source shape and fallback world payload
- [ ] Teach `Plaza.ts` to recover into the normal plaza shell for provider failures
- [ ] Surface failing-provider guidance in the HUD and keep controls usable
- [ ] Extend tests and governance docs for outage handling and future live polling handoff

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- A provider failure can still render a structured fallback plaza shell
- The existing diagnostics HUD remains compatible with the failure path
- The next step from typed failure handling to live polling remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- realtime sync
- persistent plaza board and mailbox data
- full animation-state polish for all residents

## Next Candidates

- Add persistent plaza board and mailbox data
- Add proper walk, idle, and emote animation states for residents
- Replace billboard Mii residents with fully embodied 3D Mii bodies
