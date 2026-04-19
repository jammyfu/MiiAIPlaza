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

### Use thread heartbeat automation for continuous推进

Decision:
Use a heartbeat automation attached to the current thread every 10 minutes instead of a separate cron conversation.

Why:
The work benefits from preserving conversation context, current-plan state, and ongoing repository decisions in one place.

### Use Mii-rendered billboards as the first resident embodiment step

Decision:
Represent plaza residents with renderer-backed Mii billboards before attempting full 3D embodied resident bodies.

Why:
This upgrades the plaza from placeholder proxy geometry to recognizable Mii presence using the existing rendering stack, while keeping the current interaction loop stable and the implementation scope small.

### Reuse the ai-analysis-mcp and AegisGraph safe-sync pattern

Decision:
Adopt the same `check_git_writable -> git_safe_sync` primary path plus `sync_or_queue -> queue_local_git_sync -> local_git_flush` fallback path used in `ai-analysis-mcp` and `AegisGraph`.

Why:
This repository now relies on heartbeat-style automation, so it benefits from a submission path that can safely commit and push when `.git` is writable, but can also queue a local terminal sync request instead of getting stuck in restricted environments.
