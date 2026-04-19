import { createPlazaExperience } from "../../game/plaza/createPlazaExperience";
import {
  listMockHotspots,
  listMockResidents,
} from "../../providers/mockPlazaPresence";

export function Plaza() {
  document.body.innerHTML = "";
  document.body.classList.add("plaza-mode");

  const root = document.createElement("div");
  root.className = "plaza-root";
  document.body.appendChild(root);

  createPlazaExperience({
    root,
    residents: listMockResidents(),
    hotspots: listMockHotspots(),
    onExit: () => {
      const url = new URL(window.location.href);
      url.searchParams.delete("plaza");
      window.location.href = `${url.pathname}${url.search}`;
    },
  });
}
