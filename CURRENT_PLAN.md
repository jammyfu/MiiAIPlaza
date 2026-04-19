# Current Plan

## Goal

Prepare the plaza for eventual live polling by adding a small manual retry affordance and provider status interaction path.

## In Scope

- Add a provider-status interaction path that can surface retry guidance inside the existing plaza shell
- Keep retry-oriented provider health metadata visible from both the HUD and hotspot inspection flow
- Preserve current mock, fixture, and fallback providers while making future manual refresh behavior explicit
- Extend tests and docs for retry affordances before real network polling is introduced

## Tasks

- [ ] Add a provider-status interaction model that can expose retry guidance in the normal inspection card
- [ ] Surface retry metadata consistently between HUD copy and provider-status inspection
- [ ] Keep mock, fixture, and fallback providers aligned on the same interaction contract
- [ ] Extend tests and governance docs for manual retry affordances and live polling handoff

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The plaza can surface retry guidance both in the HUD and through provider-status inspection
- The existing diagnostics shell remains compatible with the retry interaction path
- The next step from manual retry affordances to real live polling remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- realtime sync
- persistent plaza board and mailbox data
- full animation-state polish for all residents

## Next Candidates

- Add persistent plaza board and mailbox data
- Add proper walk, idle, and emote animation states for residents
- Replace billboard Mii residents with fully embodied 3D Mii bodies
