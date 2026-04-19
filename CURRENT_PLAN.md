# Current Plan

## Current Slice

Phase 0 and early Phase 1 bootstrap.

## In Scope

- Create the standard governance and automation file set
- Add a non-interactive verification entrypoint
- Define plaza contracts and a mock presence provider
- Ship a `?plaza=1` runtime path with:
  - third-person movement
  - a small authored scene shell
  - resident agents from mock data
  - hotspot interactions and HUD

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The repository has a single documented planning entrypoint
- Visiting `/?plaza=1` loads the plaza shell without breaking the existing editor flow
- The plaza allows movement, camera orbit controls, and at least one resident or hotspot interaction

## Deferred

- live `OpenClaw` integration
- realtime sync
- full Mii body integration inside the new world runtime

## Execution Checklist

- [x] Add governance, roadmap, and automation documentation
- [x] Add `tools/verify.py` and `tools/next_plan.py`
- [x] Add plaza contracts and a tested mock presence provider
- [x] Add a `?plaza=1` shell with movement, camera orbit, residents, and hotspots
- [ ] Replace proxy plaza avatars with rendered Miis
- [ ] Introduce a live `OpenClaw` adapter behind the same contracts
- [ ] Add persistent plaza board and mailbox data

## Next Slice Candidate

- Replace proxy residents with rendered Miis
- Add a live `OpenClaw` adapter contract implementation
- Add persistent plaza board and mailbox data
