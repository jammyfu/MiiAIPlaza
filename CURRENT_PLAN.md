# Current Plan

## Goal

Expose provider source and freshness diagnostics in the plaza HUD so fixture-backed and future live providers can degrade gracefully.

## In Scope

- Surface the currently selected plaza data provider in the runtime HUD
- Add freshness and staleness derivation from `PlazaPresenceSnapshot.updatedAt`
- Make stale or blocked residents visually legible without breaking the current interaction loop
- Extend tests and docs for provider diagnostics before live polling arrives

## Tasks

- [ ] Add a small provider metadata surface to the plaza shell so users can tell which source hydrated the world
- [ ] Derive resident freshness from `updatedAt` values and classify stale snapshots
- [ ] Reflect blocked or stale state in the resident list and inspection card without disturbing movement flow
- [ ] Extend tests and governance docs for provider diagnostics and future live polling handoff

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The plaza can label which provider source hydrated the current resident view
- Residents with stale fixture timestamps can be detected through the same contract that future live polling will use
- The next step from diagnostics to live provider polling remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- realtime sync
- persistent plaza board and mailbox data
- full animation-state polish for all residents

## Next Candidates

- Add persistent plaza board and mailbox data
- Add proper walk, idle, and emote animation states for residents
- Replace billboard Mii residents with fully embodied 3D Mii bodies
