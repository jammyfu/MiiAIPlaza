# Current Plan

## Goal

Prepare a runner-factory seam for `OpenClaw` so the future live path can swap preview and network-capable runners without changing the transport delegate boundary.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add a runner-factory seam that can choose between preview and future network-capable runners behind the current transport delegate
- Preserve the current request metadata, request-descriptor metadata, transport-delegate metadata, fetch-runner metadata, runner-contract metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for runner-factory preparation without adding network traffic

## Tasks

- [ ] Add a runner-factory seam for the future `OpenClaw` live path behind the current transport delegate
- [ ] Keep preview execution, request metadata, request descriptors, transport delegates, fetch runners, runner contracts, normalization, and live-preview provider seams aligned with that factory seam
- [ ] Keep the current diagnostics and refresh UI compatible with future runner-factory metadata
- [ ] Extend tests and governance docs for runner-factory preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a runner-factory seam behind the transport delegate while still using the preview runner without network calls
- The existing diagnostics and refresh UI remain compatible with future runner-factory metadata
- The next step from runner-factory preparation to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once the runner factory and endpoint rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
