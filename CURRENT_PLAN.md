# Current Plan

## Goal

Prepare an `OpenClaw` live response-envelope seam so fetch results can feed the future response-normalization/execution handoff without performing network calls.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add a typed live response-envelope seam that resolves the current fetch-result output into a normalization-ready handoff record without making network calls
- Preserve the current request metadata, request-descriptor metadata, transport-delegate metadata, fetch-runner metadata, runner-contract metadata, runner-factory metadata, runner-envelope metadata, request-builder metadata, fetch-attempt metadata, fetch-result metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for response-envelope preparation without adding network traffic

## Tasks

- [ ] Add a typed `OpenClaw` live response-envelope record behind the current fetch-result seam
- [ ] Keep preview and future live-capable runners aligned on the same response-envelope input assumptions
- [ ] Keep the current diagnostics and refresh UI compatible with response-envelope metadata
- [ ] Extend tests and governance docs for response-envelope preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a typed live response-envelope seam behind the fetch result without performing network calls
- The existing diagnostics and refresh UI remain compatible with response-envelope metadata
- The next step from response-envelope preparation to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once response-envelope records and endpoint rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
