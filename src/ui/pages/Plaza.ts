import type { PlazaWorldDataProvider } from "../../contracts/plaza";
import { createPlazaExperience } from "../../game/plaza/createPlazaExperience";
import {
  mockPlazaWorldDataProvider,
} from "../../providers/mockPlazaPresence";
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

  root.innerHTML = `
    <div class="plaza-shell">
      <div class="plaza-overlay">
        <div class="plaza-hud-card plaza-brand-card">
          <span class="plaza-eyebrow">Loading Plaza</span>
          <h1>Mii Plaza</h1>
          <p>Hydrating resident presence from the selected provider...</p>
        </div>
      </div>
    </div>
  `;

  const provider = resolvePlazaWorldDataProvider();
  void provider
    .load()
    .then(({ hotspots, residents }) => {
      createPlazaExperience({
        root,
        residents,
        hotspots,
        onExit: () => {
          const url = new URL(window.location.href);
          url.searchParams.delete("plaza");
          url.searchParams.delete("presence");
          window.location.href = `${url.pathname}${url.search}`;
        },
      });
    })
    .catch((error) => {
      console.error("Failed to load plaza world data", error);
      root.innerHTML = `
        <div class="plaza-shell">
          <div class="plaza-overlay">
            <div class="plaza-hud-card plaza-brand-card">
              <span class="plaza-eyebrow">Provider Error</span>
              <h1>Mii Plaza</h1>
              <p>The selected provider could not hydrate plaza residents.</p>
              <div class="plaza-inline-actions">
                <button class="primary" data-plaza-action="back">Back To Studio</button>
              </div>
            </div>
          </div>
        </div>
      `;
      const backButton = root.querySelector(
        '[data-plaza-action="back"]'
      ) as HTMLButtonElement | null;
      backButton?.addEventListener("click", () => {
        const url = new URL(window.location.href);
        url.searchParams.delete("plaza");
        url.searchParams.delete("presence");
        window.location.href = `${url.pathname}${url.search}`;
      });
    });
}
