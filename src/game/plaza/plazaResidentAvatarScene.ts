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
  mode: "three-head";
  headAnchorY: number;
  headTargetHeight: number;
  markerY: number;
};

const residentAvatarRig: ResidentAvatarRig = {
  mode: "three-head",
  headAnchorY: 1.08,
  headTargetHeight: 0.86,
  markerY: 2.55,
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
    ? "3D resident head"
    : "Fallback proxy geometry";
}

export function normalizeResidentAvatarHeadModel(
  headScene: Group,
  options: {
    anchorY: number;
    targetHeight: number;
  }
) {
  headScene.updateMatrixWorld(true);

  const bounds = new Box3().setFromObject(headScene);
  const size = bounds.getSize(new Vector3());
  if (size.y <= 0) {
    return;
  }

  const scaleFactor = options.targetHeight / size.y;
  headScene.scale.multiplyScalar(scaleFactor);
  headScene.updateMatrixWorld(true);

  const scaledBounds = new Box3().setFromObject(headScene);
  const center = scaledBounds.getCenter(new Vector3());
  const min = scaledBounds.min.clone();

  headScene.position.x -= center.x;
  headScene.position.z -= center.z;
  headScene.position.y += options.anchorY - min.y;
  headScene.updateMatrixWorld(true);
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

export function createResidentAvatarHeadModelUrl(
  resident: PlazaResident
): string | null {
  const avatarMii = createResidentAvatarMii(resident);
  if (!avatarMii) {
    return null;
  }

  return `${REMOTE_RENDERER_BASE_URL}.glb?shaderType=miitomo&type=face&width=260&verifyCharInfo=0&data=${bytesToHex(
    avatarMii.encodeStudio()
  )}`;
}

export async function buildResidentAvatarHeadModel(
  resident: PlazaResident,
  _renderer: WebGLRenderer
): Promise<Group | null> {
  const rig = createResidentAvatarRig(resident);
  if (!rig) {
    return null;
  }

  const gltfUrl = createResidentAvatarHeadModelUrl(resident);
  if (!gltfUrl) {
    return null;
  }

  const loader = new GLTFLoader();
  const headModel = await loader.loadAsync(gltfUrl);
  headModel.scene.name = "PlazaResidentHead";
  normalizeResidentAvatarHeadModel(headModel.scene, {
    anchorY: rig.headAnchorY,
    targetHeight: rig.headTargetHeight,
  });
  flagResidentAvatarMeshes(headModel.scene);

  const headRoot = new Group();
  headRoot.name = `PlazaResidentAvatar:${resident.agent.id}`;
  headRoot.add(headModel.scene);
  return headRoot;
}
