# Current Plan

## Goal

Prepare the provider boundary for eventual live `OpenClaw` request configuration without issuing real network fetches yet.

## In Scope

- Keep the current mock and fixture providers as the only runtime data sources
- Add typed request-configuration seams that future live `OpenClaw` fetches can plug into
- Preserve the current refresh controller, polling-preparation metadata, and fallback behavior
- Extend tests and docs for live-request preparation without adding network traffic

## Tasks

- [ ] Add a typed live-provider request configuration contract at the provider boundary
- [ ] Keep fixture-backed `OpenClaw` data aligned with the same request-shape assumptions
- [ ] Keep the current diagnostics and refresh UI compatible with future live request metadata
- [ ] Extend tests and governance docs for live-request preparation before real fetches arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a typed request-configuration seam without performing real network fetches
- The existing diagnostics and refresh UI remain compatible with future live-request metadata
- The next step from request configuration to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once endpoint and auth rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
