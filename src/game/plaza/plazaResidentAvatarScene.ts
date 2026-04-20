import {
  Box3,
  Group,
  Vector3,
  type Mesh,
  type Object3D,
} from "three";
import type { WebGLRenderer } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import type { PlazaResident } from "../../contracts/plaza";
import {
  createResidentAvatarMii,
  supportsResidentAvatar,
} from "./plazaResidentAvatarAdapter";

const REMOTE_RENDERER_BASE_URL =
  "https://mii-unsecure.ariankordi.net/miis/image";

export type ResidentAvatarRig = {
  mode: "studio-body-glb";
  bodyAnchorY: number;
  bodyTargetHeight: number;
  markerY: number;
};

const residentAvatarRig: ResidentAvatarRig = {
  mode: "studio-body-glb",
  bodyAnchorY: 0,
  bodyTargetHeight: 3.1,
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
    ? "Studio full-body GLB"
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

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function flagResidentAvatarMeshes(object: Object3D) {
  object.traverse((child) => {
    const maybeMesh = child as Mesh;
    if (!("isMesh" in maybeMesh) || !maybeMesh.isMesh) {
      return;
    }

    maybeMesh.castShadow = true;
    maybeMesh.receiveShadow = true;
  });
}

export function createResidentAvatarModelUrl(
  resident: PlazaResident
): string | null {
  const avatarMii = createResidentAvatarMii(resident);
  if (!avatarMii) {
    return null;
  }

  return avatarMii.studioUrl({
    ext: "glb",
    type: "all_body",
    width: 512,
  });
}

export async function buildResidentAvatarModel(
  resident: PlazaResident,
  _renderer: WebGLRenderer
): Promise<Group | null> {
  const rig = createResidentAvatarRig(resident);
  if (!rig) {
    return null;
  }

  const gltfUrl = createResidentAvatarModelUrl(resident);
  if (!gltfUrl) {
    return null;
  }

  const loader = new GLTFLoader();
  const avatarModel = await loader.loadAsync(gltfUrl);
  avatarModel.scene.name = "PlazaResidentBody";
  normalizeResidentAvatarModel(avatarModel.scene, {
    anchorY: rig.bodyAnchorY,
    targetHeight: rig.bodyTargetHeight,
  });
  flagResidentAvatarMeshes(avatarModel.scene);

  const avatarRoot = new Group();
  avatarRoot.name = `PlazaResidentAvatar:${resident.agent.id}`;
  avatarRoot.add(avatarModel.scene);
  return avatarRoot;
}
