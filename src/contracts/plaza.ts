export type PlazaAgentStatus =
  | "offline"
  | "idle"
  | "active"
  | "busy"
  | "blocked";

export interface PlazaAgentRecord {
  id: string;
  displayName: string;
  provider: string;
  role: string;
  capabilityTags: string[];
  themeColor: string;
  accentColor: string;
}

export interface PlazaPresenceSnapshot {
  agentId: string;
  status: PlazaAgentStatus;
  headline: string;
  currentTask: string;
  mood: string;
  updatedAt: string;
  locationHint: string;
  activityScore: number;
}

export interface PlazaResident {
  agent: PlazaAgentRecord;
  presence: PlazaPresenceSnapshot;
  bio: string;
  prompt: string;
  details: string[];
  position: {
    x: number;
    z: number;
  };
}

export interface PlazaPresenceAdapter<TPayload = unknown> {
  id: string;
  provider: string;
  listSnapshots(payload: TPayload): PlazaPresenceSnapshot[];
  listResidents(payload: TPayload): PlazaResident[];
}

export interface PlazaHotspot {
  id: string;
  name: string;
  prompt: string;
  description: string;
  details: string[];
  color: string;
  position: {
    x: number;
    z: number;
  };
}

export interface PlazaWorldDataSource {
  id: string;
  provider: string;
  mode: "mock" | "fixture" | "live";
  health: PlazaWorldDataHealth;
  request?: PlazaWorldDataRequest;
}

export interface PlazaWorldDataHealth {
  state: "healthy" | "degraded" | "failing";
  headline: string;
  lastSuccessfulUpdate?: string;
  fallbackHint?: string;
  retryAfterMs?: number;
  nextRetryAt?: string;
}

export interface PlazaWorldDataRequest {
  transport: "http" | "fixture";
  endpointLabel: string;
  authKind: "none" | "token" | "session";
  liveEnabled: boolean;
  workspaceHint?: string;
  descriptor?: PlazaWorldDataRequestDescriptor;
  transportDelegate?: PlazaWorldDataRequestTransportDelegate;
  fetchRunner?: PlazaWorldDataRequestFetchRunner;
  fetchRunnerFactory?: PlazaWorldDataRequestFetchRunnerFactory;
  runnerEnvelope?: PlazaWorldDataRequestRunnerEnvelope;
  requestBuilder?: PlazaWorldDataRequestBuilder;
  fetchAttempt?: PlazaWorldDataRequestFetchAttempt;
  fetchResult?: PlazaWorldDataRequestFetchResult;
  responseEnvelope?: PlazaWorldDataRequestResponseEnvelope;
  normalizerHandoff?: PlazaWorldDataRequestNormalizerHandoff;
  executionPayload?: PlazaWorldDataRequestExecutionPayload;
  executionBridge?: PlazaWorldDataRequestExecutionBridge;
  fetchEntry?: PlazaWorldDataRequestFetchEntry;
  fetchDispatch?: PlazaWorldDataRequestFetchDispatch;
  transportCall?: PlazaWorldDataRequestTransportCall;
  fetchExecution?: PlazaWorldDataRequestFetchExecution;
  executionDelegate?: PlazaWorldDataRequestExecutionDelegate;
  transportImplementation?: PlazaWorldDataRequestTransportImplementation;
  transportRunner?: PlazaWorldDataRequestTransportRunner;
  networkExecution?: PlazaWorldDataRequestNetworkExecution;
  executor?: PlazaWorldDataRequestExecutor;
}

export interface PlazaWorldDataRequestDescriptor {
  method: "GET" | "POST";
  pathLabel: string;
  queryLabel?: string;
  acceptLabel: string;
  authHeaderLabel?: string;
}

export interface PlazaWorldDataRequestTransportDelegate {
  id: string;
  label: string;
  summary: string;
}

export interface PlazaWorldDataRequestFetchRunner {
  id: string;
  label: string;
  contract: "network-capable";
  mode: "preview" | "live";
  summary: string;
}

export interface PlazaWorldDataRequestFetchRunnerFactory {
  id: string;
  label: string;
  summary: string;
}

export interface PlazaWorldDataRequestRunnerEnvelope {
  id: string;
  label: string;
  summary: string;
  transport: PlazaWorldDataRequest["transport"];
  endpointLabel: string;
  authKind: PlazaWorldDataRequest["authKind"];
  runnerMode: "preview" | "live";
  workspaceHint?: string;
  descriptor: PlazaWorldDataRequestDescriptor;
}

export interface PlazaWorldDataRequestBuilder {
  id: string;
  label: string;
  summary: string;
  method: PlazaWorldDataRequestDescriptor["method"];
  urlLabel: string;
  headerLabels: string[];
}

export interface PlazaWorldDataRequestFetchAttempt {
  id: string;
  label: string;
  summary: string;
  method: PlazaWorldDataRequestBuilder["method"];
  urlLabel: string;
  headerLabels: string[];
  runnerMode: "preview" | "live";
}

export interface PlazaWorldDataRequestFetchResult {
  id: string;
  label: string;
  summary: string;
  status: "preview-payload" | "live-ready";
  payloadLabel: string;
  sourceAttemptLabel: string;
  runnerMode: "preview" | "live";
}

export interface PlazaWorldDataRequestResponseEnvelope {
  id: string;
  label: string;
  summary: string;
  status: PlazaWorldDataRequestFetchResult["status"];
  payloadLabel: string;
  sourceResultLabel: string;
  normalizationTargetLabel: string;
  runnerMode: "preview" | "live";
}

export interface PlazaWorldDataRequestNormalizerHandoff {
  id: string;
  label: string;
  summary: string;
  status: PlazaWorldDataRequestResponseEnvelope["status"];
  payloadLabel: string;
  sourceEnvelopeLabel: string;
  normalizationTargetLabel: string;
  runnerMode: "preview" | "live";
}

export interface PlazaWorldDataRequestExecutionPayload {
  id: string;
  label: string;
  summary: string;
  status: PlazaWorldDataRequestNormalizerHandoff["status"];
  payloadLabel: string;
  sourceHandoffLabel: string;
  executionTargetLabel: string;
  runnerMode: "preview" | "live";
}

export interface PlazaWorldDataRequestExecutionBridge {
  id: string;
  label: string;
  summary: string;
  status: PlazaWorldDataRequestExecutionPayload["status"];
  payloadLabel: string;
  sourceExecutionPayloadLabel: string;
  bridgeTargetLabel: string;
  runnerMode: "preview" | "live";
}

export interface PlazaWorldDataRequestFetchEntry {
  id: string;
  label: string;
  summary: string;
  status: PlazaWorldDataRequestExecutionBridge["status"];
  payloadLabel: string;
  sourceExecutionBridgeLabel: string;
  fetchTargetLabel: string;
  runnerMode: "preview" | "live";
}

export interface PlazaWorldDataRequestFetchDispatch {
  id: string;
  label: string;
  summary: string;
  status: PlazaWorldDataRequestFetchEntry["status"];
  payloadLabel: string;
  sourceFetchEntryLabel: string;
  dispatchTargetLabel: string;
  runnerMode: "preview" | "live";
}

export interface PlazaWorldDataRequestTransportCall {
  id: string;
  label: string;
  summary: string;
  status: PlazaWorldDataRequestFetchDispatch["status"];
  payloadLabel: string;
  sourceFetchDispatchLabel: string;
  transportTargetLabel: string;
  runnerMode: "preview" | "live";
}

export interface PlazaWorldDataRequestFetchExecution {
  id: string;
  label: string;
  summary: string;
  status: PlazaWorldDataRequestTransportCall["status"];
  payloadLabel: string;
  sourceTransportCallLabel: string;
  executionTargetLabel: string;
  runnerMode: "preview" | "live";
}

export interface PlazaWorldDataRequestExecutionDelegate {
  id: string;
  label: string;
  summary: string;
  status: PlazaWorldDataRequestFetchExecution["status"];
  payloadLabel: string;
  sourceFetchExecutionLabel: string;
  delegateTargetLabel: string;
  runnerMode: "preview" | "live";
}

export interface PlazaWorldDataRequestTransportImplementation {
  id: string;
  label: string;
  summary: string;
  status: PlazaWorldDataRequestExecutionDelegate["status"];
  payloadLabel: string;
  sourceExecutionDelegateLabel: string;
  runnerTargetLabel: string;
  runnerMode: "preview" | "live";
}

export interface PlazaWorldDataRequestTransportRunner {
  id: string;
  label: string;
  summary: string;
  status: PlazaWorldDataRequestTransportImplementation["status"];
  payloadLabel: string;
  sourceTransportImplementationLabel: string;
  executionTargetLabel: string;
  runnerMode: "preview" | "live";
}

export interface PlazaWorldDataRequestNetworkExecution {
  id: string;
  label: string;
  summary: string;
  status: PlazaWorldDataRequestTransportRunner["status"];
  payloadLabel: string;
  sourceTransportRunnerLabel: string;
  implementationLabel: string;
  runnerMode: "preview" | "live";
}

export interface PlazaWorldDataRequestExecutor {
  status: "needs-config" | "ready";
  mode: "dry-run" | "live";
  summary: string;
}

export interface PlazaWorldData {
  source: PlazaWorldDataSource;
  residents: PlazaResident[];
  hotspots: PlazaHotspot[];
}

export type PlazaWorldDataLoadTrigger = "initial" | "manual-refresh";

export interface PlazaWorldDataSnapshot {
  sequence: number;
  trigger: PlazaWorldDataLoadTrigger;
  world: PlazaWorldData;
}

export interface PlazaWorldDataPollingPlan {
  mode: "manual-only" | "cadence-ready";
  recommendedIntervalMs: number | null;
  nextSuggestedRefreshAt?: string;
  reason: string;
}

export interface PlazaWorldDataProvider {
  id: string;
  provider: string;
  mode: PlazaWorldDataSource["mode"];
  load(): Promise<PlazaWorldData>;
}
