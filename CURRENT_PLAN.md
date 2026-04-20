# Current Plan

## Goal

Prepare an `OpenClaw` live fetch-execution seam so transport-call records can feed the future actual network execution boundary without performing network calls.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add a typed live fetch-execution seam that resolves the current transport-call output into one network-execution-boundary placeholder record without making network calls
- Preserve the current request metadata, request-descriptor metadata, transport-delegate metadata, fetch-runner metadata, runner-contract metadata, runner-factory metadata, runner-envelope metadata, request-builder metadata, fetch-attempt metadata, fetch-result metadata, response-envelope metadata, normalizer-handoff metadata, execution-payload metadata, execution-bridge metadata, fetch-entry metadata, fetch-dispatch metadata, transport-call metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for fetch-execution preparation without adding network traffic

## Tasks

- [ ] Add a typed `OpenClaw` live fetch-execution record behind the current transport-call seam
- [ ] Keep preview and future live-capable runners aligned on the same fetch-execution input assumptions
- [ ] Keep the current diagnostics and refresh UI compatible with fetch-execution metadata
- [ ] Extend tests and governance docs for fetch-execution preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a typed live fetch-execution seam behind the transport call without performing network calls
- The existing diagnostics and refresh UI remain compatible with fetch-execution metadata
- The next step from fetch-execution preparation to actual live network execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` network execution once fetch-execution records and endpoint rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
