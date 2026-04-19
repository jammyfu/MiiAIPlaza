# Current Plan

## Goal

Turn the plaza prototype from colored proxy residents into a recognizable Mii-driven resident experience without breaking the existing editor flow.

## In Scope

- Replace the current proxy resident meshes in `/?plaza=1` with rendered or renderer-backed Mii residents
- Preserve the current plaza movement, camera, and hotspot interaction loop
- Keep the implementation behind the existing plaza contracts and mock provider seam
- Extend verification only as needed to keep this slice stable

## Tasks

- [ ] Add a resident avatar adapter that maps plaza resident records to renderable Mii data
- [ ] Render at least one resident in the plaza using the Mii pipeline instead of the proxy box-body shell
- [ ] Preserve or restore resident inspection panels and prompt behavior after the renderer swap
- [ ] Update verification, worklog, and changelog evidence for the new resident embodiment path

## Acceptance

- `python3 tools/verify.py` succeeds locally
- Visiting `/?plaza=1` still loads without breaking the existing editor flow
- At least one resident in the plaza is represented through the Mii rendering pipeline rather than the temporary proxy geometry
- Resident interaction prompts and detail panels still work after the renderer change

## Out Of Scope

- live `OpenClaw` integration
- realtime sync
- persistent plaza board and mailbox data
- full animation-state polish for all residents

## Next Candidates

- Introduce a live `OpenClaw` adapter behind the same contracts
- Add persistent plaza board and mailbox data
- Add proper walk, idle, and emote animation states for residents
