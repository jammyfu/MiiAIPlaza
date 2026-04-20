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

### Put provider health on the source contract, not in ad-hoc UI state

Decision:
Represent provider health directly on `PlazaWorldDataSource` with typed healthy/degraded/failing metadata and let the HUD render from that contract.

Why:
Live polling will need a stable way to report degraded or failing provider states even when resident data is partial or stale. Keeping health on the source contract prevents the page layer from inventing provider-specific heuristics and keeps fallback behavior explicit.

### Recover provider failures into structured plaza world data

Decision:
When a provider throws during load, convert that failure into typed fallback `PlazaWorldData` and keep rendering through the normal plaza shell instead of swapping to a separate full-page error state.

Why:
This keeps outage handling on the same contract path as normal and degraded provider states, preserves the player-facing shell, and makes future live polling recovery behavior easier to reason about and test.

### Keep provider retry timing on the health contract

Decision:
Represent retry timing directly on `PlazaWorldDataHealth` using typed retry fields rather than inventing separate UI-only countdown logic.

Why:
Future live polling will need both background retries and user-facing recovery guidance. Keeping retry timing on the shared health contract lets the HUD, fallback shells, and future interaction surfaces stay consistent without duplicating recovery rules.

### Keep provider status inspection on the world-data path

Decision:
Expose provider retry guidance through a shared `Provider Status` hotspot that is injected for both successful and failing provider loads, instead of only showing retry copy in top-level HUD chrome.

Why:
This keeps recovery guidance available through the same interaction model as the rest of the plaza, avoids a failure-only special case, and gives future manual refresh behavior a natural interaction anchor.

### Add refresh control at the provider boundary before wiring UI actions

Decision:
Introduce a typed world-data controller that distinguishes `initial` and `manual-refresh` loads at the page boundary, while still returning the same world-data shape to the plaza shell.

Why:
This keeps provider refresh behavior explicit before a player-facing button exists, preserves the current shell contract, and gives future manual refresh or live polling work a single reusable seam instead of ad-hoc reload calls.

### Keep manual refresh orchestration at the page boundary

Decision:
Let `Plaza.ts` own refresh-triggered re-rendering through the shared controller, while `createPlazaExperience` only exposes a lightweight `onRefresh` affordance and matching HUD/detail copy.

Why:
This keeps WebGL runtime changes minimal, reuses the same provider-loading and fallback path for both initial and manual loads, and gives future scheduled polling a single orchestration point outside the scene implementation.

### Represent future polling as typed cadence metadata before adding timers

Decision:
Expose a typed polling plan from the shared world-data controller and render that plan in the HUD and provider-status details, instead of starting real intervals now.

Why:
This keeps the current manual refresh path canonical while making future scheduled refresh behavior explicit and testable. When live polling arrives, it can reuse the same cadence contract instead of inventing timer rules in the page or scene layers.

### Put live-request metadata on the shared source contract before adding fetches

Decision:
Represent future `OpenClaw` live-request posture directly on `PlazaWorldDataSource` through typed request metadata and surface it through HUD/status diagnostics before any real HTTP calls exist.

Why:
This keeps live-provider setup explicit and testable, aligns fixture-backed data with future request-shape assumptions, and prevents the eventual live fetch path from smuggling endpoint/auth concerns into ad-hoc page state.

### Normalize `OpenClaw` endpoint and auth overrides through one resolver

Decision:
Resolve future `OpenClaw` endpoint/auth overrides through a single typed provider-layer helper and reuse that helper for fixture-backed request metadata.

Why:
This keeps override precedence explicit before live fetches exist, avoids multiple partial interpretations of endpoint/auth setup, and gives the future live executor one canonical source of request configuration truth.

### Put executor posture on request metadata before adding network calls

Decision:
Represent future live-fetch executor posture directly on `PlazaWorldDataRequest` and render it through HUD/provider-status diagnostics before any real HTTP execution exists.

Why:
This makes the executor seam explicit and testable, keeps dry-run versus live-ready behavior visible without network traffic, and gives the eventual live provider implementation a stable place to expose execution readiness.

### Normalize future live `OpenClaw` responses into the fixture shape first

Decision:
Map future live `OpenClaw` response payloads into the existing fixture payload shape before they enter the shared adapter and world-data path.

Why:
This keeps the current runtime contracts stable, lets future live fetch work reuse the same downstream path as fixture data, and prevents the page/runtime layers from depending on raw external payload structure.

### Compose the live provider from reusable provider-layer seams

Decision:
Represent the future live `OpenClaw` provider as a composition of request resolution, executor posture, response normalization, and world-data hydration helpers before adding network calls.

Why:
This keeps the eventual live provider implementation thin, makes each pre-network seam independently testable, and ensures live data will reuse the same downstream contract path already proven by fixture data.

### Add the live provider as a selectable entrypoint before real execution

Decision:
Expose a selectable `openclaw-live-preview` provider entrypoint that advertises `mode: live` while still routing through the composed no-network provider skeleton.

Why:
This lets the page layer exercise the future live-provider branch without introducing fetch behavior yet, keeps provider selection explicit, and gives later executor work a stable live-mode entrypoint instead of retrofitting one after the fact.

### Route live-preview loading through an explicit preview executor

Decision:
Represent the current no-network `OpenClaw` live-preview step as a typed executor function that takes resolved request metadata and returns preview payloads.

Why:
This turns the live-preview path into a true execution seam instead of a direct helper call, which makes the future jump to real transport execution smaller and keeps provider composition honest about where execution begins.

### Make the `OpenClaw` executor seam network-ready and async before transport arrives

Decision:
Wrap the current preview execution path in a typed async executor contract that future live transport implementations can share, instead of keeping preview execution as a special synchronous helper.

Why:
Real network fetches will need an async execution boundary. Moving the preview path onto that same contract now keeps the live-preview provider honest about the future execution model and shrinks the eventual transport swap to a provider-layer implementation detail.
