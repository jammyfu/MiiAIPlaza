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

### Make `sync_or_queue --prefer-local` the default heartbeat submission path

Decision:
Heartbeat automation should default to `python3 tools/sync_or_queue.py --message "<stable-closure>" --prefer-local` instead of generic raw git commands.

Why:
The key lesson from `ai-analysis-mcp` and `AegisGraph` is not just the presence of helper scripts, but that automation should proactively choose the queueable local-terminal path to avoid `.git` write assumptions and to keep long-running loops stable.

### Make plaza data providers explicit at the page boundary

Decision:
Load plaza residents and hotspots through explicit `PlazaWorldDataProvider` instances selected in `Plaza.ts`, with `mock` as the default and `openclaw-fixture` as the first alternate source.

Why:
This keeps the world runtime insulated from provider-specific payload shapes, lets fixture-backed adapters prove the contract before live network fetches exist, and gives the next live polling step a single page-boundary seam instead of scattered mock imports.

### Derive freshness from timestamps instead of provider prose

Decision:
Use a shared plaza diagnostics helper to classify resident freshness from `updatedAt` timestamps, and update mock/fixture providers so they emit parseable ISO timestamps instead of human-only relative strings.

Why:
Future live polling needs machine-readable freshness rules, not provider-specific prose. Moving the logic into a shared helper keeps stale-state behavior consistent across providers and lets the HUD reflect diagnostics without knowing where the snapshot came from.
