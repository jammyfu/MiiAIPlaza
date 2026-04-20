# Current Plan

## Goal

Prepare the first live-capable `OpenClaw` runner stub and selection policy behind the runner-factory seam without performing network calls.

## In Scope

- Keep the current mock, fixture, and live-preview providers as the only runtime data sources
- Add a live-capable runner stub plus explicit selection policy behind the current runner-factory seam without starting real transport
- Preserve the current request metadata, request-descriptor metadata, transport-delegate metadata, fetch-runner metadata, runner-contract metadata, runner-factory metadata, executor metadata, normalization metadata, refresh controller, polling-plan metadata, and fallback behavior
- Extend tests and docs for live-capable runner-stub preparation without adding network traffic

## Tasks

- [ ] Add a live-capable runner stub behind the current `OpenClaw` runner factory
- [ ] Add an explicit selection policy so preview and future live-capable runners can be chosen without changing the transport delegate seam
- [ ] Keep the current diagnostics and refresh UI compatible with live-capable runner-stub metadata
- [ ] Extend tests and governance docs for live-capable runner-stub preparation before real network calls arrive

## Acceptance

- `python3 tools/verify.py` succeeds locally
- The plaza continues to boot from the current mock provider without breaking the editor flow
- The live `OpenClaw` path has a live-capable runner stub and selection policy behind the runner factory without performing network calls
- The existing diagnostics and refresh UI remain compatible with live-capable runner-stub metadata
- The next step from live-capable runner-stub preparation to actual live fetch execution remains explicit in code and docs

## Out Of Scope

- live network fetches against a real `OpenClaw` endpoint
- actual background timers or interval loops
- realtime sync
- persistent plaza board and mailbox data

## Next Candidates

- Add actual live `OpenClaw` fetch execution once the live-capable runner stub and endpoint rules exist
- Add actual background polling once live endpoint rules exist
- Add persistent plaza board and mailbox data
