# Current Plan

## Goal

Prepare the first real `OpenClaw` fetch executor seam without issuing network requests yet.

## In Scope

- Keep the current mock and fixture providers as the only runtime data sources
- Add a typed executor seam that future live `OpenClaw` fetches can plug into after request resolution
- Preserve the current request metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for fetch-executor preparation without adding network traffic

## Tasks

- [ ] Add a typed live-fetch executor contract for future `OpenClaw` providers
- [ ] Keep fixture-backed request metadata aligned with the same executor assumptions
- [ ] Keep the current diagnostics and refresh UI compatible with future executor state metadata
- [ ] Extend tests and governance docs for fetch-executor preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a typed fetch-executor seam without performing real network requests
- The existing diagnostics and refresh UI remain compatible with future executor state metadata
- The next step from executor preparation to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once endpoint and auth rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
