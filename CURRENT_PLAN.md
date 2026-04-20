# Current Plan

## Goal

Prepare the first no-network `OpenClaw` fetch executor implementation slice behind the live provider entrypoint.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add the first no-network executor implementation shape behind the typed live provider entrypoint
- Preserve the current request metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for executor implementation preparation without adding network traffic

## Tasks

- [ ] Add the first typed no-network executor implementation behind the `OpenClaw` live provider entrypoint
- [ ] Keep fixture-backed request, executor, normalization, and live-preview seams aligned with the same implementation assumptions
- [ ] Keep the current diagnostics and refresh UI compatible with future executor implementation metadata
- [ ] Extend tests and governance docs for executor implementation preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a typed no-network executor implementation behind the live provider entrypoint
- The existing diagnostics and refresh UI remain compatible with future executor implementation metadata
- The next step from no-network executor implementation to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once endpoint and auth rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
