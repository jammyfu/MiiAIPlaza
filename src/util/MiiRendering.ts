import type { GLTF } from "three/examples/jsm/Addons.js";
import Mii from "../external/mii-js/mii";
import * as THREE from "three";
import { RandomInt } from "./Numbers";
import { cMaterialName } from "../class/3d/shader/fflShaderConst";
import {
  CharModel,
  createCharModel,
  FFLCharModelDesc,
  FFLCharModelDescDefault,
  FFLModelFlag,
  initCharModelTextures,
  setMaskTextureHook,
} from "../external/ffl.js/ffl";
import { getFFL } from "../main";
import type { Mii3DScene } from "../class/3DScene";

export type GLTFLike = {
  animations: any[];
  asset: {};
  cameras: any[];
  parser: any;
  scene: THREE.Object3D;
  scenes: any[];
  userData: any;
};

function uint8ArrayToHex(data: Uint8Array) {
  return Array.from(data, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

const maskTextureCache = new Map<string, Promise<string>>();

export type ModelFlag =
  | "NORMAL"
  | "HAT"
  | "FACE_ONLY"
  | "FLATTEN_NOSE"
  | "NEW_EXPRESSIONS"
  | "NEW_MASK_ONLY";

export async function getHeadModel(
  mii: Mii,
  Mii3DScene: Mii3DScene,
  modelFlag: ModelFlag,
  charModelRef?: CharModel,
  rendererRef?: THREE.WebGLRenderer,
  descOrExpFlag?: Object | any[] | Uint32Array | null
): Promise<GLTF> {
  // In the future, this could be hooked up to a custom rendering library (FFL under WASM or a custom asset loader)
  // For now, this will just return a cube with some FFL shader properties to test if it's working.

  const dataU8 = mii.encodeStudio();

  const modelDesc = {
    ...FFLCharModelDescDefault,
    resolution: 512,
    allExpressionFlag: new Uint32Array([1, 0, 0]),
    modelFlag: FFLModelFlag[modelFlag],
  };

  let currentCharModel: CharModel | null;

  try {
    currentCharModel = createCharModel(
      dataU8,
      modelDesc,
      window.LUTShaderMaterial,
      // window.FFLShaderMaterial,
      getFFL(),
      false
    );
    // Initialize textures for a newly created CharModel.
    initCharModelTextures(currentCharModel, Mii3DScene.getRenderer());
  } catch (err) {
    currentCharModel = null;
    console.error("Error creating/updating CharModel:", err);
    throw err;
  }

  const asset = {
    extras: {
      partsTransform: {
        hatTranslate: [0, 0, 0],
      },
    },
  };

  let scene = new THREE.Group();

  scene.add(currentCharModel.meshes);

  // GLTF-like object so that the code can still handle it sort of like one
  return {
    animations: [],
    asset,
    cameras: [],
    parser: {},
    scene,
    scenes: [scene],
    userData: {},
    CharModel: currentCharModel,
  } as GLTFLike as GLTF;
}

export type MaskResult = {
  img: string;
  model?: CharModel;
};

export async function getMaskTex(
  mii: Mii,
  Mii3DScene: Mii3DScene
): Promise<MaskResult> {
  const dataU8 = mii.encodeStudio();
  const cacheKey = uint8ArrayToHex(dataU8);

  const cachedMask = maskTextureCache.get(cacheKey);
  if (cachedMask) {
    return { img: await cachedMask };
  }

  const modelDesc = {
    ...FFLCharModelDescDefault,
    resolution: 512,
    allExpressionFlag: new Uint32Array([1, 0, 0]),
  };

  let currentCharModel: CharModel | undefined;

  try {
    currentCharModel = createCharModel(
      dataU8,
      modelDesc,
      window.LUTShaderMaterial,
      // window.FFLShaderMaterial,
        getFFL(),
      false
    );

    const imgPromise = new Promise<string>((resolve) => {
      setMaskTextureHook((dataURL: any) => {
        resolve(dataURL.result);
      });
      initCharModelTextures(currentCharModel!, Mii3DScene.getRenderer());
    });

    maskTextureCache.set(cacheKey, imgPromise);
    const img = await imgPromise;
    return { img, model: currentCharModel };
  } catch (err) {
    maskTextureCache.delete(cacheKey);
    console.error("Error creating/updating CharModel:", err);
    throw err;
  }
}
