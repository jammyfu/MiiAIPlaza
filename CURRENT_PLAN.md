# Current Plan

## Goal

Prepare an `OpenClaw` live fetch-dispatch seam so fetch entries can feed the future actual network invocation boundary without performing network calls.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add a typed live fetch-dispatch seam that resolves the current fetch-entry output into one network-invocation-boundary placeholder record without making network calls
- Preserve the current request metadata, request-descriptor metadata, transport-delegate metadata, fetch-runner metadata, runner-contract metadata, runner-factory metadata, runner-envelope metadata, request-builder metadata, fetch-attempt metadata, fetch-result metadata, response-envelope metadata, normalizer-handoff metadata, execution-payload metadata, execution-bridge metadata, fetch-entry metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for fetch-dispatch preparation without adding network traffic

## Tasks

- [ ] Add a typed `OpenClaw` live fetch-dispatch record behind the current fetch-entry seam
- [ ] Keep preview and future live-capable runners aligned on the same fetch-dispatch input assumptions
- [ ] Keep the current diagnostics and refresh UI compatible with fetch-dispatch metadata
- [ ] Extend tests and governance docs for fetch-dispatch preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a typed live fetch-dispatch seam behind the fetch entry without performing network calls
- The existing diagnostics and refresh UI remain compatible with fetch-dispatch metadata
- The next step from fetch-dispatch preparation to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once fetch-dispatch records and endpoint rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
