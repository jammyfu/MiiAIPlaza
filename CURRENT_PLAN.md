# Current Plan

## Goal

Prepare a composed `OpenClaw` live provider skeleton without issuing network requests yet.

## In Scope

- Keep the current mock and fixture providers as the only runtime data sources
- Compose the existing request resolver, executor posture, and response normalizer into a typed live-provider skeleton
- Preserve the current request metadata, executor metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for live-provider composition without adding network traffic

## Tasks

- [ ] Add a typed composed live-provider skeleton for future `OpenClaw` fetch execution
- [ ] Keep fixture-backed request, executor, and normalization seams aligned with the same composition assumptions
- [ ] Keep the current diagnostics and refresh UI compatible with future live-provider composition metadata
- [ ] Extend tests and governance docs for live-provider composition before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a typed composed provider skeleton without performing real network requests
- The existing diagnostics and refresh UI remain compatible with future live-provider composition metadata
- The next step from provider composition to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once endpoint and auth rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
