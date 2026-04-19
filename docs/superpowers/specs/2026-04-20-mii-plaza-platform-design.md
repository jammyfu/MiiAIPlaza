# Mii Plaza Platform Design

Date: 2026-04-20
Status: Draft approved in chat, written for repository review
Primary repo: `mii-creator`
Primary branch: `main`

## 1. Summary

This project evolves the current Mii editor and renderer into a playable `Mii Plaza Client`: a third-person 3D plaza where the player can walk as their Mii, encounter agent-backed residents, inspect their live status, and gradually unlock social interactions such as visits, notes, and ambient co-presence.

The recommended architecture keeps this repository focused on the playable client plane while defining stable contracts for an external presence and social service plane. The client must work with local mock providers first, then integrate `OpenClaw`, then expand to other agent providers without changing the world-facing UX model.

## 2. Product Intent

### 2.1 Player fantasy

The player enters a cozy, inhabitable digital plaza and sees a world populated by agent personas represented as Miis. The world should feel alive before it is fully networked.

### 2.2 Core promise

- The current Mii creation stack becomes the identity and avatar pipeline.
- The plaza becomes the primary runtime surface.
- Agent status is not a dashboard table; it is embodied through location, motion, ambient activity, and contextual overlays.
- Social features emerge naturally from presence rather than being bolted on as a separate app.

### 2.3 First principle

Deliver a world-first experience before real-time infrastructure. The first playable milestone should already feel like a place, not an admin panel.

## 3. Scope Decisions

### 3.1 In scope

- A new plaza runtime added beside the existing editor experience
- Third-person 3D movement and camera
- A small authored plaza scene with interactable hotspots
- A local player Mii rendered with the existing avatar pipeline
- Agent-backed or mock-backed resident Miis appearing in the world
- Presence cards and lightweight in-world interaction prompts
- Provider-agnostic contracts for registry, presence, and social feeds
- Project governance and automation docs to support long-running development

### 3.2 Out of scope for the first implementation cycle

- Full real-time multiplayer
- Large procedural worlds
- Full combat or deep life-sim systems
- Voice chat
- Complex economy or crafting systems
- Tight coupling to a single agent framework

## 4. Architectural Direction

### 4.1 Platform split

The platform is split into two planes:

1. Client plane, owned by this repository
2. Service plane, owned by future presence/social adapters and services

### 4.2 Client plane responsibilities

This repository should own:

- 3D world rendering, world loop, camera, traversal, hotspots, and environmental state
- Mii avatar assembly, animation hooks, emotes, and visual identity surfaces
- HUD and overlays such as status chips, resident cards, plaza board, mail board, and visit prompts
- Mock provider adapters for local development
- Live provider adapters that map external agent state into the client contract

### 4.3 Service plane responsibilities

Future services should own:

- Agent registry and identity metadata
- Presence state and task snapshots
- Social artifacts such as notes, mail, reactions, friendship edges, and event hooks
- Real-time fanout or streaming transport when needed
- Persistence and cross-session history

### 4.4 Boundary rule

The renderer must never depend on a provider-specific agent schema. All world-facing systems consume stable contracts defined inside the client codebase.

### 4.5 Stack choice

Phase 1 should retain the repository's current plain TypeScript and Three.js direction rather than introducing a new game engine. This keeps the migration cost low, reuses the existing Mii rendering stack, and avoids a large architectural reset before the first playable plaza exists.

## 5. Runtime Model

### 5.1 Experience model

The user starts in a third-person 3D plaza. The camera follows the player Mii. Other agent Miis inhabit the scene as residents or visitors. Their presence is visible through:

- spatial placement in the plaza
- idle and movement patterns
- status bubbles or mood markers
- interact prompts that open richer contextual surfaces

### 5.2 UX model

The UI must follow game UI constraints rather than dashboard conventions:

- Keep the playfield mostly clear during movement
- Use one compact persistent HUD cluster
- Use contextual prompts near interactables
- Put detail-heavy information behind panels, boards, or pause surfaces

### 5.3 Simulation model

Simulation state must stay outside the renderer. The world loop owns:

- plaza zones
- resident spawn and routing state
- interaction availability
- schedules and ambient events
- provider data snapshots normalized into client entities

The renderer owns:

- scene composition
- lighting and environment
- character presentation
- camera movement
- animation playback
- VFX

## 6. Data Contracts

### 6.1 Agent registry contract

Each agent record should expose at minimum:

- `id`
- `displayName`
- `provider`
- `role`
- `capabilityTags[]`
- `miiPreset` or `miiDataRef`
- `homeZone`
- `themeColor`

### 6.2 Presence contract

Each presence snapshot should expose at minimum:

- `agentId`
- `status`: offline, idle, active, busy, blocked
- `headline`
- `currentTask`
- `mood`
- `updatedAt`
- `locationHint`
- `activityScore`

### 6.3 Social contract

The social layer should support:

- postcards or short notes
- mailbox items
- reaction events
- bulletin board items
- relationship or affinity signals

### 6.4 Provider adapters

Provider adapters must translate external schemas into the contracts above:

- `MockPresenceAdapter`
- `OpenClawPresenceAdapter`
- `GenericAgentPresenceAdapter`

The generic contract comes first; provider-specific logic stays at the edge.

## 7. Repo Evolution Strategy

### 7.1 Current assets to preserve

The existing repository already contains:

- browser-local and server-based Mii rendering paths
- avatar editing UX
- 3D body and head assets
- local runtime scripts

These should become the identity subsystem of the broader plaza platform.

### 7.2 Structural recommendation

Add a new world runtime alongside the current editor flow rather than replacing the editor immediately.

Recommended future client folders:

- `src/game/`
- `src/game/world/`
- `src/game/entities/`
- `src/game/camera/`
- `src/game/presence/`
- `src/game/social/`
- `src/game/ui/`
- `src/contracts/`
- `src/providers/`

### 7.3 Migration rule

The editor remains operational while the plaza experience is introduced. The player should be able to move from avatar creation into the plaza runtime without losing the existing Mii value proposition.

## 8. Roadmap

### Phase 0: Platform reframing and governance

Goal:
Turn the repository from a feature fork into a governed platform project.

Deliverables:

- project brief, master plan, current plan, and backlog
- architecture roadmap documents
- automation command docs
- long-running autonomy rules
- verification and next-plan scripts
- spec for the plaza platform

Acceptance:

- There is one clear planning entrypoint
- The project can be resumed by Codex without re-explaining the direction
- Verification and planning commands are documented and runnable

### Phase 1: First playable plaza

Goal:
Make the world feel inhabitable before live integrations.

Deliverables:

- third-person movement and follow camera
- one authored plaza scene
- player Mii spawn and control
- a small set of resident Miis driven by mock data
- pseudo-multiplayer presence illusion through polling or local fixtures, not realtime sessions
- hotspot interactions such as plaza board, mailbox, or resident card
- lightweight HUD and scene onboarding

Acceptance:

- A user can enter the plaza and walk around smoothly
- The world contains at least a few recognizable resident agents
- There is at least one interaction that opens a contextual info surface

### Phase 2: Agent presence integration

Goal:
Replace mock-only residency with live presence feeds.

Deliverables:

- `OpenClawPresenceAdapter`
- provider-agnostic adapter interface
- world entity hydration from presence snapshots
- state-driven behaviors or overlays
- fallback and stale-data handling

Acceptance:

- OpenClaw agents can appear as resident Miis in the plaza
- Live status changes can update world presentation without restarting the app
- The client remains stable when provider data is incomplete or delayed

### Phase 3: Social systems

Goal:
Make the plaza feel relational rather than merely observational.

Deliverables:

- visit flow
- messages or postcards
- mailbox
- shared plaza board
- simple affinity or friendship signals

Acceptance:

- The player can trigger at least two social interactions
- Agent identities are differentiated beyond status text
- The social loop creates reasons to revisit the plaza

### Phase 4: Live operations and world expansion

Goal:
Support ongoing activity, events, and richer concurrency.

Deliverables:

- realtime transport
- seasonal or scheduled events
- multiplayer or shared session experiments
- creator/admin tools for world curation
- live ops and observability surfaces

Acceptance:

- The world can change over time without shipping a full client rebuild
- Operational issues can be observed and debugged
- The client still degrades gracefully to polling and cached snapshots

## 9. Automation-First Development Rules

The project should support long-running autonomous development loops.

Required rules:

- `CURRENT_PLAN.md` is the only current execution entrypoint
- `MASTER_PLAN.md` tracks multi-phase roadmap
- `TODO_BACKLOG.md` stores deferred work
- `tools/verify.py` runs non-interactively with explicit interpreter paths
- `tools/next_plan.py` produces the next bounded implementation slice
- `docs/LONG_RUNNING_AUTONOMY.md` defines wake-up order and anti-drift rules

Recommended automation order after each wake-up:

1. Read `CURRENT_PLAN.md`
2. Review latest worklog and changelog entries
3. Run `python3 tools/verify.py`
4. Execute the bounded task for the current slice
5. Re-run verification
6. Update worklog, changelog, and acceptance notes
7. Run `python3 tools/next_plan.py`

## 10. Testing Strategy

Testing should be layered:

- unit tests for normalization logic and adapter mapping
- scene/runtime smoke tests for plaza boot and movement
- UI smoke tests for critical overlays
- provider contract fixtures for stale, missing, and partial data
- manual playtest passes for feel, clarity, and camera comfort

## 11. Risks and Mitigations

### Risk: world scope balloons too early

Mitigation:
Keep Phase 1 to one authored plaza scene and a short interaction loop.

### Risk: provider schemas are unstable

Mitigation:
Normalize provider data at the edge and keep client contracts narrow.

### Risk: the app becomes a dashboard wearing a game skin

Mitigation:
Represent agent state through spatial and behavioral cues first, text panels second.

### Risk: current editor value gets lost during migration

Mitigation:
Introduce the plaza as a parallel runtime and preserve the editor as the identity creation entrypoint.

## 12. Recommended Next Planning Slice

After this spec is approved in-repo, the next implementation plan should focus on:

1. Creating the project governance and automation file set
2. Defining the client contracts and provider interfaces
3. Scaffolding the plaza runtime shell beside the existing editor
4. Building the first minimal walkable scene with mock residents
