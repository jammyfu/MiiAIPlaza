import { expect, test } from "bun:test";
import {
  Bone,
  Box3,
  BoxGeometry,
  Group,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  Skeleton,
  SkinnedMesh,
  Uint16BufferAttribute,
  Vector3,
} from "three";
import { listMockResidents } from "../../providers/mockPlazaPresence";
import {
  buildResidentRemoteHeadRenderUrl,
  cloneResidentBodyScene,
  createResidentAvatarRig,
  describeResidentAvatarSceneMode,
  normalizeResidentAvatarModel,
} from "./plazaResidentAvatarScene";

test("supported residents use the local full-body rig in the plaza scene", () => {
  for (const resident of listMockResidents()) {
    const rig = createResidentAvatarRig(resident);
    expect(rig).not.toBeNull();
    expect(rig!.mode).toBe("local-body-glb");
    expect(rig!.bodyScale).toBeGreaterThan(0);
    expect(rig!.headTargetHeight).toBeGreaterThan(0);
    expect(rig!.bodyAnchorY).toBeGreaterThanOrEqual(0);
    expect(rig!.markerY).toBeGreaterThan(rig!.bodyAnchorY);
  }
});

test("resident avatar scene mode stays readable for supported and unsupported residents", () => {
  const supportedResident = listMockResidents()[0]!;
  expect(describeResidentAvatarSceneMode(supportedResident)).toBe(
    "Local body GLB + remote head render"
  );

  const unsupportedResident = {
    ...supportedResident,
    agent: {
      ...supportedResident.agent,
      id: "unknown-resident",
    },
  };
  expect(createResidentAvatarRig(unsupportedResident)).toBeNull();
  expect(describeResidentAvatarSceneMode(unsupportedResident)).toBe(
    "Fallback proxy geometry"
  );
});

test("resident model normalization recenters and scales the imported avatar model", () => {
  const headScene = new Group();
  const mesh = new Mesh(
    new BoxGeometry(4, 6, 2),
    new MeshBasicMaterial()
  );
  mesh.position.set(3, 7, -2);
  headScene.add(mesh);

  normalizeResidentAvatarModel(headScene, {
    anchorY: 0,
    targetHeight: 2.55,
  });

  const box = new Box3().setFromObject(headScene);
  const centerX = (box.min.x + box.max.x) / 2;
  const centerZ = (box.min.z + box.max.z) / 2;

  expect(box.min.y).toBeCloseTo(0, 4);
  expect(box.max.y - box.min.y).toBeCloseTo(2.55, 4);
  expect(centerX).toBeCloseTo(0, 4);
  expect(centerZ).toBeCloseTo(0, 4);
});

test("resident remote head render url targets the public renderer", () => {
  const resident = listMockResidents()[0]!;
  const renderUrl = buildResidentRemoteHeadRenderUrl(resident, { width: 180 });
  expect(renderUrl).not.toBeNull();

  const url = new URL(renderUrl!);
  expect(url.origin).toBe("https://mii-unsecure.ariankordi.net");
  expect(url.pathname).toBe("/miis/image.png");
  expect(url.searchParams.get("type")).toBe("face");
  expect(url.searchParams.get("shaderType")).toBe("miitomo");
  expect(url.searchParams.get("width")).toBe("180");
});

test("resident body cloning keeps skinned bones detached from the original scene", () => {
  const root = new Group();
  const bone = new Bone();
  bone.name = "root-bone";
  bone.position.y = 1;

  const geometry = new BoxGeometry(1, 1, 1);
  const vertexCount = geometry.attributes.position.count;
  const skinIndices = new Uint16Array(vertexCount * 4);
  const skinWeights = new Float32Array(vertexCount * 4);
  for (let index = 0; index < vertexCount; index += 1) {
    skinIndices[index * 4] = 0;
    skinWeights[index * 4] = 1;
  }
  geometry.setAttribute("skinIndex", new Uint16BufferAttribute(skinIndices, 4));
  geometry.setAttribute("skinWeight", new Uint16BufferAttribute(skinWeights, 4));

  const skinnedMesh = new SkinnedMesh(geometry, new MeshBasicMaterial());
  const skeleton = new Skeleton([bone]);
  const bindMatrix = new Matrix4();
  root.add(bone);
  root.add(skinnedMesh);
  skinnedMesh.bind(skeleton, bindMatrix);

  const clone = cloneResidentBodyScene(root);
  const clonedMesh = clone.getObjectByProperty("type", "SkinnedMesh") as SkinnedMesh;

  expect(clonedMesh).toBeDefined();
  expect(clonedMesh).not.toBe(skinnedMesh);
  expect(clonedMesh.skeleton).not.toBe(skinnedMesh.skeleton);
  expect(clonedMesh.skeleton.bones[0]).not.toBe(skinnedMesh.skeleton.bones[0]);
  expect(clonedMesh.skeleton.bones[0]?.name).toBe("root-bone");
});
