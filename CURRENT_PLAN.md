# Current Plan

## Goal

Prepare the plaza for eventual live polling by adding a lightweight manual refresh hook at the provider boundary.

## In Scope

- Add a client-side refresh hook at the provider-loading boundary
- Keep the current provider-status interaction path intact while making reload behavior explicit
- Preserve current mock, fixture, and fallback providers while preparing for future live polling
- Extend tests and docs for manual refresh hooks before real network polling is introduced

## Tasks

- [ ] Add a refresh-oriented loader hook that can be called without replacing the plaza shell contract
- [ ] Keep provider-status inspection compatible with future manual refresh affordances
- [ ] Keep mock, fixture, and fallback providers aligned on the same reload boundary
- [ ] Extend tests and governance docs for refresh hooks and live polling handoff

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The plaza has a typed boundary where future manual refresh can re-load provider data
- The existing diagnostics shell remains compatible with the refresh hook
- The next step from a refresh hook to real live polling remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- realtime sync
- persistent plaza board and mailbox data
- full animation-state polish for all residents

## Next Candidates

- Add persistent plaza board and mailbox data
- Add proper walk, idle, and emote animation states for residents
- Replace billboard Mii residents with fully embodied 3D Mii bodies
