import type {
  PlazaHotspot,
  PlazaResident,
  PlazaWorldData,
  PlazaWorldDataProvider,
} from "../contracts/plaza";

function isoOffset(minutesAgo: number): string {
  return new Date(Date.now() - minutesAgo * 60_000).toISOString();
}

export function listMockResidents(): PlazaResident[] {
  return [
    {
      agent: {
        id: "openclaw",
        displayName: "OpenClaw",
        provider: "OpenClaw",
        role: "Execution Captain",
        capabilityTags: ["tools", "plans", "builds"],
        themeColor: "#ff8a4c",
        accentColor: "#ffd166",
      },
      presence: {
        agentId: "openclaw",
        status: "active",
        headline: "Driving the plaza bootstrap",
        currentTask: "Coordinating renderer and world-shell implementation",
        mood: "focused",
        updatedAt: isoOffset(1),
        locationHint: "Fountain Walk",
        activityScore: 0.93,
      },
      bio: "Keeps the plaza shipping by turning plans into visible progress.",
      prompt: "Ask OpenClaw what is currently shipping.",
      details: [
        "Most active when a roadmap turns into concrete slices.",
        "Prefers tool-safe, provider-agnostic boundaries.",
        "Will eventually bridge live agent execution into the world.",
      ],
      position: { x: -5.5, z: -2 },
    },
    {
      agent: {
        id: "signal-grove",
        displayName: "Signal Grove",
        provider: "Mock",
        role: "Presence Gardener",
        capabilityTags: ["status", "routing", "ambience"],
        themeColor: "#4cc9f0",
        accentColor: "#90f1ef",
      },
      presence: {
        agentId: "signal-grove",
        status: "idle",
        headline: "Keeping the resident feed calm",
        currentTask: "Refreshing plaza summaries and idle animations",
        mood: "calm",
        updatedAt: isoOffset(4),
        locationHint: "Garden Loop",
        activityScore: 0.44,
      },
      bio: "Turns raw status changes into ambient world behavior.",
      prompt: "Inspect how presence snapshots become world residents.",
      details: [
        "Owns mock routines for the first plaza milestone.",
        "Will later evolve into a generic provider bridge.",
      ],
      position: { x: 4.5, z: 3.5 },
    },
    {
      agent: {
        id: "postmaster-lantern",
        displayName: "Postmaster Lantern",
        provider: "Mock",
        role: "Social Loop Keeper",
        capabilityTags: ["mail", "board", "events"],
        themeColor: "#80ed99",
        accentColor: "#57cc99",
      },
      presence: {
        agentId: "postmaster-lantern",
        status: "busy",
        headline: "Preparing the social layer",
        currentTask: "Drafting mailbox and bulletin board hooks",
        mood: "eager",
        updatedAt: isoOffset(19),
        locationHint: "Mailbox Corner",
        activityScore: 0.71,
      },
      bio: "Represents the future social systems that will make the plaza revisit-worthy.",
      prompt: "Preview the future mailbox and board loop.",
      details: [
        "Tracks social hooks that are not persistent yet.",
        "Will power postcards, board posts, and revisit incentives.",
      ],
      position: { x: 8, z: -4.5 },
    },
  ];
}

export function listMockHotspots(): PlazaHotspot[] {
  return [
    {
      id: "plaza-board",
      name: "Plaza Board",
      prompt: "Read the board for the current build pulse.",
      description:
        "A public board for the current slice, priorities, and recent wins.",
      details: [
        "Current pulse: bootstrap governance and first playable world shell.",
        "Next pulse: replace proxy residents with rendered Miis.",
        "Later: let agents publish their own updates here.",
      ],
      color: "#f4a261",
      position: { x: 0, z: -7.5 },
    },
    {
      id: "mailbox",
      name: "Mailbox",
      prompt: "Check the mailbox for future social experiments.",
      description:
        "A prototype anchor for postcards, invites, and asynchronous agent notes.",
      details: [
        "No persistence yet; this is a social placeholder hotspot.",
        "Phase 3 will let visits and messages land here.",
      ],
      color: "#457b9d",
      position: { x: -10, z: 5 },
    },
    {
      id: "studio-gate",
      name: "Studio Gate",
      prompt: "The Mii studio remains the identity workshop.",
      description:
        "This gate marks the boundary between avatar creation and the living plaza.",
      details: [
        "The editor flow stays alive while the plaza grows beside it.",
        "Future flow: create or edit a Mii, then step straight into the plaza.",
      ],
      color: "#8d99ae",
      position: { x: 10, z: 6.5 },
    },
  ];
}

export function createMockPlazaWorldData(): PlazaWorldData {
  return {
    source: {
      id: "mock",
      provider: "Mock",
      mode: "mock",
      health: {
        state: "healthy",
        headline: "Local mock presence is current and safe for UI iteration.",
        lastSuccessfulUpdate: new Date().toISOString(),
      },
    },
    residents: listMockResidents(),
    hotspots: listMockHotspots(),
  };
}

export const mockPlazaWorldDataProvider: PlazaWorldDataProvider = {
  id: "mock",
  async load() {
    return createMockPlazaWorldData();
  },
};
