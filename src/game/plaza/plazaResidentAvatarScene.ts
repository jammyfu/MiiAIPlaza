import {
  Box3,
  Color,
  Group,
  Vector3,
  Vector4,
  type Mesh,
  type Object3D,
  type WebGLRenderer,
} from "three";
import { cMaterialName } from "../../class/3d/shader/fflShaderConst";
import type { PlazaResident } from "../../contracts/plaza";
import {
  createResidentAvatarMii,
  supportsResidentAvatar,
} from "./plazaResidentAvatarAdapter";
import { LUTShaderMaterial } from "../../external/ffl.js/LUTShaderMaterial";

export type ResidentAvatarRig = {
  mode: "local-ffl-body";
  bodyAnchorY: number;
  bodyTargetHeight: number;
  markerY: number;
};

const residentAvatarRig: ResidentAvatarRig = {
  mode: "local-ffl-body",
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
    ? "Local FFL full-body"
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

type BodyModelSet = {
  m?: Group;
  f?: Group;
};

function getBodyModelSet(): BodyModelSet | null {
  const globalBodyModels = (globalThis as { bodyModels?: { Miitomo?: BodyModelSet } })
    .bodyModels;
  return globalBodyModels?.Miitomo ?? null;
}

function buildLocalBodyModel(charModel: any): Group | null {
  const bodyModels = getBodyModelSet();
  if (!bodyModels) {
    return null;
  }

  const gender = charModel._getGender();
  const bodyModel = (gender === 0 ? bodyModels.m : bodyModels.f)?.clone(
    true
  ) as Group | undefined;
  if (!bodyModel) {
    return null;
  }

  const bodyMeshName = gender === 0 ? "body_m" : "body_f";
  const handsMeshName = gender === 0 ? "hands_m" : "hands_f";
  const legsMeshName = gender === 0 ? "legs_m" : "legs_f";

  const bodyMesh = bodyModel.getObjectByName(bodyMeshName) as Mesh | null;
  const handsMesh = bodyModel.getObjectByName(handsMeshName) as Mesh | null;
  const legsMesh = bodyModel.getObjectByName(legsMeshName) as Mesh | null;

  const bodyScale = charModel.getBodyScale();
  bodyModel.scale.set(bodyScale.x * 10, bodyScale.y * 10, bodyScale.z * 10);

  const bodyBounds = new Box3().setFromObject(bodyModel);
  bodyModel.position.set(0, -bodyBounds.max.y, 0);

  const favoriteColor = charModel._getFavoriteColor(true);

  if (bodyMesh) {
    bodyMesh.material = new LUTShaderMaterial({
      modulateType: cMaterialName.FFL_MODULATE_TYPE_SHAPE_BODY,
      modulateMode: 0,
      modulateColor: new Vector4(
        favoriteColor.r,
        favoriteColor.g,
        favoriteColor.b,
        1
      ),
    });
  }

  if (legsMesh) {
    legsMesh.material = new LUTShaderMaterial({
      modulateType: cMaterialName.FFL_MODULATE_TYPE_SHAPE_PANTS,
      modulateMode: 0,
      modulateColor: new Vector4(0.3, 0.3, 0.3, 1),
    });
  }

  if (handsMesh?.material && "color" in handsMesh.material) {
    (handsMesh.material as { color: Color }).color = new Color("#f0cfaf");
  }

  return bodyModel;
}

export async function buildResidentAvatarModel(
  resident: PlazaResident,
  renderer: WebGLRenderer
): Promise<Group | null> {
  const rig = createResidentAvatarRig(resident);
  if (!rig) {
    return null;
  }

  const avatarMii = createResidentAvatarMii(resident);
  if (!avatarMii) {
    return null;
  }

  const { createCharModel, initCharModelTextures, FFLCharModelDescDefault } =
    await import("../../external/ffl.js/ffl");
  const { getFFL } = await import("../../main");

  const charModel = createCharModel(
    avatarMii.encodeStudio(),
    {
      ...FFLCharModelDescDefault,
      resolution: 512,
      allExpressionFlag: new Uint32Array([1, 0, 0]),
    },
    LUTShaderMaterial,
    getFFL(),
    false
  );
  initCharModelTextures(charModel, renderer);

  const avatarScene = new Group();
  avatarScene.name = "PlazaResidentBody";

  const bodyModel = buildLocalBodyModel(charModel);
  if (bodyModel) {
    avatarScene.add(bodyModel);
  }

  avatarScene.add(charModel.meshes.clone());
  flagResidentAvatarMeshes(avatarScene);
  normalizeResidentAvatarModel(avatarScene, {
    anchorY: rig.bodyAnchorY,
    targetHeight: rig.bodyTargetHeight,
  });

  const avatarRoot = new Group();
  avatarRoot.name = `PlazaResidentAvatar:${resident.agent.id}`;
  avatarRoot.userData.charModel = charModel;
  avatarRoot.add(avatarScene);
  return avatarRoot;
}
