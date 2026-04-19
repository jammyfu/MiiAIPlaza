# Current Plan

## Goal

Prepare the shared refresh controller for eventual background polling without introducing automatic loops yet.

## In Scope

- Keep the current manual refresh affordance as the canonical reload path
- Add typed metadata or helper seams that make future polling cadence explicit
- Preserve current mock, fixture, and fallback providers while preparing for background reload scheduling
- Extend tests and docs for polling-preparation seams without starting timers

## Tasks

- [ ] Add a polling-preparation seam on top of the shared refresh controller
- [ ] Keep provider-status inspection and HUD copy compatible with both manual refresh and future scheduled refreshes
- [ ] Keep mock, fixture, and fallback providers aligned when future background cadence metadata is present
- [ ] Extend tests and governance docs for polling-preparation behavior before automatic timers are introduced

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The manual refresh affordance remains the only user-triggered reload path while future polling cadence is represented through typed seams
- The existing diagnostics shell remains compatible with both current manual refresh and future scheduled refresh metadata
- The next step from manual refresh to real live polling remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
- Add proper walk, idle, and emote animation states for residents
