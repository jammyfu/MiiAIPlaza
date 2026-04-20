# Current Plan

## Goal

Prepare a typed `OpenClaw` live request-descriptor seam behind the new network-ready executor contract without performing network calls yet.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add a typed live request-descriptor seam that can feed the network-ready executor contract without starting real transport
- Preserve the current request metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for request-descriptor preparation without adding network traffic

## Tasks

- [ ] Add a typed live request descriptor for the future `OpenClaw` fetch path behind the current network-ready executor contract
- [ ] Keep preview execution, request metadata, normalization, and live-preview provider seams aligned with that descriptor
- [ ] Keep the current diagnostics and refresh UI compatible with future request-descriptor metadata
- [ ] Extend tests and governance docs for request-descriptor preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a typed request-descriptor seam feeding the network-ready executor contract without performing network calls
- The existing diagnostics and refresh UI remain compatible with future request-descriptor metadata
- The next step from request-descriptor preparation to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once the request descriptor and transport rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
