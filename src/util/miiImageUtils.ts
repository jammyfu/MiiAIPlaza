import qrjs from "../external/mii-frontend/qrjs.min.js";
import {
  convertDataToType,
  supportedFormats,
} from "../external/mii-frontend/data-conversion.js";
import { encryptAndEncodeVer3StoreDataToQRCodeFormat } from "./EncodeQRCode.js";
import Mii from "../external/mii-js/mii.js";
import { Buffer as Buf } from "../../node_modules/buffer/index";
import { CameraPosition, Mii3DScene, SetupType } from "../class/3DScene.js";
import Html from "@datkat21/html";
import { Vector3 } from "three";
import { AddButtonSounds } from "./AddButtonSounds.js";
import { Config } from "../config.js";
import { recordPerfTrace, tracePerf } from "./PerfTrace.js";

const ver3Format = supportedFormats.find(
  (f) => f.className === "Gen2Wiiu3dsMiitomo"
)!;

const makeQrCodeImage = async (mii: string): Promise<HTMLImageElement> => {
  let convertedVer3Data: Uint8Array, ver3QRData: Uint8Array | any[];

  const miiU8 = new Uint8Array(Buf.from(mii, "base64"));

  convertedVer3Data = new Uint8Array(
    convertDataToType(miiU8, ver3Format, ver3Format.className, true)
  );

  ver3QRData = encryptAndEncodeVer3StoreDataToQRCodeFormat(convertedVer3Data);
  // Append any data after the first 96 bytes (fixed by the function above)
  ver3QRData = new Uint8Array([...ver3QRData, ...miiU8.subarray(96)]); // May or may not append nothing.
  // ... after the encrypted portion (appending after that should still be safe to scan)

  const png = qrjs.generatePNG(ver3QRData, { margin: 0 });

  const img = new Image(431, 431);
  img.src = URL.createObjectURL(await (await fetch(png)).blob());
  return new Promise((resolve) => {
    img.onload = () => {
      return resolve(img);
    };
  });
};

export enum MiiCustomRenderType {
  Head,
  HeadOnly,
  Body,
}

const waitForAnimationFrames = (frameCount: number = 2) =>
  new Promise<void>((resolve) => {
    const step = () => {
      if (frameCount <= 0) {
        resolve();
        return;
      }

      frameCount -= 1;
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  });

let sharedScreenshotHost: HTMLDivElement | undefined;

const getSharedScreenshotHost = () => {
  if (sharedScreenshotHost?.isConnected) {
    return sharedScreenshotHost;
  }

  const host = document.createElement("div");
  host.style.width = "720px";
  host.style.height = "720px";
  host.style.opacity = "0";
  host.style.pointerEvents = "none";
  host.style.position = "fixed";
  host.style.left = "-99999px";
  host.style.top = "0";
  document.body.append(host);
  sharedScreenshotHost = host;
  return host;
};

export const getMiiRender = async (
  mii: Mii,
  type: MiiCustomRenderType,
  useExtendedColors: boolean = true,
  useBlob: boolean = true
): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const totalStart = performance.now();
    let tmpMii = new Mii(mii.encode());
    const parent = getSharedScreenshotHost();

    if (useExtendedColors === false) {
      tmpMii.trueEyeColor = tmpMii.fflEyeColor;
      tmpMii.trueEyebrowColor = tmpMii.fflEyebrowColor;
      tmpMii.trueFacialHairColor = tmpMii.fflFacialHairColor;
      tmpMii.trueGlassesColor = tmpMii.fflGlassesColor;
      tmpMii.trueGlassesType = tmpMii.fflGlassesType;
      tmpMii.trueHairColor = tmpMii.fflHairColor;
      tmpMii.trueMouthColor = tmpMii.fflMouthColor;
      tmpMii.trueSkinColor = tmpMii.fflSkinColor;

      tmpMii.extEyeColor = tmpMii.fflEyeColor + 8;
      tmpMii.extHairColor = tmpMii.fflHairColor;
      tmpMii.extFacelineColor = tmpMii.fflSkinColor;
      tmpMii.extBeardColor = tmpMii.fflFacialHairColor;
      tmpMii.extEyebrowColor = tmpMii.fflEyebrowColor;
      tmpMii.extGlassColor = 0;
      tmpMii.extGlassType = tmpMii.fflGlassesType;
      tmpMii.extHatColor = 0;
      tmpMii.extHatType = 0;
    }

    const scene = new Mii3DScene(tmpMii, parent, SetupType.Screenshot);
    const cleanup = () => {
      scene.shutdown();
      scene.getRendererElement().remove();
    };
    scene
      .init()
      .then(async () => {
        try {
          // updateMiiHead() already refreshes body state before returning,
          // so calling updateBody() here would duplicate the export work.
          await tracePerf("getMiiRender.updateMiiHead", () =>
            scene.updateMiiHead()
          );
          // swap pose for render
          scene.anim.forEach((a) => {
            a.timeScale = 0;
            // a.stop();
            // a.reset();
          });
          scene.swapAnimation("Pose.01");

          let scn = scene.getScene()!,
            cam = scene.getCamera()!,
            ctl = scene.getControls()!,
            pos = new Vector3();
          switch (type) {
            case MiiCustomRenderType.Head:
              // zoom in on head
              scene.focusCamera(0, true, false);
              ctl.dollyTo(50);
              cam.fov = 15;
              cam.updateProjectionMatrix();
              break;
            case MiiCustomRenderType.HeadOnly:
              // hide body from view
              scn.getObjectByName("body_m")!.visible = false;
              scn.getObjectByName("hands_m")!.visible = false;
              scn.getObjectByName("legs_m")!.visible = false;
              scn.getObjectByName("body_f")!.visible = false;
              scn.getObjectByName("hands_f")!.visible = false;
              scn.getObjectByName("legs_f")!.visible = false;
              // Get the bounding box of the object
              scene.focusCamera(CameraPosition.MiiHead, true, false);
              ctl.dollyTo(40);
              cam.fov = 15;
              cam.updateProjectionMatrix();
              break;
            case MiiCustomRenderType.Body:
              // default screenshot camera position
              scene.focusCamera(CameraPosition.MiiFullBody, true, false);
              ctl.dollyTo(90, false);
              cam.fov = 15;
              cam.updateProjectionMatrix();
              break;
          }

          parent.append(scene.getRendererElement());

          const renderer = scene.getRenderer();
          await waitForAnimationFrames(2);

          const captureStart = performance.now();
          if (useBlob)
            renderer.domElement.toBlob((blob) => {
              recordPerfTrace(
                "getMiiRender.capture",
                performance.now() - captureStart
              );
              const image = new Image(
                renderer.domElement.width,
                renderer.domElement.height
              );
              image.src = URL.createObjectURL(blob!);
              image.onload = () => {
                recordPerfTrace(
                  "getMiiRender.total",
                  performance.now() - totalStart
                );
                resolve(image);
                cleanup();
              };
            });
          else {
            const url = renderer.domElement.toDataURL("png", 100);
            recordPerfTrace(
              "getMiiRender.capture",
              performance.now() - captureStart
            );
            const image = new Image(
              renderer.domElement.width,
              renderer.domElement.height
            );
            image.src = url;
            image.onload = () => {
              recordPerfTrace(
                "getMiiRender.total",
                performance.now() - totalStart
              );
              resolve(image);
              cleanup();
            };
          }
        } catch (error) {
          cleanup();
          reject(error);
        }
      })
      .catch((error) => {
        cleanup();
        reject(error);
      });
  });
};

export const getBackground = async (
  isMiic: boolean
): Promise<HTMLImageElement> => {
  let url: string = "";
  if (isMiic) {
    url = "./assets/images/bg_qr_miic.png";
  } else {
    url = "./assets/images/bg_qr_wiiu.png";
  }
  const blob = await (await fetch(url)).blob();
  const img = new Image(1280, 720);
  img.src = URL.createObjectURL(blob);
  return new Promise((resolve) => {
    img.onload = () => {
      return resolve(img);
    };
  });
};

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      reject(e);
    };
  });
}

export const QRCodeCanvas = async (
  mii: string,
  extendedColors: boolean = true
) => {
  const miiData = new Mii(Buf.from(mii, "base64"));
  const render = await loadImage(
    `${Config.renderer.renderFullBodyAltURL}&data=${encodeURIComponent(
      miiData.encodeStudio().toString("hex")
    )}&${Config.renderer.hatTypeParam}=${
      miiData.extHatType + Config.renderer.hatTypeAdd
    }&${Config.renderer.hatColorParam}=${
      miiData.extHatColor + Config.renderer.hatColorAdd
    }`
  );
  const qrCodeSource = await makeQrCodeImage(mii);
  const background = await getBackground(extendedColors);

  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext("2d")!;

  // background
  ctx.drawImage(background, 0, 0);
  // mark
  ctx.font = '500 24px "NTLG", sans-serif';
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#cccccc";
  ctx.fillText(`${location.origin}`, 32, 667);
  // version mark
  ctx.font = '500 24px "NTLG", sans-serif';
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillStyle = "#cccccc";
  ctx.fillText(`Made with Mii Creator ${Config.version.string}`, 1248, 667);
  ctx.drawImage(render, 54, -54, 714, 953);
  // qr code container
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(769, 79, 463, 463, [16, 16, 0, 0]);
  ctx.fill();
  ctx.drawImage(qrCodeSource, 797, 107, 408, 408);
  // name container
  ctx.fillStyle = "#707070";
  ctx.beginPath();
  ctx.roundRect(769, 542, 463, 99, [0, 0, 16, 16]);
  ctx.fill();
  // mii name
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '500 38px "NTLG", sans-serif';
  ctx.fillText(miiData.miiName, 1005, 591);
  const canvasPngImage = canvas.toDataURL("png", 100);
  return canvasPngImage;
};

// This recreates the html from the update changelog
export function createMiiCard(
  parent: Html | HTMLElement,
  name: string,
  username: string,
  link: string,
  message: string,
  studioData: string,
  extra: string = ""
) {
  new Html("div")
    .class("flex-group")
    .style({
      gap: "0",
      "justify-content": "flex-start",
      "text-align": "left",
    })
    .appendMany(
      new Html("img")
        .attr({
          width: 96,
          draggable: "false",
          src:
            Config.renderer.renderHeadshotURLNoParams +
            `?data=${encodeURIComponent(
              studioData
            )}&type=variableiconbody&verifyCharInfo=0&shaderType=switch&width=96&source=credits&characterYRotate=8&bodyType=switch&` +
            extra,
        })
        .style({ width: "96px", height: "96px" }),
      new Html("div")
        .class("col")
        .style({ gap: "12px", flex: "1" })
        .appendMany(
          new Html("small")
            .appendMany(
              new Html("span").text(name).style({
                display: "inline",
                width: "max-content",
              }),
              AddButtonSounds(
                new Html("a")
                  .text(`(@${username})`)
                  .attr({ target: "_blank", href: link })
              )
            )
            .style({ display: "flex", gap: "8px" }),
          new Html("div").html(message)
        )
    )
    .appendTo(parent);
}
export function createIconCard(
  parent: Html | HTMLElement,
  name: string,
  link: string,
  message: string,
  icon: string
) {
  let msg: Html;
  if (link !== "") {
    msg = new Html("a").attr({ href: link, target: "_blank" }).html(message);
  } else {
    msg = new Html("div").html(message);
  }

  new Html("div")
    .class("flex-group")
    .style({
      gap: "0",
      "justify-content": "flex-start",
      "text-align": "left",
    })
    .appendMany(
      new Html("div").html(icon).style({ width: "96px", height: "96px" }),
      new Html("div")
        .class("col")
        .style({ gap: "12px", flex: "1" })
        .appendMany(
          new Html("small")
            .appendMany(
              new Html("span").text(name).style({
                display: "inline",
                width: "max-content",
              })
            )
            .style({ display: "flex", gap: "8px" }),
          msg
        )
    )
    .appendTo(parent);
}
