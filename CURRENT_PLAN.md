# Current Plan

## Goal

Prepare an injected `OpenClaw` fetch-runner seam behind the transport delegate without performing network calls yet.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add an injected fetch-runner seam that can sit behind the current transport delegate without starting real transport
- Preserve the current request metadata, request-descriptor metadata, transport-delegate metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for fetch-runner preparation without adding network traffic

## Tasks

- [ ] Add an injected fetch runner for the future `OpenClaw` live path behind the current transport delegate
- [ ] Keep preview execution, request metadata, request descriptors, transport delegates, normalization, and live-preview provider seams aligned with that fetch-runner seam
- [ ] Keep the current diagnostics and refresh UI compatible with future fetch-runner metadata
- [ ] Extend tests and governance docs for fetch-runner preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has an injected fetch-runner seam behind the transport delegate without performing network calls
- The existing diagnostics and refresh UI remain compatible with future fetch-runner metadata
- The next step from fetch-runner preparation to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once the injected fetch runner and endpoint rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
