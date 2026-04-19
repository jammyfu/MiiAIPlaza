# Current Plan

## Goal

Wire the first manual provider refresh affordance onto the existing provider-status interaction path.

## In Scope

- Expose the new provider-boundary refresh controller through a player-facing interaction surface
- Keep the current provider-status hotspot and HUD copy as the anchor for reload guidance
- Preserve current mock, fixture, and fallback providers while preparing for future live polling
- Extend tests and docs for the first refresh affordance before automatic polling is introduced

## Tasks

- [ ] Add a minimal manual refresh affordance that reuses the provider-boundary controller
- [ ] Keep provider-status inspection and HUD copy aligned with the same refresh entrypoint
- [ ] Keep mock, fixture, and fallback providers aligned when refresh is invoked repeatedly
- [ ] Extend tests and governance docs for manual refresh behavior before live polling arrives

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The plaza can trigger a manual refresh through the new provider-boundary controller without replacing the shell contract
- The existing diagnostics shell remains compatible with the first refresh affordance
- The next step from a manual refresh affordance to real live polling remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- background automatic polling loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add background polling on top of the refresh controller once live endpoint rules exist
- Add persistent plaza board and mailbox data
- Add proper walk, idle, and emote animation states for residents
