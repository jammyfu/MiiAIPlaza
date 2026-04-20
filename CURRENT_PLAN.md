# Current Plan

## Goal

Prepare an `OpenClaw` live fetch-adapter seam so the new transport-callable layer can hand resolved request metadata into a future concrete fetch implementation without changing the current dry-run plaza behavior.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add a future-facing fetch-adapter seam behind the current transport-callable handler without making real network calls
- Preserve the current request metadata, request-descriptor metadata, transport-delegate metadata, fetch-runner metadata, runner-contract metadata, runner-factory metadata, runner-envelope metadata, request-builder metadata, fetch-attempt metadata, fetch-result metadata, response-envelope metadata, normalizer-handoff metadata, execution-payload metadata, execution-bridge metadata, fetch-entry metadata, fetch-dispatch metadata, transport-call metadata, fetch-execution metadata, execution-delegate metadata, transport-implementation metadata, transport-runner metadata, network-execution metadata, request-dispatch metadata, HTTP-bridge metadata, transport-callable metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for fetch-adapter preparation without adding network traffic

## Tasks

- [ ] Add a future-facing `OpenClaw` live fetch-adapter seam behind the current transport-callable metadata
- [ ] Keep preview and future live-capable runners aligned on the same fetch-adapter input assumptions
- [ ] Keep the current diagnostics and refresh UI compatible while transport calling remains preview-only or dry-run
- [ ] Extend tests and governance docs for fetch-adapter preparation before real HTTP calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path exposes a future-facing fetch-adapter seam behind the transport-callable metadata without performing real HTTP requests
- The existing diagnostics and refresh UI remain compatible while the live path stays dry-run or preview-only
- The next step from fetch-adapter preparation to actual live HTTP execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` network execution once the fetch-adapter seam and endpoint rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
