# Current Plan

## Goal

Prepare `OpenClaw` live response normalization without issuing network requests yet.

## In Scope

- Keep the current mock and fixture providers as the only runtime data sources
- Add a typed normalization seam that future live `OpenClaw` responses can plug into after executor setup
- Preserve the current request metadata, executor metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for response-normalization preparation without adding network traffic

## Tasks

- [ ] Add a typed live-response normalization contract for future `OpenClaw` fetch results
- [ ] Keep fixture-backed payload data aligned with the same normalization assumptions
- [ ] Keep the current diagnostics and refresh UI compatible with future normalization metadata
- [ ] Extend tests and governance docs for response-normalization preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a typed response-normalization seam without performing real network requests
- The existing diagnostics and refresh UI remain compatible with future normalization metadata
- The next step from response normalization to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once endpoint and auth rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
