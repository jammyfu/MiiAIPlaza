import {
  Box3,
  CanvasTexture,
  Group,
  Sprite,
  SpriteMaterial,
  Vector3,
  type Object3D,
  type WebGLRenderer,
} from "three";
import type { PlazaResident } from "../../contracts/plaza";
import {
  createResidentAvatarMii,
  supportsResidentAvatar,
} from "./plazaResidentAvatarAdapter";
import { Config } from "../../config";
import { clone as cloneSkeletonScene } from "three/addons/utils/SkeletonUtils.js";

export type ResidentAvatarRig = {
  mode: "local-body-glb";
  bodyAnchorY: number;
  bodyScale: number;
  headAnchorY: number;
  headTargetHeight: number;
  markerY: number;
};

const residentAvatarRig: ResidentAvatarRig = {
  mode: "local-body-glb",
  bodyAnchorY: 0,
  bodyScale: 0.024,
  headAnchorY: 1.52,
  headTargetHeight: 0.74,
  markerY: 2.7,
};

export function createResidentAvatarRig(
  resident: PlazaResident
): ResidentAvatarRig | null {
  if (!supportsResidentAvatar(resident)) {
    return null;
  }

  return residentAvatarRig;
}

export function describeResidentAvatarSceneMode(
  resident: PlazaResident
): string {
  return createResidentAvatarRig(resident)
    ? "Local body GLB + remote head render"
    : "Fallback proxy geometry";
}

export function buildResidentRemoteHeadRenderUrl(
  resident: PlazaResident,
  options: { width?: number } = {}
): string | null {
  const avatarMii = createResidentAvatarMii(resident);
  if (!avatarMii) {
    return null;
  }

  const params = new URLSearchParams();
  params.set("data", avatarMii.encodeStudio().toString("hex"));
  params.set("type", "face");
  params.set("shaderType", "miitomo");
  params.set("width", String(options.width ?? 256));
  params.set("verifyCharInfo", "0");

  return `${Config.renderer.publicBaseURL}.png?${params.toString()}`;
}

export function normalizeResidentAvatarModel(
  avatarScene: Group,
  options: {
    anchorY: number;
    targetHeight: number;
  }
) {
  avatarScene.updateMatrixWorld(true);

  const bounds = new Box3().setFromObject(avatarScene);
  const size = bounds.getSize(new Vector3());
  if (size.y <= 0) {
    return;
  }

  const scaleFactor = options.targetHeight / size.y;
  avatarScene.scale.multiplyScalar(scaleFactor);
  avatarScene.updateMatrixWorld(true);

  const scaledBounds = new Box3().setFromObject(avatarScene);
  const center = scaledBounds.getCenter(new Vector3());
  const min = scaledBounds.min.clone();

  avatarScene.position.x -= center.x;
  avatarScene.position.z -= center.z;
  avatarScene.position.y += options.anchorY - min.y;
  avatarScene.updateMatrixWorld(true);
}

function flagResidentAvatarMeshes(object: Object3D) {
  object.traverse((child) => {
    const maybeMesh = child as Object3D & {
      isMesh?: boolean;
      castShadow?: boolean;
      receiveShadow?: boolean;
    };
    if (!maybeMesh.isMesh) {
      return;
    }

    maybeMesh.castShadow = true;
    maybeMesh.receiveShadow = true;
  });
}

function alignResidentBodyModel(
  bodyScene: Group,
  options: { anchorY: number; scale: number }
) {
  bodyScene.scale.setScalar(options.scale);
  bodyScene.updateMatrixWorld(true);

  const bounds = new Box3().setFromObject(bodyScene);
  const center = bounds.getCenter(new Vector3());
  const min = bounds.min.clone();

  bodyScene.position.set(-center.x, options.anchorY - min.y, -center.z);
  bodyScene.rotation.y = Math.PI;
  bodyScene.updateMatrixWorld(true);
}

export function cloneResidentBodyScene(bodyScene: Group): Group {
  return cloneSkeletonScene(bodyScene);
}

async function cropResidentRender(sourceUrl: string): Promise<{
  texture: CanvasTexture;
  width: number;
  height: number;
}> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const nextImage = new Image();
    nextImage.crossOrigin = "anonymous";
    nextImage.onload = () => resolve(nextImage);
    nextImage.onerror = () =>
      reject(new Error("Failed to load resident render."));
    nextImage.src = sourceUrl;
  });

  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = image.naturalWidth || image.width;
  sourceCanvas.height = image.naturalHeight || image.height;
  const sourceContext = sourceCanvas.getContext("2d");
  if (!sourceContext) {
    throw new Error("Could not read local resident render.");
  }

  sourceContext.drawImage(image, 0, 0);
  const imageData = sourceContext.getImageData(
    0,
    0,
    sourceCanvas.width,
    sourceCanvas.height
  );

  let minX = sourceCanvas.width;
  let minY = sourceCanvas.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < sourceCanvas.height; y += 1) {
    for (let x = 0; x < sourceCanvas.width; x += 1) {
      const alpha = imageData.data[(y * sourceCanvas.width + x) * 4 + 3];
      if (alpha < 16) {
        continue;
      }

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (maxX < minX || maxY < minY) {
    const fallbackTexture = new CanvasTexture(sourceCanvas);
    fallbackTexture.colorSpace = "srgb";
    fallbackTexture.needsUpdate = true;
    return {
      texture: fallbackTexture,
      width: sourceCanvas.width,
      height: sourceCanvas.height,
    };
  }

  const paddingX = Math.max(6, Math.round((maxX - minX + 1) * 0.05));
  const paddingY = Math.max(6, Math.round((maxY - minY + 1) * 0.05));
  const cropX = Math.max(0, minX - paddingX);
  const cropY = Math.max(0, minY - paddingY);
  const cropWidth = Math.min(
    sourceCanvas.width - cropX,
    maxX - minX + 1 + paddingX * 2
  );
  const cropHeight = Math.min(
    sourceCanvas.height - cropY,
    maxY - minY + 1 + paddingY * 2
  );

  const croppedCanvas = document.createElement("canvas");
  croppedCanvas.width = cropWidth;
  croppedCanvas.height = cropHeight;
  const croppedContext = croppedCanvas.getContext("2d");
  if (!croppedContext) {
    throw new Error("Could not crop local resident render.");
  }

  croppedContext.drawImage(
    sourceCanvas,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  const texture = new CanvasTexture(croppedCanvas);
  texture.colorSpace = "srgb";
  texture.needsUpdate = true;
  return {
    texture,
    width: cropWidth,
    height: cropHeight,
  };
}

async function buildResidentHeadSprite(
  resident: PlazaResident,
  rig: ResidentAvatarRig
): Promise<Sprite | null> {
  const renderUrl = buildResidentRemoteHeadRenderUrl(resident);
  if (!renderUrl) {
    return null;
  }

  const { texture, width, height } = await cropResidentRender(renderUrl);
  const aspectRatio = width > 0 && height > 0 ? width / height : 0.82;

  const headSprite = new Sprite(
    new SpriteMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.02,
      depthWrite: false,
    })
  );
  headSprite.name = "PlazaResidentHeadRender";
  headSprite.center.set(0.5, 0);
  headSprite.scale.set(rig.headTargetHeight * aspectRatio, rig.headTargetHeight, 1);
  headSprite.position.y = rig.headAnchorY;
  return headSprite;
}

function getResidentBodyModelPath(resident: PlazaResident): string | null {
  const avatarMii = createResidentAvatarMii(resident);
  if (!avatarMii) {
    return null;
  }

  return avatarMii.gender === 0
    ? "/assets/models/miiBodyM_miitomo.glb"
    : "/assets/models/miiBodyF_miitomo.glb";
}

export async function buildResidentAvatarModel(
  resident: PlazaResident,
  _renderer: WebGLRenderer
): Promise<Group | null> {
  const rig = createResidentAvatarRig(resident);
  if (!rig) {
    return null;
  }

  const modelPath = getResidentBodyModelPath(resident);
  if (!modelPath) {
    return null;
  }

  const avatarRoot = new Group();
  avatarRoot.name = `PlazaResidentAvatar:${resident.agent.id}`;
  let hasBody = false;
  let hasHeadSprite = false;

  try {
    const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(modelPath);

    const bodyScene = cloneResidentBodyScene(gltf.scene);
    bodyScene.name = "PlazaResidentBody";
    alignResidentBodyModel(bodyScene, {
      anchorY: rig.bodyAnchorY,
      scale: rig.bodyScale,
    });
    flagResidentAvatarMeshes(bodyScene);
    avatarRoot.add(bodyScene);
    hasBody = true;
  } catch (error) {
    console.error(
      `Plaza resident body GLB failed for ${resident.agent.id}.`,
      error
    );
  }

  try {
    const headSprite = await buildResidentHeadSprite(resident, rig);
    if (headSprite) {
      avatarRoot.add(headSprite);
      hasHeadSprite = true;
    }
  } catch (error) {
    console.error(
      `Plaza resident head sprite failed for ${resident.agent.id}.`,
      error
    );
  }

  if (!hasBody && !hasHeadSprite) {
    return null;
  }

  avatarRoot.userData.avatarKind = hasBody ? "body" : "head";
  avatarRoot.userData.hasHeadSprite = hasHeadSprite;
  return avatarRoot;
}
