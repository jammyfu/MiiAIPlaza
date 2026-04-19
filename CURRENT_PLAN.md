# Current Plan

## Goal

Introduce an `OpenClaw` presence adapter seam behind the plaza contracts so the client can graduate from mock-only residents toward live provider-backed residents.

## In Scope

- Add a provider-facing adapter interface for turning external status payloads into `PlazaResident[]`
- Add an `OpenClaw` adapter that can normalize fixture data through the same seam
- Preserve the current mock provider and plaza runtime behavior
- Keep verification automation-friendly and fixture-based until live endpoint details are confirmed

## Tasks

- [ ] Add a provider adapter interface for plaza residents and presence snapshots
- [ ] Add an `OpenClaw` adapter that maps fixture payloads into `PlazaResident[]`
- [ ] Keep `Plaza.ts` able to boot with mock data now while making the provider swap explicit
- [ ] Extend tests and documentation for the adapter seam and fixture normalization path

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza still boots with the current mock provider without breaking the existing editor flow
- The repository contains a tested `OpenClaw` adapter that normalizes fixture data through the same client contract as the mock provider
- The next step from fixture data to live provider data is explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- realtime sync
- persistent plaza board and mailbox data
- full animation-state polish for all residents

## Next Candidates

- Add persistent plaza board and mailbox data
- Add proper walk, idle, and emote animation states for residents
- Replace billboard Mii residents with fully embodied 3D Mii bodies
