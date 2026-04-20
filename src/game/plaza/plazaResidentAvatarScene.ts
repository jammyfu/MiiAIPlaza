import {
  Box3,
  CanvasTexture,
  Group,
  Mesh,
  Sprite,
  SpriteMaterial,
  Vector3,
  type WebGLRenderer,
} from "three";
import type { PlazaResident } from "../../contracts/plaza";
import { LUTShaderMaterial } from "../../external/ffl.js/LUTShaderMaterial";
import {
  createResidentAvatarMii,
  supportsResidentAvatar,
} from "./plazaResidentAvatarAdapter";

export type ResidentAvatarRig = {
  mode: "local-body-render";
  bodyAnchorY: number;
  bodyTargetHeight: number;
  markerY: number;
};

const residentAvatarRig: ResidentAvatarRig = {
  mode: "local-body-render",
  bodyAnchorY: 0,
  bodyTargetHeight: 3.2,
  markerY: 3.75,
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
    ? "Local full-body render"
    : "Fallback proxy geometry";
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

async function renderLocalResidentBodyImage(
  resident: PlazaResident,
  renderer: WebGLRenderer
): Promise<string | null> {
  const avatarMii = createResidentAvatarMii(resident);
  if (!avatarMii) {
    return null;
  }

  const dataU8 = avatarMii.encodeStudio();
  const { getFFL, getFFLWorkerExists, getFFLWorkerMakeIcon } = await import(
    "../../main"
  );
  const { ViewType, createCharModel, createCharModelIcon, initCharModelTextures } =
    await import("../../external/ffl.js/ffl");

  if (getFFLWorkerExists()) {
    return (await getFFLWorkerMakeIcon(
      dataU8,
      "all_body_sugar",
      1024,
      1024
    )) as string;
  }

  let charModel: any;
  try {
    charModel = createCharModel(
      dataU8,
      undefined,
      LUTShaderMaterial,
      getFFL(),
      false
    );
    initCharModelTextures(charModel, renderer);
    return (await createCharModelIcon(
      charModel,
      renderer,
      ViewType.AllBody,
      1024,
      1024,
      true
    )) as string;
  } finally {
    charModel?.dispose?.();
  }
}

async function cropResidentBodyRender(dataUrl: string): Promise<{
  texture: CanvasTexture;
  width: number;
  height: number;
}> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const nextImage = new Image();
    nextImage.onload = () => resolve(nextImage);
    nextImage.onerror = () =>
      reject(new Error("Failed to load local resident body render."));
    nextImage.src = dataUrl;
  });

  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = image.naturalWidth || image.width;
  sourceCanvas.height = image.naturalHeight || image.height;
  const sourceContext = sourceCanvas.getContext("2d");
  if (!sourceContext) {
    throw new Error("Could not read local resident body render.");
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

  const paddingX = Math.max(8, Math.round((maxX - minX + 1) * 0.06));
  const paddingY = Math.max(8, Math.round((maxY - minY + 1) * 0.04));
  const cropX = Math.max(0, minX - paddingX);
  const cropY = Math.max(0, minY - paddingY);
  const cropWidth = Math.min(sourceCanvas.width - cropX, maxX - minX + 1 + paddingX * 2);
  const cropHeight = Math.min(
    sourceCanvas.height - cropY,
    maxY - minY + 1 + paddingY * 2
  );

  const croppedCanvas = document.createElement("canvas");
  croppedCanvas.width = cropWidth;
  croppedCanvas.height = cropHeight;
  const croppedContext = croppedCanvas.getContext("2d");
  if (!croppedContext) {
    throw new Error("Could not crop local resident body render.");
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

export async function buildResidentAvatarModel(
  resident: PlazaResident,
  renderer: WebGLRenderer
): Promise<Group | null> {
  const rig = createResidentAvatarRig(resident);
  if (!rig) {
    return null;
  }

  const renderUrl = await renderLocalResidentBodyImage(resident, renderer);
  if (!renderUrl) {
    return null;
  }

  const { texture, width, height } = await cropResidentBodyRender(renderUrl);

  const aspectRatio = width > 0 && height > 0 ? width / height : 0.72;
  const planeHeight = rig.bodyTargetHeight;
  const planeWidth = planeHeight * aspectRatio;

  const avatarSprite = new Sprite(
    new SpriteMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.02,
      depthWrite: false,
    })
  );
  avatarSprite.name = "PlazaResidentBodyRender";
  avatarSprite.center.set(0.5, 0);
  avatarSprite.scale.set(planeWidth, planeHeight, 1);
  avatarSprite.position.y = rig.bodyAnchorY;

  const avatarRoot = new Group();
  avatarRoot.name = `PlazaResidentAvatar:${resident.agent.id}`;
  avatarRoot.add(avatarSprite);
  return avatarRoot;
}
