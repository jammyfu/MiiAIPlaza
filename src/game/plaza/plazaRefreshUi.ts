import type { PlazaWorldDataSnapshot } from "../../contracts/plaza";

export interface PlazaRefreshUiState {
  actionLabel: string;
  actionHint: string;
  statusLabel: string;
}

function describeRefreshTrigger(
  trigger: PlazaWorldDataSnapshot["trigger"]
): "Initial load ready" | "Manual refresh ready" {
  return trigger === "manual-refresh" ? "Manual refresh ready" : "Initial load ready";
}

export function describeRefreshUiState(
  snapshot: Pick<PlazaWorldDataSnapshot, "sequence" | "trigger">,
  isRefreshing: boolean
): PlazaRefreshUiState {
  const actionHint = isRefreshing
    ? "Refreshing provider snapshot..."
    : describeRefreshTrigger(snapshot.trigger);

  return {
    actionLabel: isRefreshing ? "Refreshing..." : "Refresh Provider",
    actionHint,
    statusLabel: `Load #${snapshot.sequence} · ${actionHint}`,
  };
}

export function createProviderStatusRefreshDetails(
  snapshot: Pick<PlazaWorldDataSnapshot, "sequence" | "trigger">
): string[] {
  const refreshUiState = describeRefreshUiState(snapshot, false);
  return [
    `Refresh status: ${refreshUiState.statusLabel}`,
    "Refresh action: Use Refresh Provider in the plaza HUD to fetch a new snapshot.",
  ];
}
