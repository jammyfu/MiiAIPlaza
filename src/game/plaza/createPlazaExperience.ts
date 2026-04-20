import {
  AmbientLight,
  BoxGeometry,
  Clock,
  Color,
  DirectionalLight,
  Fog,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Texture,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import type {
  PlazaHotspot,
  PlazaWorldDataPollingPlan,
  PlazaResident,
  PlazaWorldDataSnapshot,
  PlazaWorldDataSource,
} from "../../contracts/plaza";
import { createResidentAvatarMii } from "./plazaResidentAvatarAdapter";
import {
  describePresenceFreshness,
  describeWorldDataHealth,
  describeWorldDataRequest,
  describeWorldDataSource,
  getPresenceDiagnostics,
  summarizeResidentDiagnostics,
} from "./plazaPresenceDiagnostics";
import {
  createProviderStatusRefreshDetails,
  describePollingPlanUi,
  describeRefreshUiState,
} from "./plazaRefreshUi";
import { getMiiRender, MiiCustomRenderType } from "../../util/miiImageUtils";

interface PlazaExperienceOptions {
  root: HTMLElement;
  source: PlazaWorldDataSource;
  residents: PlazaResident[];
  hotspots: PlazaHotspot[];
  onExit: () => void;
  onRefresh?: () => Promise<void>;
  refreshSnapshot?: Pick<PlazaWorldDataSnapshot, "sequence" | "trigger">;
  pollingPlan?: PlazaWorldDataPollingPlan | null;
}

type Interactable =
  | {
      type: "resident";
      resident: PlazaResident;
      mesh: Group;
      position: Vector3;
    }
  | {
      type: "hotspot";
      hotspot: PlazaHotspot;
      mesh: Mesh;
      position: Vector3;
    };

const statusLabels: Record<string, string> = {
  offline: "Offline",
  idle: "Idle",
  active: "Active",
  busy: "Busy",
  blocked: "Blocked",
};

export function createPlazaExperience({
  root,
  source,
  residents,
  hotspots,
  onExit,
  onRefresh,
  refreshSnapshot,
  pollingPlan,
}: PlazaExperienceOptions) {
  const providerSummary = summarizeResidentDiagnostics(residents);
  const sourceLabel = describeWorldDataSource(source);
  const healthCopy = describeWorldDataHealth(source.health);
  const requestCopy = source.request ? describeWorldDataRequest(source.request) : null;
  const refreshUiState = refreshSnapshot
    ? describeRefreshUiState(refreshSnapshot, false)
    : null;
  const pollingPlanUi = pollingPlan ? describePollingPlanUi(pollingPlan) : null;

  root.innerHTML = `
    <div class="plaza-shell">
      <div class="plaza-canvas-wrap"></div>
      <div class="plaza-overlay">
        <div class="plaza-hud-card plaza-brand-card">
          <span class="plaza-eyebrow">Mii Plaza Prototype</span>
          <h1>Mii Plaza</h1>
          <p>Walk the plaza, orbit the camera, and inspect provider-backed resident agents.</p>
          <div class="plaza-provider-meta">
            <span class="plaza-provider-pill" data-health="${source.health.state}">${sourceLabel}</span>
            <strong class="plaza-provider-health">${healthCopy.label}</strong>
            <small>
              ${residents.length} residents · ${providerSummary.staleResidents} stale ·
              ${providerSummary.blockedResidents} blocked
            </small>
            <small>${healthCopy.summary}</small>
            ${
              healthCopy.lastUpdatedLabel
                ? `<small>${healthCopy.lastUpdatedLabel}</small>`
                : ""
            }
            <small>${healthCopy.retryLabel}</small>
            ${
              healthCopy.nextRetryLabel
                ? `<small>${healthCopy.nextRetryLabel}</small>`
                : ""
            }
            ${
              healthCopy.fallbackHint
                ? `<small>${healthCopy.fallbackHint}</small>`
                : ""
            }
            ${
              requestCopy
                ? `<small>${requestCopy.transportLabel} · ${requestCopy.authLabel} · ${requestCopy.liveLabel}</small>`
                : ""
            }
            ${requestCopy?.workspaceLabel ? `<small>${requestCopy.workspaceLabel}</small>` : ""}
            ${requestCopy?.descriptorLabel ? `<small>${requestCopy.descriptorLabel}</small>` : ""}
            ${
              requestCopy?.descriptorQueryLabel
                ? `<small>${requestCopy.descriptorQueryLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportDelegateLabel
                ? `<small>${requestCopy.transportDelegateLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportDelegateSummary
                ? `<small>${requestCopy.transportDelegateSummary}</small>`
                : ""
            }
            ${
              requestCopy?.fetchRunnerLabel
                ? `<small>${requestCopy.fetchRunnerLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchRunnerContractLabel
                ? `<small>${requestCopy.fetchRunnerContractLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchRunnerSummary
                ? `<small>${requestCopy.fetchRunnerSummary}</small>`
                : ""
            }
            ${
              requestCopy?.fetchRunnerFactoryLabel
                ? `<small>${requestCopy.fetchRunnerFactoryLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchRunnerFactorySummary
                ? `<small>${requestCopy.fetchRunnerFactorySummary}</small>`
                : ""
            }
            ${
              requestCopy?.runnerEnvelopeLabel
                ? `<small>${requestCopy.runnerEnvelopeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.runnerEnvelopeSummary
                ? `<small>${requestCopy.runnerEnvelopeSummary}</small>`
                : ""
            }
            ${
              requestCopy?.runnerEnvelopeTargetLabel
                ? `<small>${requestCopy.runnerEnvelopeTargetLabel}</small>`
                : ""
            }
            ${
              requestCopy?.requestBuilderLabel
                ? `<small>${requestCopy.requestBuilderLabel}</small>`
                : ""
            }
            ${
              requestCopy?.requestBuilderSummary
                ? `<small>${requestCopy.requestBuilderSummary}</small>`
                : ""
            }
            ${
              requestCopy?.requestBuilderTargetLabel
                ? `<small>${requestCopy.requestBuilderTargetLabel}</small>`
                : ""
            }
            ${
              requestCopy?.requestBuilderHeadersLabel
                ? `<small>${requestCopy.requestBuilderHeadersLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchAttemptLabel
                ? `<small>${requestCopy.fetchAttemptLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchAttemptSummary
                ? `<small>${requestCopy.fetchAttemptSummary}</small>`
                : ""
            }
            ${
              requestCopy?.fetchAttemptTargetLabel
                ? `<small>${requestCopy.fetchAttemptTargetLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchAttemptHeadersLabel
                ? `<small>${requestCopy.fetchAttemptHeadersLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchAttemptModeLabel
                ? `<small>${requestCopy.fetchAttemptModeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchResultLabel
                ? `<small>${requestCopy.fetchResultLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchResultSummary
                ? `<small>${requestCopy.fetchResultSummary}</small>`
                : ""
            }
            ${
              requestCopy?.fetchResultStatusLabel
                ? `<small>${requestCopy.fetchResultStatusLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchResultPayloadLabel
                ? `<small>${requestCopy.fetchResultPayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchResultSourceLabel
                ? `<small>${requestCopy.fetchResultSourceLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchResultModeLabel
                ? `<small>${requestCopy.fetchResultModeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.responseEnvelopeLabel
                ? `<small>${requestCopy.responseEnvelopeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.responseEnvelopeSummary
                ? `<small>${requestCopy.responseEnvelopeSummary}</small>`
                : ""
            }
            ${
              requestCopy?.responseEnvelopeStatusLabel
                ? `<small>${requestCopy.responseEnvelopeStatusLabel}</small>`
                : ""
            }
            ${
              requestCopy?.responseEnvelopePayloadLabel
                ? `<small>${requestCopy.responseEnvelopePayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.responseEnvelopeSourceLabel
                ? `<small>${requestCopy.responseEnvelopeSourceLabel}</small>`
                : ""
            }
            ${
              requestCopy?.responseEnvelopeTargetLabel
                ? `<small>${requestCopy.responseEnvelopeTargetLabel}</small>`
                : ""
            }
            ${
              requestCopy?.responseEnvelopeModeLabel
                ? `<small>${requestCopy.responseEnvelopeModeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.normalizerHandoffLabel
                ? `<small>${requestCopy.normalizerHandoffLabel}</small>`
                : ""
            }
            ${
              requestCopy?.normalizerHandoffSummary
                ? `<small>${requestCopy.normalizerHandoffSummary}</small>`
                : ""
            }
            ${
              requestCopy?.normalizerHandoffStatusLabel
                ? `<small>${requestCopy.normalizerHandoffStatusLabel}</small>`
                : ""
            }
            ${
              requestCopy?.normalizerHandoffPayloadLabel
                ? `<small>${requestCopy.normalizerHandoffPayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.normalizerHandoffSourceLabel
                ? `<small>${requestCopy.normalizerHandoffSourceLabel}</small>`
                : ""
            }
            ${
              requestCopy?.normalizerHandoffTargetLabel
                ? `<small>${requestCopy.normalizerHandoffTargetLabel}</small>`
                : ""
            }
            ${
              requestCopy?.normalizerHandoffModeLabel
                ? `<small>${requestCopy.normalizerHandoffModeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionPayloadLabel
                ? `<small>${requestCopy.executionPayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionPayloadSummary
                ? `<small>${requestCopy.executionPayloadSummary}</small>`
                : ""
            }
            ${
              requestCopy?.executionPayloadStatusLabel
                ? `<small>${requestCopy.executionPayloadStatusLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionPayloadPayloadLabel
                ? `<small>${requestCopy.executionPayloadPayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionPayloadSourceLabel
                ? `<small>${requestCopy.executionPayloadSourceLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionPayloadTargetLabel
                ? `<small>${requestCopy.executionPayloadTargetLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionPayloadModeLabel
                ? `<small>${requestCopy.executionPayloadModeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionBridgeLabel
                ? `<small>${requestCopy.executionBridgeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionBridgeSummary
                ? `<small>${requestCopy.executionBridgeSummary}</small>`
                : ""
            }
            ${
              requestCopy?.executionBridgeStatusLabel
                ? `<small>${requestCopy.executionBridgeStatusLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionBridgePayloadLabel
                ? `<small>${requestCopy.executionBridgePayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionBridgeSourceLabel
                ? `<small>${requestCopy.executionBridgeSourceLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionBridgeTargetLabel
                ? `<small>${requestCopy.executionBridgeTargetLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionBridgeModeLabel
                ? `<small>${requestCopy.executionBridgeModeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchEntryLabel
                ? `<small>${requestCopy.fetchEntryLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchEntrySummary
                ? `<small>${requestCopy.fetchEntrySummary}</small>`
                : ""
            }
            ${
              requestCopy?.fetchEntryStatusLabel
                ? `<small>${requestCopy.fetchEntryStatusLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchEntryPayloadLabel
                ? `<small>${requestCopy.fetchEntryPayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchEntrySourceLabel
                ? `<small>${requestCopy.fetchEntrySourceLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchEntryTargetLabel
                ? `<small>${requestCopy.fetchEntryTargetLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchEntryModeLabel
                ? `<small>${requestCopy.fetchEntryModeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchDispatchLabel
                ? `<small>${requestCopy.fetchDispatchLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchDispatchSummary
                ? `<small>${requestCopy.fetchDispatchSummary}</small>`
                : ""
            }
            ${
              requestCopy?.fetchDispatchStatusLabel
                ? `<small>${requestCopy.fetchDispatchStatusLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchDispatchPayloadLabel
                ? `<small>${requestCopy.fetchDispatchPayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchDispatchSourceLabel
                ? `<small>${requestCopy.fetchDispatchSourceLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchDispatchTargetLabel
                ? `<small>${requestCopy.fetchDispatchTargetLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchDispatchModeLabel
                ? `<small>${requestCopy.fetchDispatchModeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportCallLabel
                ? `<small>${requestCopy.transportCallLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportCallSummary
                ? `<small>${requestCopy.transportCallSummary}</small>`
                : ""
            }
            ${
              requestCopy?.transportCallStatusLabel
                ? `<small>${requestCopy.transportCallStatusLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportCallPayloadLabel
                ? `<small>${requestCopy.transportCallPayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportCallSourceLabel
                ? `<small>${requestCopy.transportCallSourceLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportCallTargetLabel
                ? `<small>${requestCopy.transportCallTargetLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportCallModeLabel
                ? `<small>${requestCopy.transportCallModeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchExecutionLabel
                ? `<small>${requestCopy.fetchExecutionLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchExecutionSummary
                ? `<small>${requestCopy.fetchExecutionSummary}</small>`
                : ""
            }
            ${
              requestCopy?.fetchExecutionStatusLabel
                ? `<small>${requestCopy.fetchExecutionStatusLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchExecutionPayloadLabel
                ? `<small>${requestCopy.fetchExecutionPayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchExecutionSourceLabel
                ? `<small>${requestCopy.fetchExecutionSourceLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchExecutionTargetLabel
                ? `<small>${requestCopy.fetchExecutionTargetLabel}</small>`
                : ""
            }
            ${
              requestCopy?.fetchExecutionModeLabel
                ? `<small>${requestCopy.fetchExecutionModeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionDelegateLabel
                ? `<small>${requestCopy.executionDelegateLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionDelegateSummary
                ? `<small>${requestCopy.executionDelegateSummary}</small>`
                : ""
            }
            ${
              requestCopy?.executionDelegateStatusLabel
                ? `<small>${requestCopy.executionDelegateStatusLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionDelegatePayloadLabel
                ? `<small>${requestCopy.executionDelegatePayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionDelegateSourceLabel
                ? `<small>${requestCopy.executionDelegateSourceLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionDelegateTargetLabel
                ? `<small>${requestCopy.executionDelegateTargetLabel}</small>`
                : ""
            }
            ${
              requestCopy?.executionDelegateModeLabel
                ? `<small>${requestCopy.executionDelegateModeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportImplementationLabel
                ? `<small>${requestCopy.transportImplementationLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportImplementationSummary
                ? `<small>${requestCopy.transportImplementationSummary}</small>`
                : ""
            }
            ${
              requestCopy?.transportImplementationStatusLabel
                ? `<small>${requestCopy.transportImplementationStatusLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportImplementationPayloadLabel
                ? `<small>${requestCopy.transportImplementationPayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportImplementationSourceLabel
                ? `<small>${requestCopy.transportImplementationSourceLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportImplementationTargetLabel
                ? `<small>${requestCopy.transportImplementationTargetLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportImplementationModeLabel
                ? `<small>${requestCopy.transportImplementationModeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportRunnerLabel
                ? `<small>${requestCopy.transportRunnerLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportRunnerSummary
                ? `<small>${requestCopy.transportRunnerSummary}</small>`
                : ""
            }
            ${
              requestCopy?.transportRunnerStatusLabel
                ? `<small>${requestCopy.transportRunnerStatusLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportRunnerPayloadLabel
                ? `<small>${requestCopy.transportRunnerPayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportRunnerSourceLabel
                ? `<small>${requestCopy.transportRunnerSourceLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportRunnerTargetLabel
                ? `<small>${requestCopy.transportRunnerTargetLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportRunnerModeLabel
                ? `<small>${requestCopy.transportRunnerModeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.networkExecutionLabel
                ? `<small>${requestCopy.networkExecutionLabel}</small>`
                : ""
            }
            ${
              requestCopy?.networkExecutionSummary
                ? `<small>${requestCopy.networkExecutionSummary}</small>`
                : ""
            }
            ${
              requestCopy?.networkExecutionStatusLabel
                ? `<small>${requestCopy.networkExecutionStatusLabel}</small>`
                : ""
            }
            ${
              requestCopy?.networkExecutionPayloadLabel
                ? `<small>${requestCopy.networkExecutionPayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.networkExecutionSourceLabel
                ? `<small>${requestCopy.networkExecutionSourceLabel}</small>`
                : ""
            }
            ${
              requestCopy?.networkExecutionImplementationLabel
                ? `<small>${requestCopy.networkExecutionImplementationLabel}</small>`
                : ""
            }
            ${
              requestCopy?.networkExecutionModeLabel
                ? `<small>${requestCopy.networkExecutionModeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.requestDispatchLabel
                ? `<small>${requestCopy.requestDispatchLabel}</small>`
                : ""
            }
            ${
              requestCopy?.requestDispatchSummary
                ? `<small>${requestCopy.requestDispatchSummary}</small>`
                : ""
            }
            ${
              requestCopy?.requestDispatchStatusLabel
                ? `<small>${requestCopy.requestDispatchStatusLabel}</small>`
                : ""
            }
            ${
              requestCopy?.requestDispatchPayloadLabel
                ? `<small>${requestCopy.requestDispatchPayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.requestDispatchSourceLabel
                ? `<small>${requestCopy.requestDispatchSourceLabel}</small>`
                : ""
            }
            ${
              requestCopy?.requestDispatchImplementationLabel
                ? `<small>${requestCopy.requestDispatchImplementationLabel}</small>`
                : ""
            }
            ${
              requestCopy?.requestDispatchModeLabel
                ? `<small>${requestCopy.requestDispatchModeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.httpBridgeLabel
                ? `<small>${requestCopy.httpBridgeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.httpBridgeSummary
                ? `<small>${requestCopy.httpBridgeSummary}</small>`
                : ""
            }
            ${
              requestCopy?.httpBridgeStatusLabel
                ? `<small>${requestCopy.httpBridgeStatusLabel}</small>`
                : ""
            }
            ${
              requestCopy?.httpBridgePayloadLabel
                ? `<small>${requestCopy.httpBridgePayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.httpBridgeSourceLabel
                ? `<small>${requestCopy.httpBridgeSourceLabel}</small>`
                : ""
            }
            ${
              requestCopy?.httpBridgeImplementationLabel
                ? `<small>${requestCopy.httpBridgeImplementationLabel}</small>`
                : ""
            }
            ${
              requestCopy?.httpBridgeModeLabel
                ? `<small>${requestCopy.httpBridgeModeLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportCallableLabel
                ? `<small>${requestCopy.transportCallableLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportCallableSummary
                ? `<small>${requestCopy.transportCallableSummary}</small>`
                : ""
            }
            ${
              requestCopy?.transportCallableStatusLabel
                ? `<small>${requestCopy.transportCallableStatusLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportCallablePayloadLabel
                ? `<small>${requestCopy.transportCallablePayloadLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportCallableSourceLabel
                ? `<small>${requestCopy.transportCallableSourceLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportCallableImplementationLabel
                ? `<small>${requestCopy.transportCallableImplementationLabel}</small>`
                : ""
            }
            ${
              requestCopy?.transportCallableModeLabel
                ? `<small>${requestCopy.transportCallableModeLabel}</small>`
                : ""
            }
            ${requestCopy?.executorLabel ? `<small>${requestCopy.executorLabel}</small>` : ""}
            ${
              requestCopy?.executorSummary
                ? `<small>${requestCopy.executorSummary}</small>`
                : ""
            }
            ${
              refreshUiState ? `<small>${refreshUiState.statusLabel}</small>` : ""
            }
            ${pollingPlanUi ? `<small>${pollingPlanUi.label}</small>` : ""}
            ${pollingPlanUi ? `<small>${pollingPlanUi.detail}</small>` : ""}
          </div>
          <div class="plaza-inline-actions">
            ${
              onRefresh && refreshUiState
                ? `<button class="secondary" data-plaza-action="refresh">${refreshUiState.actionLabel}</button>`
                : ""
            }
            <button class="primary" data-plaza-action="back">Back To Studio</button>
          </div>
        </div>
        <div class="plaza-hud-card plaza-residents-card">
          <span class="plaza-eyebrow">Residents</span>
          <div class="plaza-resident-list"></div>
        </div>
        <div class="plaza-hud-card plaza-detail-card" hidden>
          <span class="plaza-eyebrow plaza-detail-eyebrow">Inspection</span>
          <h2 class="plaza-detail-title"></h2>
          <p class="plaza-detail-description"></p>
          <ul class="plaza-detail-list"></ul>
        </div>
        <div class="plaza-hud-card plaza-footer-card">
          <div class="plaza-prompt">Walk toward a resident or hotspot to inspect it.</div>
          <div class="plaza-controls-copy">
            <span><strong>Move</strong> WASD or arrows</span>
            <span><strong>Camera</strong> drag, Q/E, or touch buttons</span>
            <span><strong>Inspect</strong> E</span>
          </div>
        </div>
        <div class="plaza-touch-controls">
          <div class="plaza-touch-cluster">
            <button data-hold-key="ArrowUp">Up</button>
            <div class="plaza-touch-row">
              <button data-hold-key="ArrowLeft">Left</button>
              <button data-hold-key="ArrowDown">Down</button>
              <button data-hold-key="ArrowRight">Right</button>
            </div>
          </div>
          <div class="plaza-touch-cluster">
            <div class="plaza-touch-row">
              <button data-hold-key="KeyQ">Cam L</button>
              <button data-hold-key="KeyE">Cam R</button>
            </div>
            <button data-plaza-action="interact">Inspect</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const canvasWrap = root.querySelector(".plaza-canvas-wrap") as HTMLDivElement;
  const promptElm = root.querySelector(".plaza-prompt") as HTMLDivElement;
  const detailCard = root.querySelector(".plaza-detail-card") as HTMLDivElement;
  const detailEyebrow = root.querySelector(
    ".plaza-detail-eyebrow"
  ) as HTMLSpanElement;
  const detailTitle = root.querySelector(".plaza-detail-title") as HTMLHeadingElement;
  const detailDescription = root.querySelector(
    ".plaza-detail-description"
  ) as HTMLParagraphElement;
  const detailList = root.querySelector(".plaza-detail-list") as HTMLUListElement;
  const residentList = root.querySelector(".plaza-resident-list") as HTMLDivElement;
  const refreshButton = root.querySelector(
    '[data-plaza-action="refresh"]'
  ) as HTMLButtonElement | null;

  const scene = new Scene();
  scene.background = new Color("#d7f2ff");
  scene.fog = new Fog("#d7f2ff", 18, 42);

  const camera = new PerspectiveCamera(58, 1, 0.1, 100);
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.shadowMap.enabled = true;
  canvasWrap.appendChild(renderer.domElement);

  scene.add(new AmbientLight("#ffffff", 1.6));

  const sunLight = new DirectionalLight("#fff4d6", 2.4);
  sunLight.position.set(10, 16, 8);
  sunLight.castShadow = true;
  scene.add(sunLight);

  const ground = new Mesh(
    new PlaneGeometry(64, 64),
    new MeshStandardMaterial({ color: "#89c77a" })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const centralPlaza = new Mesh(
    new BoxGeometry(14, 0.2, 14),
    new MeshStandardMaterial({ color: "#f5efe6" })
  );
  centralPlaza.position.set(0, 0.11, 0);
  centralPlaza.receiveShadow = true;
  scene.add(centralPlaza);

  const fountain = new Mesh(
    new BoxGeometry(2.5, 1.8, 2.5),
    new MeshStandardMaterial({ color: "#9ec1cf" })
  );
  fountain.position.set(0, 0.95, 0);
  fountain.castShadow = true;
  scene.add(fountain);

  const player = new Group();
  const playerBody = new Mesh(
    new BoxGeometry(0.9, 1.4, 0.7),
    new MeshStandardMaterial({ color: "#3d7ef0" })
  );
  playerBody.position.y = 0.9;
  playerBody.castShadow = true;
  const playerHead = new Mesh(
    new SphereGeometry(0.38, 24, 16),
    new MeshStandardMaterial({ color: "#f5d2b3" })
  );
  playerHead.position.y = 1.95;
  playerHead.castShadow = true;
  player.add(playerBody, playerHead);
  player.position.set(0, 0, 10);
  scene.add(player);

  const interactables: Interactable[] = [];
  const disposableTextures: Texture[] = [];
  const disposableMaterials: SpriteMaterial[] = [];

  const residentMeshes = residents.map((resident, index) => {
    const diagnostics = getPresenceDiagnostics(resident.presence);
    const freshnessLabel = describePresenceFreshness(diagnostics.freshness);
    const group = new Group();
    const body = new Mesh(
      new BoxGeometry(0.75, 1.25, 0.65),
      new MeshStandardMaterial({ color: resident.agent.themeColor })
    );
    body.position.y = 0.8;
    body.castShadow = true;
    const head = new Mesh(
      new SphereGeometry(0.34, 18, 14),
      new MeshStandardMaterial({ color: "#f0cfaf" })
    );
    head.position.y = 1.7;
    head.castShadow = true;
    const marker = new Mesh(
      new BoxGeometry(0.18, 0.18, 0.18),
      new MeshStandardMaterial({ color: resident.agent.accentColor })
    );
    marker.position.y = 2.35;
    group.add(body, head, marker);
    group.position.set(resident.position.x, 0, resident.position.z);
    scene.add(group);
    interactables.push({
      type: "resident",
      resident,
      mesh: group,
      position: group.position,
    });

    const item = document.createElement("button");
    item.className = "plaza-resident-button";
    item.dataset.status = resident.presence.status;
    item.dataset.freshness = diagnostics.freshness;
    item.innerHTML = `
      <span
        class="plaza-status-dot"
        data-status="${resident.presence.status}"
        data-freshness="${diagnostics.freshness}"
      ></span>
      <span>
        <strong>${resident.agent.displayName}</strong>
        <small>${statusLabels[resident.presence.status]} · ${freshnessLabel} · ${diagnostics.updatedLabel}</small>
        <small>${resident.presence.headline}</small>
      </span>
    `;
    item.addEventListener("click", () => openResident(resident));
    residentList.appendChild(item);

    return { group, index, resident, body, head, marker, item };
  });

  residentMeshes.forEach(
    ({ resident, group, body, head, marker, item }) => {
      const residentMii = createResidentAvatarMii(resident);
      if (!residentMii) {
        return;
      }

      getMiiRender(residentMii, MiiCustomRenderType.Body)
        .then((image) => {
          const texture = new Texture(image);
          texture.needsUpdate = true;
          const material = new SpriteMaterial({
            map: texture,
            transparent: true,
            depthWrite: false,
          });
          const sprite = new Sprite(material);
          sprite.position.y = 1.45;
          sprite.scale.set(2.45, 3.5, 1);
          group.add(sprite);

          body.visible = false;
          head.visible = false;
          marker.position.y = 2.6;

          disposableTextures.push(texture);
          disposableMaterials.push(material);

          const avatarChip = document.createElement("img");
          avatarChip.className = "plaza-resident-avatar";
          avatarChip.src = image.src;
          avatarChip.alt = `${resident.agent.displayName} Mii portrait`;
          item.prepend(avatarChip);
        })
        .catch((error) => {
          console.error(
            `Plaza resident avatar render failed for ${resident.agent.id}`,
            error
          );
        });
    }
  );

  hotspots.forEach((hotspot) => {
    const mesh = new Mesh(
      new BoxGeometry(1.3, 1.4, 1.3),
      new MeshStandardMaterial({ color: hotspot.color })
    );
    mesh.position.set(hotspot.position.x, 0.7, hotspot.position.z);
    mesh.castShadow = true;
    scene.add(mesh);
    interactables.push({
      type: "hotspot",
      hotspot,
      mesh,
      position: mesh.position,
    });
  });

  const keyState = new Set<string>();
  let cameraYaw = Math.PI;
  let dragging = false;
  let lastPointerX = 0;
  let interactionLatch = false;
  let refreshing = false;

  const movementInput = new Vector2();
  const cameraDirection = new Vector3();
  const sideDirection = new Vector3();
  const moveDirection = new Vector3();
  const desiredCamera = new Vector3();
  const cameraLook = new Vector3();
  const clock = new Clock();

  function openResident(resident: PlazaResident) {
    const diagnostics = getPresenceDiagnostics(resident.presence);
    detailCard.hidden = false;
    detailCard.dataset.freshness = diagnostics.freshness;
    detailEyebrow.textContent = `${resident.agent.provider} · ${resident.agent.role} · ${describePresenceFreshness(
      diagnostics.freshness
    )}`;
    detailTitle.textContent = resident.agent.displayName;
    detailDescription.textContent = `${resident.bio} Current task: ${resident.presence.currentTask}.`;
    detailList.innerHTML = "";

    [
      `Status: ${statusLabels[resident.presence.status]}`,
      `Updated: ${diagnostics.updatedLabel}`,
      `Freshness: ${describePresenceFreshness(diagnostics.freshness)}`,
      `Mood: ${resident.presence.mood}`,
      `Location hint: ${resident.presence.locationHint}`,
      `Capabilities: ${resident.agent.capabilityTags.join(", ")}`,
      ...resident.details,
    ].forEach((line) => {
      const item = document.createElement("li");
      item.textContent = line;
      detailList.appendChild(item);
    });
  }

  function openHotspot(hotspot: PlazaHotspot) {
    detailCard.hidden = false;
    delete detailCard.dataset.freshness;
    detailEyebrow.textContent = "Plaza hotspot";
    detailTitle.textContent = hotspot.name;
    detailDescription.textContent = hotspot.description;
    detailList.innerHTML = "";
    const detailLines =
      hotspot.id === "provider-status" && refreshSnapshot
        ? [
            ...createProviderStatusRefreshDetails(refreshSnapshot, pollingPlan),
            ...hotspot.details,
          ]
        : hotspot.details;
    detailLines.forEach((line) => {
      const item = document.createElement("li");
      item.textContent = line;
      detailList.appendChild(item);
    });
  }

  function currentNearestInteractable() {
    let nearest: Interactable | undefined;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (const interactable of interactables) {
      const distance = interactable.position.distanceTo(player.position);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = interactable;
      }
    }

    return nearestDistance <= 3.4 ? nearest : undefined;
  }

  function interact() {
    const nearest = currentNearestInteractable();
    if (!nearest) {
      return;
    }

    if (nearest.type === "resident") {
      openResident(nearest.resident);
      return;
    }

    openHotspot(nearest.hotspot);
  }

  function setHeldKey(key: string, active: boolean) {
    if (active) {
      keyState.add(key);
      return;
    }
    keyState.delete(key);
  }

  root.querySelectorAll<HTMLElement>("[data-hold-key]").forEach((button) => {
    const key = button.dataset.holdKey!;
    const start = () => setHeldKey(key, true);
    const stop = () => setHeldKey(key, false);
    button.addEventListener("pointerdown", start);
    button.addEventListener("pointerup", stop);
    button.addEventListener("pointercancel", stop);
    button.addEventListener("pointerleave", stop);
  });

  root
    .querySelector('[data-plaza-action="interact"]')!
    .addEventListener("click", interact);
  refreshButton?.addEventListener("click", async () => {
    if (!onRefresh || refreshing) {
      return;
    }

    refreshing = true;
    const refreshingUiState = refreshSnapshot
      ? describeRefreshUiState(refreshSnapshot, true)
      : null;

    if (refreshButton && refreshingUiState) {
      refreshButton.disabled = true;
      refreshButton.textContent = refreshingUiState.actionLabel;
      promptElm.textContent = refreshingUiState.actionHint;
    }

    try {
      await onRefresh();
    } catch (error) {
      refreshing = false;
      if (refreshButton && refreshUiState) {
        refreshButton.disabled = false;
        refreshButton.textContent = refreshUiState.actionLabel;
      }
      promptElm.textContent =
        error instanceof Error && error.message.trim().length > 0
          ? error.message.trim()
          : "Refresh failed. Inspect provider status for fallback guidance.";
    }
  });
  root
    .querySelector('[data-plaza-action="back"]')!
    .addEventListener("click", onExit);

  function onKeyDown(event: KeyboardEvent) {
    if (event.code === "KeyE") {
      if (!interactionLatch) {
        interact();
      }
      interactionLatch = true;
    }

    if (
      event.code.startsWith("Arrow") ||
      ["KeyW", "KeyA", "KeyS", "KeyD", "KeyQ", "KeyE"].includes(event.code)
    ) {
      keyState.add(event.code);
    }
  }

  function onKeyUp(event: KeyboardEvent) {
    keyState.delete(event.code);
    if (event.code === "KeyE") {
      interactionLatch = false;
    }
  }

  function onPointerDown(event: PointerEvent) {
    dragging = true;
    lastPointerX = event.clientX;
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragging) {
      return;
    }

    const delta = event.clientX - lastPointerX;
    lastPointerX = event.clientX;
    cameraYaw -= delta * 0.012;
  }

  function onPointerUp() {
    dragging = false;
  }

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);

  function resize() {
    const { clientWidth, clientHeight } = canvasWrap;
    if (clientWidth === 0 || clientHeight === 0) {
      return;
    }

    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight, false);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvasWrap);
  resize();

  let frameId = 0;
  const worldLimit = 19;

  function animate() {
    frameId = requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;

    movementInput.set(
      (keyState.has("KeyD") || keyState.has("ArrowRight") ? 1 : 0) -
        (keyState.has("KeyA") || keyState.has("ArrowLeft") ? 1 : 0),
      (keyState.has("KeyW") || keyState.has("ArrowUp") ? 1 : 0) -
        (keyState.has("KeyS") || keyState.has("ArrowDown") ? 1 : 0)
    );

    if (keyState.has("KeyQ")) {
      cameraYaw += delta * 1.7;
    }
    if (keyState.has("KeyE")) {
      cameraYaw -= delta * 1.7;
    }

    cameraDirection.set(-Math.sin(cameraYaw), 0, -Math.cos(cameraYaw));
    sideDirection.set(cameraDirection.z, 0, -cameraDirection.x);
    moveDirection
      .copy(cameraDirection)
      .multiplyScalar(movementInput.y)
      .add(sideDirection.multiplyScalar(movementInput.x));

    if (moveDirection.lengthSq() > 0) {
      moveDirection.normalize();
      player.position.addScaledVector(moveDirection, 6.5 * delta);
      player.position.x = MathUtils.clamp(player.position.x, -worldLimit, worldLimit);
      player.position.z = MathUtils.clamp(player.position.z, -worldLimit, worldLimit);
      const targetRotation = Math.atan2(moveDirection.x, moveDirection.z);
      player.rotation.y = MathUtils.lerp(
        player.rotation.y,
        targetRotation,
        Math.min(1, delta * 8)
      );
      player.position.y = Math.sin(elapsed * 14) * 0.03;
    } else {
      player.position.y = 0;
    }

    residentMeshes.forEach(({ group, index }) => {
      group.position.y = Math.sin(elapsed * 1.7 + index) * 0.06;
      group.rotation.y = Math.sin(elapsed * 0.8 + index) * 0.22;
    });

    desiredCamera
      .copy(player.position)
      .addScaledVector(cameraDirection, -6.8)
      .add(new Vector3(0, 4.6, 0));
    camera.position.lerp(desiredCamera, Math.min(1, delta * 5));
    cameraLook.copy(player.position).add(new Vector3(0, 1.65, 0));
    camera.lookAt(cameraLook);

    const nearest = currentNearestInteractable();
    promptElm.textContent = nearest
      ? nearest.type === "resident"
        ? `Press E to inspect ${nearest.resident.agent.displayName}. ${nearest.resident.prompt}`
        : `Press E to inspect ${nearest.hotspot.name}. ${nearest.hotspot.prompt}`
      : "Walk toward a resident or hotspot to inspect it.";

    renderer.render(scene, camera);
  }

  animate();

  return {
    destroy() {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      disposableMaterials.forEach((material) => material.dispose());
      disposableTextures.forEach((texture) => texture.dispose());
      renderer.dispose();
    },
  };
}
