# Current Plan

## Goal

Prepare an `OpenClaw` live fetch-result seam so fetch attempts can feed a future transport response path without performing network calls.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add a typed live fetch-result seam that resolves the current fetch-attempt output into a transport-response placeholder record without making network calls
- Preserve the current request metadata, request-descriptor metadata, transport-delegate metadata, fetch-runner metadata, runner-contract metadata, runner-factory metadata, runner-envelope metadata, request-builder metadata, fetch-attempt metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for fetch-result preparation without adding network traffic

## Tasks

- [ ] Add a typed `OpenClaw` live fetch-result record behind the current fetch-attempt seam
- [ ] Keep preview and future live-capable runners aligned on the same fetch-result input assumptions
- [ ] Keep the current diagnostics and refresh UI compatible with fetch-result metadata
- [ ] Extend tests and governance docs for fetch-result preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a typed live fetch-result seam behind the fetch attempt without performing network calls
- The existing diagnostics and refresh UI remain compatible with fetch-result metadata
- The next step from fetch-result preparation to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once fetch-result records and endpoint rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
