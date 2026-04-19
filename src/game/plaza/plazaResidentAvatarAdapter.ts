import type { PlazaResident } from "../../contracts/plaza";
import Mii from "../../external/mii-js/mii.js";
import { Buffer as Buf } from "../../../node_modules/buffer/index";

type ResidentAvatarPreset = {
  base64: string;
  shortName: string;
};

const residentAvatarPresets: Record<string, ResidentAvatarPreset> = {
  openclaw: {
    base64:
      "A8EAwELycUHCpfBSXhcDbS/5Fhz6rQAAWS1KAGEAcwBtAGkAbgBlAAAAAAAAABw3ExB7ASFuQxwNZMcYAAgegg0AMEGzW4JtcwBvAHMAaQBnAG8AbgBhAGwAAAAAAMwDAAAAAAAAAAAAAAAA",
    shortName: "OpenClaw",
  },
  "signal-grove": {
    base64:
      "AwEAAAAAAAAAAAAAgP9wmQAAAAAAAAAAAABNAGkAaQAAAAAAAAAAAAAAAAAAAEBAAAAhAQJoRBgmNEYUgRIXaA0AACkAUkhQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMNn",
    shortName: "Signal",
  },
  "postmaster-lantern": {
    base64:
      "AwEAwAAAAAAAAAAAAP91dC/5Fhz6rQAAAChiAG8AbwBlAHkAAAAAAAAAAAAAABRvEwBJBBJvQxgNVGUUABoTqAoAACmwUUhQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE8TAGMyCAAANgACC2QA",
    shortName: "Lantern",
  },
};

export function createResidentAvatarMii(resident: PlazaResident): Mii | null {
  const preset = residentAvatarPresets[resident.agent.id];
  if (!preset) {
    return null;
  }

  const mii = new Mii(Buf.from(preset.base64, "base64"));
  mii.miiName = preset.shortName;
  mii.creatorName = resident.agent.provider.slice(0, 10);
  return mii;
}

export function supportsResidentAvatar(resident: PlazaResident): boolean {
  return resident.agent.id in residentAvatarPresets;
}
