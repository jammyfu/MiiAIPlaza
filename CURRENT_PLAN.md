# Current Plan

## Goal

Prepare an `OpenClaw` live execution-payload seam so normalizer handoffs can feed the future no-network/live execution bridge without performing network calls.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add a typed live execution-payload seam that resolves the current normalizer-handoff output into one execution-boundary placeholder record without making network calls
- Preserve the current request metadata, request-descriptor metadata, transport-delegate metadata, fetch-runner metadata, runner-contract metadata, runner-factory metadata, runner-envelope metadata, request-builder metadata, fetch-attempt metadata, fetch-result metadata, response-envelope metadata, normalizer-handoff metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for execution-payload preparation without adding network traffic

## Tasks

- [ ] Add a typed `OpenClaw` live execution-payload record behind the current normalizer-handoff seam
- [ ] Keep preview and future live-capable runners aligned on the same execution-payload input assumptions
- [ ] Keep the current diagnostics and refresh UI compatible with execution-payload metadata
- [ ] Extend tests and governance docs for execution-payload preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a typed live execution-payload seam behind the normalizer handoff without performing network calls
- The existing diagnostics and refresh UI remain compatible with execution-payload metadata
- The next step from execution-payload preparation to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once execution-payload records and endpoint rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
