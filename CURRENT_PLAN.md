# Current Plan

## Goal

Prepare an `OpenClaw` live network-execution seam so transport-runner metadata can feed a future injectable fetch implementation without changing the current dry-run plaza behavior.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add an injectable live network-execution seam behind the current transport-runner metadata without making real network calls
- Preserve the current request metadata, request-descriptor metadata, transport-delegate metadata, fetch-runner metadata, runner-contract metadata, runner-factory metadata, runner-envelope metadata, request-builder metadata, fetch-attempt metadata, fetch-result metadata, response-envelope metadata, normalizer-handoff metadata, execution-payload metadata, execution-bridge metadata, fetch-entry metadata, fetch-dispatch metadata, transport-call metadata, fetch-execution metadata, execution-delegate metadata, transport-implementation metadata, transport-runner metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for network-execution preparation without adding network traffic

## Tasks

- [ ] Add an injectable `OpenClaw` live network-execution seam behind the current transport-runner metadata
- [ ] Keep preview and future live-capable runners aligned on the same network-execution input assumptions
- [ ] Keep the current diagnostics and refresh UI compatible while executor posture remains dry-run or preview-only
- [ ] Extend tests and governance docs for network-execution preparation before real HTTP calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path exposes an injectable network-execution seam behind the transport-runner metadata without performing real HTTP requests
- The existing diagnostics and refresh UI remain compatible while the live path stays dry-run or preview-only
- The next step from no-network execution preparation to actual live HTTP execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` network execution once the injectable network-execution seam and endpoint rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
