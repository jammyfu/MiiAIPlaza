import type {
  PlazaWorldDataProvider,
  PlazaWorldDataSnapshot,
} from "../../contracts/plaza";
import { loadPlazaWorldData } from "./loadPlazaWorldData";

export interface PlazaWorldDataController {
  loadInitial(): Promise<PlazaWorldDataSnapshot>;
  refresh(): Promise<PlazaWorldDataSnapshot>;
  getLatestSnapshot(): PlazaWorldDataSnapshot | null;
}

export function createPlazaWorldDataController(
  provider: PlazaWorldDataProvider
): PlazaWorldDataController {
  let sequence = 0;
  let latestSnapshot: PlazaWorldDataSnapshot | null = null;

  async function runLoad(
    trigger: PlazaWorldDataSnapshot["trigger"]
  ): Promise<PlazaWorldDataSnapshot> {
    const world = await loadPlazaWorldData(provider);
    sequence += 1;
    latestSnapshot = {
      sequence,
      trigger,
      world,
    };
    return latestSnapshot;
  }

  return {
    loadInitial() {
      return runLoad("initial");
    },
    refresh() {
      return runLoad("manual-refresh");
    },
    getLatestSnapshot() {
      return latestSnapshot;
    },
  };
}
