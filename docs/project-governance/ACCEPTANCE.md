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
- `bun run build.ts --once` passes
- `python3 tools/verify.py` passes

## Completed Slice

- Mock plaza residents now have deterministic Mii avatar mappings.
- The plaza upgrades resident visuals through the Mii render pipeline instead of only using proxy box-body geometry.
