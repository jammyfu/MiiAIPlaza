import Mii from "./external/mii-js/mii";
import { Buffer as Buf } from "../node_modules/buffer/index";
import { setupUi } from "./ui/setup";
import { MiiEditor } from "./class/MiiEditor";
import LazyLoad, { type ILazyLoadInstance } from "vanilla-lazyload";
import { langManager } from "./l10n/manager";
import * as Sentry from "@sentry/browser";
import { Config } from "./config";
import Modal, { buttonsOkCancel, closeModal } from "./ui/components/Modal";
import {
  initializeFFLWithResource,
  loadBodyModels,
} from "./external/ffl.js/ffl.js";
import type { FFLShaderMaterial } from "./external/ffl.js/FFLShaderMaterial.js";
import type { LUTShaderMaterial } from "./external/ffl.js/LUTShaderMaterial.js";
import type { FFLWorkerInitializeMessage, FFLWorkerMessage } from "./worker.js";
import {
  clearPerfTraceSummary,
  getPerfTraceCategorySummary,
  getPerfTraceSummary,
  isPerfTraceEnabled,
  printPerfTraceCategorySummary,
  printPerfTraceSummary,
} from "./util/PerfTrace.js";

declare global {
  interface Window {
    buffer: Buf;
    editor: MiiEditor;
    firstVisit: boolean;
    LazyLoad: ILazyLoadInstance;
    localforage: LocalForage;
    Mii: any;
    mii: Mii;
    sentryOnLoad: any;

    // New stuff
    FFLShaderMaterial: FFLShaderMaterial;
    LUTShaderMaterial: LUTShaderMaterial;
    clearMiiPerfTraceSummary: typeof clearPerfTraceSummary;
    getMiiPerfTraceCategorySummary: typeof getPerfTraceCategorySummary;
    getMiiPerfTraceSummary: typeof getPerfTraceSummary;
    printMiiPerfTraceCategorySummary: typeof printPerfTraceCategorySummary;
    printMiiPerfTraceSummary: typeof printPerfTraceSummary;
  }
}

//@ts-expect-error Buffer to keep in window for debugging purposes
window.buffer = Buf;

window.LazyLoad = new LazyLoad();
window.getMiiPerfTraceCategorySummary = getPerfTraceCategorySummary;
window.getMiiPerfTraceSummary = getPerfTraceSummary;
window.clearMiiPerfTraceSummary = clearPerfTraceSummary;
window.printMiiPerfTraceCategorySummary = printPerfTraceCategorySummary;
window.printMiiPerfTraceSummary = printPerfTraceSummary;

if (isPerfTraceEnabled()) {
  console.info(
    "[perf] Profiling enabled. Use window.printMiiPerfTraceSummary('total', 10), window.printMiiPerfTraceCategorySummary('total'), or window.clearMiiPerfTraceSummary()."
  );
}

if (Config.apis.useSentry) {
  Sentry.init({
    dsn: Config.apis.sentryURL,
    tracesSampleRate: 0.01,
  });
}

// Make the theme ready before settings is initialized
document.documentElement.dataset.theme = "default";
const searchParams =
  typeof location === "undefined"
    ? new URLSearchParams()
    : new URLSearchParams(location.search);
const isPlazaBoot = searchParams.has("plaza");

let FFL: any, FFLWorker: Worker | undefined;
export const getFFL = () => FFL;
export const getFFLWorker = () => FFLWorker;
export const getFFLWorkerExists = () => FFLWorker !== undefined;
const blobToDataURL = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
export const getFFLWorkerMakeIcon = (
  data: Uint8Array,
  view: string,
  width?: number,
  height?: number
) => {
  if (FFLWorker === undefined)
    throw new Error("FFL worker told to make icon, but it wasn't initialized");

  return new Promise((resolve, reject) => {
    sendMessageToWorker({
      type: "MakeIcon",
      data,
      view,
      width,
      height,
    } as FFLWorkerMessage)
      .then(async (resp) => {
        if (resp instanceof Blob) {
          resolve(await blobToDataURL(resp));
          return;
        }

        resolve(resp);
      })
      .catch((err) => reject(err));
  });
};
let sendMessageToWorker: (data: any) => Promise<any>;

// Depending on config, load FFL.js
if (Config.renderer.useRendererServer === false && !isPlazaBoot) {
  var m = Modal.modal(
    "Notice",
    "Mii Creator is loading assets, please wait..."
  );

  FFL = (await import("./external/ffl.js/ffl-emscripten.js")).default
    .Module as any;

  await loadBodyModels();
  await initializeFFLWithResource(Config.renderer.fflResourcePath, FFL);

  // Detect and use Web Workers/OffscreenCanvas if available, to optimize icon generation
  if (window.Worker) {
    if (window.OffscreenCanvas) {
      const tempOffscreenCanvas = document.createElement("canvas");
      const offscreenCanvas = tempOffscreenCanvas.transferControlToOffscreen();
      FFLWorker = new Worker("./dist/worker.js", { type: "module" });

      sendMessageToWorker = (data: any) => {
        return new Promise((resolve, reject) => {
          const requestId = Math.random().toString(36).substring(7);

          function handleMessage(event: MessageEvent) {
            const { id, result, error } = event.data;
            if (id === requestId) {
              FFLWorker!.removeEventListener("message", handleMessage);
              error ? reject(error) : resolve(result);
            }
          }

          FFLWorker!.addEventListener("message", handleMessage);
          FFLWorker!.postMessage({ id: requestId, ...data });
        });
      };

      FFLWorker.postMessage(
        {
          type: "Init",
          resourcePath: Config.renderer.fflResourcePath,
          offscreenCanvas,
        } as FFLWorkerInitializeMessage,
        [offscreenCanvas]
      );
      await new Promise<void>((resolve) => {
        FFLWorker!.onmessage = (e) => {
          if (e.data.ready) {
            resolve();
          }
        };
      });
    } else {
      Modal.modal(
        "Notice",
        "Your browser doesn't support OffscreenCanvas, so Mii Creator may experience lag.",
        "body",
        ...buttonsOkCancel
      );
    }
  } else {
    Modal.modal(
      "Notice",
      "Your browser doesn't support Web Workers, so Mii Creator may experience lag.",
      "body",
      ...buttonsOkCancel
    );
  }
  closeModal(m);
}

langManager.getString("languages.en_US");
setupUi();
