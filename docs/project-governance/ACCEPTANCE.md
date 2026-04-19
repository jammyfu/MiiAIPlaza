# Acceptance

## Current Acceptance Targets

- The governance file set exists and is documented from the README.
- `tools/verify.py` succeeds in a non-interactive shell.
- The project has a current implementation plan and a next-plan helper.
- The plaza shell is reachable through `/?plaza=1`.
- The plaza shell supports movement, orbiting the camera, and interaction with residents or hotspots.

## Current Verification Evidence

- `bun test src/providers/mockPlazaPresence.test.ts` passes
- `bun test src/providers/mockPlazaPresence.test.ts src/game/plaza/plazaResidentAvatarAdapter.test.ts` passes
- `python3 -m unittest tools.test_sync_or_queue tools.test_queue_local_git_sync tools.test_verify` passes
- `bun run build.ts --once` passes
- `python3 tools/verify.py` passes

## Completed Slice

- Mock plaza residents now have deterministic Mii avatar mappings.
- The plaza upgrades resident visuals through the Mii render pipeline instead of only using proxy box-body geometry.
- The repository now has ai-analysis-mcp/AegisGraph-style safe sync tooling for direct sync, local queue, local flush, and LaunchAgent install flows.
