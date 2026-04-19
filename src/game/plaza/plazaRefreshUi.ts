import type {
  PlazaWorldDataPollingPlan,
  PlazaWorldDataSnapshot,
} from "../../contracts/plaza";

export interface PlazaRefreshUiState {
  actionLabel: string;
  actionHint: string;
  statusLabel: string;
}

export interface PlazaPollingPlanUiState {
  label: string;
  detail: string;
}

function formatDuration(milliseconds: number): string {
  const totalMinutes = Math.max(1, Math.round(milliseconds / 60000));
  return `${totalMinutes}m`;
}

function formatClockTime(isoTimestamp: string): string {
  const timestamp = new Date(isoTimestamp);
  if (Number.isNaN(timestamp.getTime())) {
    return "unknown time";
  }

  const hours = timestamp.getHours().toString().padStart(2, "0");
  const minutes = timestamp.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
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

export function describePollingPlanUi(
  pollingPlan: PlazaWorldDataPollingPlan
): PlazaPollingPlanUiState {
  if (pollingPlan.mode === "cadence-ready") {
    const interval =
      typeof pollingPlan.recommendedIntervalMs === "number"
        ? formatDuration(pollingPlan.recommendedIntervalMs)
        : "future cadence";

    return {
      label: `Cadence-ready polling seam (${interval})`,
      detail: pollingPlan.nextSuggestedRefreshAt
        ? `Suggested next auto refresh at ${formatClockTime(
            pollingPlan.nextSuggestedRefreshAt
          )}`
        : "Suggested next auto refresh will follow provider retry timing.",
    };
  }

  return {
    label: "Manual-only refresh boundary",
    detail: "Future polling is disabled until provider retry timing is available.",
  };
}

export function createProviderStatusRefreshDetails(
  snapshot: Pick<PlazaWorldDataSnapshot, "sequence" | "trigger">,
  pollingPlan?: PlazaWorldDataPollingPlan | null
): string[] {
  const refreshUiState = describeRefreshUiState(snapshot, false);
  const detailLines = [
    `Refresh status: ${refreshUiState.statusLabel}`,
    "Refresh action: Use Refresh Provider in the plaza HUD to fetch a new snapshot.",
  ];

  if (pollingPlan) {
    const pollingUi = describePollingPlanUi(pollingPlan);
    detailLines.push(`Polling posture: ${pollingUi.label}`);
    detailLines.push(pollingUi.detail);
  }

  return detailLines;
}
