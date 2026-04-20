# Current Plan

## Goal

Prepare an `OpenClaw` live request-builder seam so runner envelopes can resolve into concrete fetch-ready inputs without performing network calls.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add a typed live request-builder seam that resolves the current runner envelope into concrete request URL, method, and header metadata without making network calls
- Preserve the current request metadata, request-descriptor metadata, transport-delegate metadata, fetch-runner metadata, runner-contract metadata, runner-factory metadata, runner-envelope metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for request-builder preparation without adding network traffic

## Tasks

- [ ] Add a typed `OpenClaw` live request builder behind the current runner-envelope seam
- [ ] Keep preview and future live-capable runners aligned on the same request-builder output assumptions
- [ ] Keep the current diagnostics and refresh UI compatible with request-builder metadata
- [ ] Extend tests and governance docs for request-builder preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a typed live request-builder seam behind the runner envelope without performing network calls
- The existing diagnostics and refresh UI remain compatible with request-builder metadata
- The next step from request-builder preparation to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once the request builder and endpoint rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
