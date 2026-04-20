# Mii Plaza Client

![Preview image](public/assets/images/preview_dark.png)

`mii-creator` is now being developed as a `Mii Plaza Client`: a browser-based 3D plaza built on top of the existing Mii editor, renderer, and local asset pipeline.

The repository still ships the original Mii editing and library experience, but the current product direction is larger than a standalone avatar editor:

- `/` keeps the classic Mii editor and local library flow
- `/?plaza=1` runs the early third-person plaza prototype
- provider-driven presence data is being prepared for `OpenClaw` and other future agent backends

## What This Repo Owns

This repository is the client plane of the project.

It owns:

- Mii editing, rendering, and identity presentation
- the playable browser plaza runtime
- HUD, diagnostics, and player interaction shells
- provider-facing client contracts for agent presence

It does not own:

- agent orchestration itself
- social persistence or mailbox/board storage
- realtime fanout or multiplayer backend services

Those pieces are planned behind stable contracts and a separate service plane.

## Current Architecture Direction

The current fork is following a layered platform path:

- `Mii Plaza Client` in this repo
- provider adapters for `OpenClaw` and future agent systems
- contract-first integration before real network dependencies are turned on
- continuous project governance through `CURRENT_PLAN.md`, `MASTER_PLAN.md`, and `docs/project-governance/`

Recommended reading order:

- [PROJECT_BRIEF.md](/Users/jammyfu/works/AI/Tools/mii-creator/PROJECT_BRIEF.md)
- [CURRENT_PLAN.md](/Users/jammyfu/works/AI/Tools/mii-creator/CURRENT_PLAN.md)
- [MASTER_PLAN.md](/Users/jammyfu/works/AI/Tools/mii-creator/MASTER_PLAN.md)
- [docs/architecture/PLATFORM_ROADMAP.md](/Users/jammyfu/works/AI/Tools/mii-creator/docs/architecture/PLATFORM_ROADMAP.md)
- [docs/AUTOMATION_COMMANDS.md](/Users/jammyfu/works/AI/Tools/mii-creator/docs/AUTOMATION_COMMANDS.md)
- [docs/LONG_RUNNING_AUTONOMY.md](/Users/jammyfu/works/AI/Tools/mii-creator/docs/LONG_RUNNING_AUTONOMY.md)
- [docs/superpowers/specs/2026-04-20-mii-plaza-platform-design.md](/Users/jammyfu/works/AI/Tools/mii-creator/docs/superpowers/specs/2026-04-20-mii-plaza-platform-design.md)

## Open Source Base And Attribution

This project is based on the open source repository [datkat21/mii-creator](https://github.com/datkat21/mii-creator).

This fork keeps that codebase as its foundation and extends it toward a playable Mii plaza experience.

The current repo also builds on or references the following open source projects:

- [ariankordi/FFL-Testing](https://github.com/ariankordi/FFL-Testing) for the renderer-server prototype ideas and local rendering workflow
- [datkat21/FFL-Testing-with-hats](https://github.com/datkat21/FFL-Testing-with-hats) for hat-enabled local rendering support
- [PretendoNetwork/mii-js](https://github.com/PretendoNetwork/mii-js) for JavaScript-friendly Mii data handling

Additional attribution from the original project remains relevant:

- some utility code in `src/external/mii-frontend` is adapted from arian's public website/tooling
- custom Mii Maker music is by [objecty](https://x.com/objecty)

Please keep upstream attribution intact when reusing or redistributing this fork.

## Current Feature Surface

### Editor And Renderer

- real 3D Mii rendering
- Mii editing with extended colors and accessories
- local library save/load flows
- QR export
- PNG export
- `.ffsd` and `.miic` import/export
- custom render creation inside the app
- browser-local `ffl.js` rendering on localhost
- optional native local renderer server workflow

### Plaza Prototype

- third-person playable plaza shell at `/?plaza=1`
- mock provider-backed plaza residents and hotspots
- provider diagnostics in HUD and `Provider Status`
- typed provider seams for `OpenClaw` live integration
- refresh/fallback/status handling for evolving provider pipelines

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)
- Python 3
- macOS is the best-supported local renderer environment in the current scripts

Install dependencies:

```bash
bun i
```

## Running The App

### Fastest local frontend loop

Run the TypeScript build watcher:

```bash
bun run build-ts
```

Serve the static app in another terminal:

```bash
bun run serve
```

Then open:

- [http://127.0.0.1:3000/](http://127.0.0.1:3000/) for the classic editor
- [http://127.0.0.1:3000/?plaza=1](http://127.0.0.1:3000/?plaza=1) for the plaza prototype

If you prefer a one-shot compile instead of the watcher:

```bash
bun run build-once
```

### Local renderer stack

This repo supports two local rendering modes:

- browser-local `ffl.js` rendering, now the default on `localhost` and `127.0.0.1`
- native local renderer server mode using `/miis/*`

Native prerequisites on macOS:

```bash
brew install cmake pkg-config glfw go
```

Set up renderer resources:

```bash
./scripts/setup-local-renderer.sh
```

Start only the app:

```bash
./scripts/start-local-app.sh
```

Useful companion commands:

```bash
./scripts/status-local-app.sh
./scripts/stop-local-app.sh
./scripts/start-local-app.sh restart
```

Start the native renderer server too:

```bash
./scripts/start-local-renderer.sh
```

Open the app in server renderer mode:

- [http://127.0.0.1:3000/?rendererBackend=server](http://127.0.0.1:3000/?rendererBackend=server)

Start everything together:

```bash
./scripts/start-local-stack.sh
```

Check or stop the full stack:

```bash
./scripts/status-local-stack.sh
./scripts/stop-local-stack.sh
```

### Useful runtime overrides

- `MII_RENDERER_BACKEND=ffljs`
- `MII_RENDERER_BACKEND=server`
- `MII_RENDERER_BACKEND=both`
- `MII_RENDERER_REPO=/absolute/path/to/FFL-Testing-with-hats`
- `MII_RENDERER_PORT=5001`
- `MII_APP_PORT=3001`
- `MII_RENDERER_UPSTREAM_PORT=12347`
- `?renderer=remote`
- `?renderer=local`
- `?rendererBackend=ffljs`
- `?rendererBackend=server`

## Running Tests And Verification

### Quick test entrypoint

Run the default test script:

```bash
bun test
```

Or through `package.json`:

```bash
bun run test
```

This currently covers:

- core plaza provider tests
- resident avatar adapter tests
- local sync helper tests

### Full repository verification

The main verification entrypoint for this project is:

```bash
python3 tools/verify.py
```

That command runs the broader repository checks used by the project loop, including:

- Bun test suites for plaza/provider/runtime coverage
- Python unittest coverage for sync tooling
- one-shot frontend build verification

You can also call the package shortcut:

```bash
bun run verify
```

### Useful individual commands

```bash
bun run build-once
bun test src/providers/openClawPresenceAdapter.test.ts
bun test src/game/plaza/loadPlazaWorldData.test.ts
python3 -m unittest tools.test_sync_or_queue tools.test_queue_local_git_sync tools.test_verify
```

## Automation And Safe Sync

This repository uses the same safe-sync submission pattern adopted from `ai-analysis-mcp` and `AegisGraph`.

The preferred automation flow is:

1. finish one stable closure
2. run `python3 tools/verify.py`
3. submit through safe sync instead of raw `git commit && git push`

Primary commands:

```bash
python3 tools/sync_or_queue.py --message "feat: your stable closure"
python3 tools/sync_or_queue.py --message "feat: your stable closure" --prefer-local
python3 tools/local_git_flush.py
```

Package shortcuts:

```bash
bun run sync
bun run sync:local
bun run flush:local
```

See:

- [AGENTS.md](/Users/jammyfu/works/AI/Tools/mii-creator/AGENTS.md)
- [docs/AUTOMATION_COMMANDS.md](/Users/jammyfu/works/AI/Tools/mii-creator/docs/AUTOMATION_COMMANDS.md)
- [docs/LONG_RUNNING_AUTONOMY.md](/Users/jammyfu/works/AI/Tools/mii-creator/docs/LONG_RUNNING_AUTONOMY.md)

## Contributing

Contributions are welcome, especially in these areas:

- plaza gameplay and player interaction
- provider adapters and diagnostics
- Mii rendering improvements
- local tooling and automation reliability
- social/world systems once the service contracts are ready

If you contribute, please align with the repository loop files and verify before syncing changes.

## Model Credits

Some custom hat models are provided by The Models Resource:

- [Top Hat](https://www.models-resource.com/nintendo_switch/supersmashbrosultimate/model/30314/)
- [Ribbon & Bow](https://www.models-resource.com/3ds/nintendogscats/model/30239/)

Thanks to [Timimimi](https://github.com/Timiimiimii) for creating additional hat models:

- Cat Ears
- Straw Hat
- Hijab
- Bike Helmet
