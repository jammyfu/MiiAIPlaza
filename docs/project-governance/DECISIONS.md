# Decisions

## 2026-04-20

### Use a layered platform split

Decision:
Keep this repository as the plaza client plane and move presence/social persistence behind contracts.

Why:
The product must support `OpenClaw` first and additional agent providers later without rewriting world-facing systems.

### Keep the current TypeScript + Three.js direction for Phase 1

Decision:
Do not introduce a new engine before the first playable plaza exists.

Why:
The repository already has the right dependencies and rendering context to ship a first shell quickly.
