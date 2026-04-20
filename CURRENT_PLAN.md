# Current Plan

## Goal

Prepare a typed `OpenClaw` transport-delegate seam that consumes the live request descriptor without performing network calls yet.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add a typed transport-delegate seam that can consume the live request descriptor behind the network-ready executor contract without starting real transport
- Preserve the current request metadata, request-descriptor metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for transport-delegate preparation without adding network traffic

## Tasks

- [ ] Add a typed transport delegate for the future `OpenClaw` fetch path behind the current network-ready executor contract
- [ ] Keep preview execution, request metadata, request descriptors, normalization, and live-preview provider seams aligned with that delegate
- [ ] Keep the current diagnostics and refresh UI compatible with future transport-delegate metadata
- [ ] Extend tests and governance docs for transport-delegate preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a typed transport-delegate seam consuming the request descriptor behind the network-ready executor contract without performing network calls
- The existing diagnostics and refresh UI remain compatible with future transport-delegate metadata
- The next step from transport-delegate preparation to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once the transport delegate and endpoint rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
