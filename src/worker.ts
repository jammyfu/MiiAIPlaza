import { WebGLRenderer } from "three";
import * as FFL from "./external/ffl.js/ffl";
import { LUTShaderMaterial } from "./external/ffl.js/LUTShaderMaterial.js";

export type FFLWorkerMessage =
  | FFLWorkerInitializeMessage
  | FFLWorkerCreateIconMessage;

export type FFLWorkerInitializeMessage = {
  type: "Init"; // request type
  resourcePath: any; // Path to resource file
  offscreenCanvas: OffscreenCanvas; // Path to resource file
};
export type FFLWorkerCreateIconMessage = {
  type: "MakeIcon"; // request type
  data: Uint8Array; // commonly studio data?
  view: string; // commonly studio data?
  id: string; // random id
  width?: number;
  height?: number;
};

let FFLModule: any,
  offscreenCanvas: OffscreenCanvas,
  workerRenderer: WebGLRenderer;

function initRenderer() {
  workerRenderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: offscreenCanvas,
  });
}

self.onmessage = async (e) => {
  const input = e.data as FFLWorkerMessage;
  switch (input.type) {
    case "Init": {
      FFLModule = (await import("./external/ffl.js/ffl-emscripten.js")).default
        .Module as any;
      await FFL.loadBodyModels();
      await FFL.initializeFFLWithResource(input.resourcePath, FFLModule);
      offscreenCanvas = input.offscreenCanvas;
      initRenderer();
      postMessage({ ready: true });
      break;
    }
    case "MakeIcon": {
      // Momentarily create CharModel
      let dataURL: { type: string; result: Blob | string } = {
          type: "dataURL",
          result: "",
        },
        model: any;
      try {
        const dataU8 = input.data;
        model = FFL.createCharModel(
          dataU8,
          undefined,
          LUTShaderMaterial,
          FFLModule,
          false
        );
        FFL.initCharModelTextures(model, workerRenderer);
        let realView = FFL.ViewType.MakeIcon;
        switch (input.view) {
          case "face":
          case "variableiconbody":
            realView = FFL.ViewType.MakeIcon;
            break;
          case "all_body_sugar":
            realView = FFL.ViewType.AllBody;
            break;
        }
        const width = input.width ?? 512;
        const height = input.height ?? width;
        const useBody = input.view === "all_body_sugar";
        dataURL = await FFL.createCharModelIcon(
          model,
          workerRenderer,
          realView,
          width,
          height,
          useBody
        );
      } catch (e) {
        console.error(`Library error: Could not make icon`, e);
      } finally {
        model.dispose();
        postMessage({ id: input.id, result: dataURL.result });
      }
    }
  }
};
