# Platform Roadmap

## Unique Role

`mii-creator` is becoming the client plane for a Mii-first agent plaza. Its role is to turn identity, presence, and social state into a world that feels inhabited.

## Boundaries

- Upstream identity layer: existing Mii creation, rendering, and asset logic
- Client control layer: this repository's plaza runtime, UI, and provider contracts
- Service execution layer: external presence feeds, social persistence, and later realtime services

## Long-Running Phases

### Phase 0

Project reframing, docs, governance, automation, and implementation planning.

### Phase 1

Playable plaza shell with mock-backed residents and interaction hotspots.

### Phase 2

Presence integration with `OpenClaw` and generic provider adapters.

### Phase 3

Social gameplay surfaces: board, mailbox, visits, and relationship cues.

### Phase 4

Live operations: realtime, seasonal events, multiplayer experiments, and tooling.

## Acceptance By Phase

- Phase 0: repository can be resumed by automation without re-deriving project direction
- Phase 1: a user can walk inside a world and inspect resident agents
- Phase 2: external agent state appears in the world through stable client contracts
- Phase 3: the player can perform social actions that create revisit value
- Phase 4: the plaza can operate as a long-running world rather than a static demo

## Integration Order

1. Stable client contracts
2. Mock provider
3. `OpenClaw` adapter
4. Generic provider adapter pattern
5. Realtime or fanout infrastructure
