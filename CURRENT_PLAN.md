# Current Plan

## Goal

Prepare an `OpenClaw` runner request-envelope seam so future live-capable runners can consume one normalized input shape without performing network calls.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add a runner request-envelope seam so preview and future live-capable runners can consume one normalized input shape behind the current runner-factory seam
- Preserve the current request metadata, request-descriptor metadata, transport-delegate metadata, fetch-runner metadata, runner-contract metadata, runner-factory metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for runner-envelope preparation without adding network traffic

## Tasks

- [ ] Add a typed runner request envelope behind the current `OpenClaw` runner factory
- [ ] Keep preview and future live-capable runners aligned on the same runner-envelope input assumptions
- [ ] Keep the current diagnostics and refresh UI compatible with runner-envelope metadata
- [ ] Extend tests and governance docs for runner-envelope preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a typed runner request-envelope seam behind the runner factory without performing network calls
- The existing diagnostics and refresh UI remain compatible with runner-envelope metadata
- The next step from runner-envelope preparation to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once the runner request envelope and endpoint rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
