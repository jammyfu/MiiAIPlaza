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

### Put a typed live request descriptor on the shared `OpenClaw` request contract

Decision:
Resolve a typed request descriptor alongside the existing `OpenClaw` request metadata and carry it through diagnostics before any transport delegate or real network call exists.

Why:
The future fetch path needs more than endpoint/auth prose: it needs a stable description of method, path, query, accepted content type, and auth-header posture. Putting that shape on the shared request contract now keeps the next transport-delegate slice focused on execution instead of rediscovering request composition rules.

### Route preview execution through a named transport delegate before adding a fetch runner

Decision:
Represent the current no-network `OpenClaw` preview path as a named transport delegate that consumes the shared request descriptor and is then invoked by the async executor contract.

Why:
This keeps the future live transport swap one layer smaller. The next slice can introduce an injected fetch runner behind a transport delegate instead of mixing transport concerns directly into the executor contract or request resolver.

### Inject preview payload generation through a fetch runner seam

Decision:
Move preview payload generation behind a dedicated fetch-runner seam and make the transport delegate call that runner instead of constructing preview payloads directly.

Why:
This preserves the new transport delegate boundary while creating the exact replacement point future live network runners will need. The next runner-contract slice can now focus on describing live-capable execution semantics instead of first untangling payload generation from the delegate layer.

### Make the preview fetch runner declare the future live-runner contract now

Decision:
Extend the current preview fetch runner metadata so it explicitly declares it is a preview-mode implementation of a network-capable runner contract.

Why:
This keeps the future live-runner swap additive instead of structural. A later network-capable implementation can reuse the same request and delegate seams, while diagnostics already know how to describe contract posture instead of only one-off preview behavior.

### Put execution-boundary payload posture on the shared request contract before real live execution exists

Decision:
Resolve a typed execution-payload record from the current normalizer-handoff seam and surface it through the shared request contract before any real live execution bridge or network call is introduced.

Why:
This keeps the final handoff into future live execution explicit and testable, lets preview and live-capable stub runners share one execution-boundary placeholder shape, and prevents the later live-execution slice from having to rediscover how normalized payload posture should cross the provider boundary.

### Put fetch-call bridge posture on the shared request contract before real live fetches exist

Decision:
Resolve a typed execution-bridge record from the current execution-payload seam and surface it through the shared request contract before any real live fetch call is introduced.

Why:
This keeps the final bridge into actual live fetch execution explicit and testable, lets preview and live-capable stub runners share one fetch-call-boundary placeholder shape, and prevents the later networked slice from having to rediscover how execution payload posture should cross into the eventual fetch entrypoint.

### Put fetch-entry posture on the shared request contract before real network invocation exists

Decision:
Resolve a typed fetch-entry record from the current execution-bridge seam and surface it through the shared request contract before any real network invocation is introduced.

Why:
This keeps the last no-network handoff into live fetch execution explicit and testable, lets preview and live-capable stub runners share one fetch-call placeholder shape, and prevents the later transport slice from having to reconstruct how bridge posture should map into the actual fetch call boundary.

### Normalize runner inputs into a shared request envelope before concrete request building

Decision:
Represent preview and future live-capable runner inputs as one typed runner request envelope on the shared `OpenClaw` request contract before adding concrete request-builder logic.

Why:
This keeps runner selection additive behind the factory seam, gives diagnostics one stable place to describe runner-consumable input posture, and lets the next request-builder slice focus on translating one normalized shape into fetch-ready inputs instead of re-deriving request state in multiple runner implementations.

### Resolve request builders from runner envelopes before adding transport attempts

Decision:
Represent concrete `OpenClaw` request URL, method, and header posture as a typed request-builder artifact derived from the shared runner envelope, and carry that builder on the shared request contract before adding fetch-attempt execution.

Why:
This keeps the runner envelope focused on normalized intent while giving future transport work one fetch-ready shape to consume. Diagnostics can now show the exact future request posture without forcing preview runners or page code to reconstruct URL and header rules ad hoc.

### Resolve fetch attempts from request builders before transport results exist

Decision:
Represent the next transport-consumable `OpenClaw` input as a typed fetch-attempt record derived from the shared request builder, and carry that attempt on the shared request contract before adding any live response or network execution logic.

Why:
This keeps request building and transport execution separated by one explicit seam. Future runners can consume a stable attempt shape, while diagnostics and HUD surfaces can show the exact pre-execution transport input without implying that a network call already happened.

### Resolve fetch results from attempts before normalization handoff exists

Decision:
Represent the immediate post-attempt `OpenClaw` state as a typed fetch-result record derived from the shared fetch-attempt seam, and carry that result on the shared request contract before adding normalization-handoff or real network response plumbing.

Why:
This keeps pre-execution transport input separate from post-attempt response posture. Future live execution can move from attempt to result without redesigning diagnostics, while the current preview path can already expose whether a result is just a placeholder preview payload or a live-ready waiting state.

### Resolve response envelopes from fetch results before normalizer handoff exists

Decision:
Represent the normalization-ready `OpenClaw` handoff as a typed response-envelope record derived from the shared fetch-result seam, and carry that envelope on the shared request contract before adding a concrete normalization-boundary handoff object.

Why:
This keeps placeholder transport results separate from the next normalization stage. Future live execution can move from result to normalization handoff without refactoring runners or diagnostics, while the current preview path can already describe what normalization target would receive the payload.

### Resolve normalizer handoffs from response envelopes before execution payloads exist

Decision:
Represent the next execution-boundary `OpenClaw` state as a typed normalizer-handoff record derived from the shared response-envelope seam, and carry that handoff on the shared request contract before wiring any concrete execution payload or live transport execution step.

Why:
This keeps normalization-target posture separate from the next execution-boundary shape. Future live execution can move from normalization handoff to execution payload without redesigning diagnostics or runner seams, while the current preview path can already describe what the normalization boundary would hand forward.

### Select fetch runners through a factory before introducing live-capable implementations

Decision:
Introduce a dedicated fetch-runner factory so the executor contract obtains the current preview runner through an explicit selection seam instead of constructing it directly.

Why:
The next step will add a live-capable runner stub. Putting selection behind a factory now means that new runner can be introduced as a policy choice, not as a structural rewrite of the executor or transport delegate layers.

### Use a live-capable stub before real network fetch execution exists

Decision:
When `OpenClaw` requests are marked `liveEnabled`, have the runner factory select a live-mode stub runner that still returns preview payloads instead of attempting network access.

Why:
This lets the live path exercise runner selection and diagnostics honestly before real transport exists, while keeping the actual fetch boundary unchanged and safe in restricted environments.

### Resolve transport-call records from fetch-dispatch metadata before real network calls exist

Decision:
Represent the next transport-invocation-boundary `OpenClaw` state as a typed transport-call record derived from the shared fetch-dispatch seam, and carry that record on the shared request contract before wiring any concrete live fetch implementation.

Why:
This keeps the network-invocation posture separate from the eventual fetch implementation while giving preview and future live-capable runners one stable transport-call handoff shape. Diagnostics can describe what would be invoked next without implying that a real network request has already started.

### Resolve fetch-execution records from transport-call metadata before real network execution exists

Decision:
Represent the next network-execution-boundary `OpenClaw` state as a typed fetch-execution record derived from the shared transport-call seam, and carry that record on the shared request contract before wiring any concrete live network execution implementation.

Why:
This keeps transport-invocation posture separate from the eventual execution step while giving preview and future live-capable runners one stable execution handoff shape. Diagnostics can describe the next executable boundary without implying that a real network call has already been performed.

### Resolve execution-delegate records from fetch-execution metadata before real transport implementation exists

Decision:
Represent the next transport-implementation-boundary `OpenClaw` state as a typed execution-delegate record derived from the shared fetch-execution seam, and carry that record on the shared request contract before wiring any concrete live network transport implementation.

Why:
This keeps the executable network posture separate from the eventual transport implementation while giving preview and future live-capable runners one stable delegate handoff shape. Diagnostics can show which transport boundary would receive control next without implying that a real network implementation has been invoked.

### Resolve transport-implementation records from execution-delegate metadata before real network runners exist

Decision:
Represent the next network-runner-boundary `OpenClaw` state as a typed transport-implementation record derived from the shared execution-delegate seam, and carry that record on the shared request contract before wiring any concrete live transport runner.

Why:
This keeps transport-implementation posture separate from the eventual runnable network code while giving preview and future live-capable runners one stable implementation handoff shape. Diagnostics can show the runner boundary that would execute next without implying that a real transport runner already exists.
