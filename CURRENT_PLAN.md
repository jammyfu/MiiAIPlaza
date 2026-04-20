# Current Plan

## Goal

Prepare a selectable `OpenClaw` live provider entrypoint without issuing network requests yet.

## In Scope

- Keep the current mock and fixture providers as the only runtime data sources
- Add a typed live-provider entrypoint that can later swap in real fetch execution behind the composed skeleton
- Preserve the current request metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for live-provider entrypoint preparation without adding network traffic

## Tasks

- [ ] Add a typed `OpenClaw` live provider entrypoint that wraps the composed skeleton
- [ ] Keep fixture-backed request, executor, and normalization seams aligned with the same entrypoint assumptions
- [ ] Keep the current diagnostics and refresh UI compatible with future live-provider entrypoint metadata
- [ ] Extend tests and governance docs for live-provider entrypoint preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a typed provider entrypoint without performing real network requests
- The existing diagnostics and refresh UI remain compatible with future live-provider entrypoint metadata
- The next step from provider entrypoint to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once endpoint and auth rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
