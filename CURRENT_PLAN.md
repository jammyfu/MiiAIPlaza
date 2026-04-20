# Current Plan

## Goal

Prepare the first network-ready `OpenClaw` executor contract without performing network calls yet.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add a network-ready executor contract that can later swap in real transport behind the existing preview executor
- Preserve the current request metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for network-ready executor preparation without adding network traffic

## Tasks

- [ ] Add a typed network-ready executor contract for future `OpenClaw` transport implementations
- [ ] Keep preview, request, normalization, and live-preview seams aligned with the same executor-contract assumptions
- [ ] Keep the current diagnostics and refresh UI compatible with future network-ready executor metadata
- [ ] Extend tests and governance docs for executor-contract preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a typed network-ready executor contract without performing network calls
- The existing diagnostics and refresh UI remain compatible with future executor-contract metadata
- The next step from executor contract to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once endpoint and auth rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
