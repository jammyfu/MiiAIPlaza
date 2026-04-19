import { expect, test } from "bun:test";
import { listMockResidents } from "../../providers/mockPlazaPresence";
import {
  createResidentAvatarMii,
  supportsResidentAvatar,
} from "./plazaResidentAvatarAdapter";

test("every mock resident has an avatar adapter preset", () => {
  for (const resident of listMockResidents()) {
    expect(supportsResidentAvatar(resident)).toBe(true);
  }
});

test("resident avatar adapter creates named Miis", () => {
  for (const resident of listMockResidents()) {
    const avatar = createResidentAvatarMii(resident);
    expect(avatar).not.toBeNull();
    expect(avatar!.miiName.length).toBeGreaterThan(0);
    expect(avatar!.miiName.length).toBeLessThanOrEqual(10);
  }
});
