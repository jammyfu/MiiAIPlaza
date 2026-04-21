import { expect, test } from "bun:test";
import { Box3, Group, Mesh, BoxGeometry, MeshBasicMaterial } from "three";
import { listMockResidents } from "../../providers/mockPlazaPresence";
import {
  buildResidentRemoteHeadRenderUrl,
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
