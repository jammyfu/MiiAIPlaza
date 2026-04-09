# Mii Creator Performance Roadmap

## Goal

Make the merged local-rendering build feel faster and more predictable without changing the user-visible feature set.

This roadmap focuses on the current bottlenecks in the merged `renderer-ffl.js-prototype` path and orders the work by impact-to-risk ratio.

## Current Hotspots

### 1. Hat model bundle is loaded and decompressed per scene

Code path:
- `src/class/3DScene.ts` -> `init()` -> `#loadHatModels()`
- `#loadHatModels()` fetches `./assets/models/hat_models_bundle.zip`, unzips every file, creates object URLs, and loads every hat GLB again.

Why it is expensive:
- Every `Mii3DScene` instance repeats the same zip download/decompression path.
- Screenshot/export flows create fresh scenes, so this cost is paid repeatedly.
- Hat assets are immutable and ideal for process-wide caching.

Optimization:
- Cache a shared promise for the parsed hat model bundle at module scope.
- Clone cached GLTF scenes per use instead of re-fetching and re-unzipping.

Expected impact:
- Faster editor init after the first scene.
- Faster custom renders and export flows.
- Less CPU and network churn during repeated scene creation.

Risk:
- Low. Asset data is static and already cloned before attaching to a scene.

### 2. ffl.js head rendering recreates CharModel on every head update

Code path:
- `src/class/3DScene.ts` -> `updateMiiHead()`
- `src/util/MiiRendering.ts` -> `getHeadModel()`

Current behavior:
- Local `ffl.js` path disposes the previous `CharModel`, rebuilds a new one, initializes textures again, then reattaches the head.
- `getHeadModel()` already has support for `updateCharModel(...)`, but callers do not use it.

Why it is expensive:
- Head updates happen frequently while editing.
- Recreating the whole CharModel causes repeated CPU work, texture initialization, and object churn.

Optimization:
- Preserve the previous `CharModel` when the local renderer path is active.
- Call `getHeadModel(..., charModelRef, rendererRef)` to update the existing model in place.
- Avoid disposing geometry/material for the reusable local head path before the update.

Expected impact:
- Lower latency while editing face, hair, and hat-related settings.
- Less GC pressure and fewer WebGL allocations.

Risk:
- Medium-low. Needs careful scene detachment/reparenting so reused meshes are not double-disposed.

### 3. Mask texture generation rebuilds a CharModel each time

Code path:
- `src/class/3DScene.ts` -> `traverseAddFaceMaterial()`
- `src/util/MiiRendering.ts` -> `getMaskTex()`

Why it is expensive:
- Every face-material refresh creates a fresh CharModel just to extract a mask texture.
- This duplicates some of the same work already done for the head.

Optimization:
- Introduce a small cache keyed by current studio data for the generated mask data URL.
- Optionally reuse a dedicated mask CharModel if the FFL API behaves safely for that path.

Expected impact:
- Faster face material refreshes.
- Reduced temporary texture/model churn.

Risk:
- Medium. Needs care around invalidation when expression or face parameters change.

### 4. Temporary render flows rebuild whole scenes eagerly

Code path:
- `src/util/miiImageUtils.ts` -> `getMiiRender()`

Why it is expensive:
- Each export/screenshot creates a hidden DOM container, a new scene, fresh renderer state, and waits on multiple timeouts.
- Some of this is unavoidable, but the hat/model work above compounds the cost.

Optimization:
- After phases 1-2, remeasure this path.
- If still slow, consider a pooled screenshot scene or shared renderer utilities for non-interactive renders.

Expected impact:
- Faster export and custom render actions.

Risk:
- Medium-high. Scene pooling can make lifecycle bugs harder to reason about.

### 5. Library icon generation has no memoization

Code path:
- `src/ui/pages/Library.ts` -> `miiIconUrl()`

Why it is expensive:
- Local icon generation creates a CharModel per Mii when worker cache is cold.
- Reopening the library repeats work for unchanged Miis.

Optimization:
- Add a short-lived in-memory cache keyed by studio data + view + width.
- Keep the worker path, but avoid recomputing identical icons during the same session.

Expected impact:
- Faster library load and reopen.

Risk:
- Low. Straightforward cache invalidation because the key is fully derived from render inputs.

## Delivery Order

### Phase 1: Low-risk, high-return

1. Cache hat model bundle across all `Mii3DScene` instances.
2. Reuse `CharModel` for local head updates.
3. Keep all current behavior and rendering output unchanged.

### Phase 2: Medium-risk, focused rendering improvements

1. Add face mask caching.
2. Add library icon memoization.
3. Remove remaining non-actionable runtime logging in local renderer paths.

### Phase 3: Structural improvements after measurement

1. Revisit screenshot/custom-render scene creation costs.
2. Consider shared non-interactive renderer helpers.
3. Only proceed if profiling shows scene setup is still dominant after phases 1-2.

## Implementation Status

- [x] Phase 0: Type-check baseline restored (`bunx tsc --noEmit` passes).
- [x] Phase 1.1: Cache hat model bundle globally.
- [x] Phase 1.2: Reuse local `CharModel` during head updates.
- [ ] Phase 2.1: Cache face mask generation.
- [ ] Phase 2.2: Cache library icons.
- [ ] Phase 3: Revisit export/custom-render scene lifecycle.

## Success Criteria

We should consider this roadmap successful when:
- Local editor head updates feel noticeably more responsive.
- Reopening scenes or generating screenshots does not repeatedly pay the full hat bundle load cost.
- `bunx tsc --noEmit` and `bun build.ts` continue to pass after each phase.
- We can trace each optimization to a clear bottleneck rather than speculative cleanup.
