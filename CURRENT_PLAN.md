# Current Plan

## Goal

Prepare a network-capable `OpenClaw` runner contract that can later replace the preview fetch runner without changing the transport delegate boundary.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add a network-capable runner contract that can sit behind the current transport delegate while the preview runner remains the only implementation
- Preserve the current request metadata, request-descriptor metadata, transport-delegate metadata, fetch-runner metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for network-capable runner-contract preparation without adding network traffic

## Tasks

- [ ] Add a network-capable runner contract for the future `OpenClaw` live path behind the current transport delegate
- [ ] Keep preview execution, request metadata, request descriptors, transport delegates, fetch runners, normalization, and live-preview provider seams aligned with that runner contract
- [ ] Keep the current diagnostics and refresh UI compatible with future runner-contract metadata
- [ ] Extend tests and governance docs for network-capable runner-contract preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a network-capable runner contract behind the transport delegate while still using the preview runner without network calls
- The existing diagnostics and refresh UI remain compatible with future runner-contract metadata
- The next step from runner-contract preparation to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once the network-capable runner contract and endpoint rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
