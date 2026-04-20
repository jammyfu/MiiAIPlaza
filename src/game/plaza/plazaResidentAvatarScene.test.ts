import { expect, test } from "bun:test";
import { Box3, Group, Mesh, BoxGeometry, MeshBasicMaterial } from "three";
import { listMockResidents } from "../../providers/mockPlazaPresence";
import {
  createResidentAvatarRig,
  createResidentAvatarModelUrl,
  describeResidentAvatarSceneMode,
  normalizeResidentAvatarModel,
} from "./plazaResidentAvatarScene";

test("supported residents use the studio full-body rig in the plaza scene", () => {
  for (const resident of listMockResidents()) {
    const rig = createResidentAvatarRig(resident);
    expect(rig).not.toBeNull();
    expect(rig!.mode).toBe("studio-body-glb");
    expect(rig!.bodyTargetHeight).toBeGreaterThan(0);
    expect(rig!.bodyAnchorY).toBeGreaterThanOrEqual(0);
    expect(rig!.markerY).toBeGreaterThan(rig!.bodyAnchorY);
  }
});

test("resident avatar scene mode stays readable for supported and unsupported residents", () => {
  const supportedResident = listMockResidents()[0]!;
  expect(describeResidentAvatarSceneMode(supportedResident)).toBe(
    "Studio full-body GLB"
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

test("resident model urls use the stable studio full-body glb path", () => {
  const supportedResident = listMockResidents()[0]!;
  const url = createResidentAvatarModelUrl(supportedResident);
  expect(url).not.toBeNull();
  expect(url!).toContain(
    "https://mii-unsecure.ariankordi.net/miis/image.glb"
  );
  expect(url!).toContain("type=all_body");
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
