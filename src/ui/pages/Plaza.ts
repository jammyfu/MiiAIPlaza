import type { PlazaWorldDataProvider } from "../../contracts/plaza";
import { createPlazaExperience } from "../../game/plaza/createPlazaExperience";
import { createPlazaWorldDataController } from "../../game/plaza/createPlazaWorldDataController";
import { mockPlazaWorldDataProvider } from "../../providers/mockPlazaPresence";
import { openClawFixtureWorldDataProvider } from "../../providers/openClawPresenceAdapter";

const plazaWorldDataProviders: Record<string, PlazaWorldDataProvider> = {
  mock: mockPlazaWorldDataProvider,
  "openclaw-fixture": openClawFixtureWorldDataProvider,
};

function resolvePlazaWorldDataProvider(): PlazaWorldDataProvider {
  const searchParams = new URLSearchParams(window.location.search);
  const requestedProvider = searchParams.get("presence") ?? "mock";
  return plazaWorldDataProviders[requestedProvider] ?? mockPlazaWorldDataProvider;
}

export function Plaza() {
  document.body.innerHTML = "";
  document.body.classList.add("plaza-mode");

  const root = document.createElement("div");
  root.className = "plaza-root";
  document.body.appendChild(root);

  const provider = resolvePlazaWorldDataProvider();
  const worldDataController = createPlazaWorldDataController(provider);
  let currentExperience: { destroy(): void } | null = null;
  root.dataset.providerRefreshBoundary = "ready";

  function renderLoading(message: string) {
    currentExperience?.destroy();
    currentExperience = null;
    root.innerHTML = `
      <div class="plaza-shell">
        <div class="plaza-overlay">
          <div class="plaza-hud-card plaza-brand-card">
            <span class="plaza-eyebrow">Loading Plaza</span>
            <h1>Mii Plaza</h1>
            <p>${message}</p>
          </div>
        </div>
      </div>
    `;
  }

  function renderSnapshot(
    snapshot: Awaited<ReturnType<typeof worldDataController.loadInitial>>
  ) {
    currentExperience?.destroy();
    currentExperience = null;
    const { source, hotspots, residents } = snapshot.world;
    const pollingPlan = worldDataController.getPollingPlan();
    root.dataset.providerRefreshSequence = String(snapshot.sequence);
    root.dataset.providerRefreshTrigger = snapshot.trigger;
    root.dataset.providerPollingMode = pollingPlan?.mode ?? "unknown";
    currentExperience = createPlazaExperience({
      root,
      source,
      residents,
      hotspots,
      refreshSnapshot: snapshot,
      pollingPlan,
      onRefresh: async () => {
        renderLoading("Refreshing provider presence from the selected source...");
        const refreshedSnapshot = await worldDataController.refresh();
        renderSnapshot(refreshedSnapshot);
      },
      onExit: () => {
        currentExperience?.destroy();
        const url = new URL(window.location.href);
        url.searchParams.delete("plaza");
        url.searchParams.delete("presence");
        window.location.href = `${url.pathname}${url.search}`;
      },
    });
  }

  renderLoading("Hydrating resident presence from the selected provider...");
  void worldDataController.loadInitial().then(renderSnapshot);
}
