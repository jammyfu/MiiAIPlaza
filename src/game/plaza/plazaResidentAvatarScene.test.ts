import { expect, test } from "bun:test";
import { Box3, Group, Mesh, BoxGeometry, MeshBasicMaterial } from "three";
import { listMockResidents } from "../../providers/mockPlazaPresence";
import {
  createResidentAvatarRig,
  createResidentAvatarHeadModelUrl,
  describeResidentAvatarSceneMode,
  normalizeResidentAvatarHeadModel,
} from "./plazaResidentAvatarScene";

test("supported residents use the 3D head rig in the plaza scene", () => {
  for (const resident of listMockResidents()) {
    const rig = createResidentAvatarRig(resident);
    expect(rig).not.toBeNull();
    expect(rig!.mode).toBe("three-head");
    expect(rig!.headTargetHeight).toBeGreaterThan(0);
    expect(rig!.headAnchorY).toBeGreaterThan(0);
    expect(rig!.markerY).toBeGreaterThan(rig!.headAnchorY);
  }
});

test("resident avatar scene mode stays readable for supported and unsupported residents", () => {
  const supportedResident = listMockResidents()[0]!;
  expect(describeResidentAvatarSceneMode(supportedResident)).toBe(
    "3D resident head"
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

test("resident head model urls use the stable remote renderer path", () => {
  const supportedResident = listMockResidents()[0]!;
  const url = createResidentAvatarHeadModelUrl(supportedResident);
  expect(url).not.toBeNull();
  expect(url!).toContain(
    "https://mii-unsecure.ariankordi.net/miis/image.glb"
  );
  expect(url!).toContain("shaderType=miitomo");
  expect(url!).toContain("type=face");
  expect(url!).toContain("verifyCharInfo=0");
});

test("resident head normalization recenters and scales the imported head model", () => {
  const headScene = new Group();
  const mesh = new Mesh(
    new BoxGeometry(4, 6, 2),
    new MeshBasicMaterial()
  );
  mesh.position.set(3, 7, -2);
  headScene.add(mesh);

  normalizeResidentAvatarHeadModel(headScene, {
    anchorY: 1.08,
    targetHeight: 0.86,
  });

  const box = new Box3().setFromObject(headScene);
  const centerX = (box.min.x + box.max.x) / 2;
  const centerZ = (box.min.z + box.max.z) / 2;

  expect(box.min.y).toBeCloseTo(1.08, 4);
  expect(box.max.y - box.min.y).toBeCloseTo(0.86, 4);
  expect(centerX).toBeCloseTo(0, 4);
  expect(centerZ).toBeCloseTo(0, 4);
});
