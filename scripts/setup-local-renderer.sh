#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "${ROOT_DIR}/scripts/common.sh"

TOOLS_DIR="$(cd "${ROOT_DIR}/.." && pwd)"
RENDERER_REPO="${MII_RENDERER_REPO:-${TOOLS_DIR}/FFL-Testing-with-hats}"
RENDERER_BRANCH="${MII_RENDERER_BRANCH:-renderer-server-prototype}"
RENDERER_REPO_URL="${MII_RENDERER_REPO_URL:-https://github.com/datkat21/FFL-Testing-with-hats.git}"
RESOURCE_ZIP_URL="${MII_RENDERER_RESOURCE_URL:-https://web.archive.org/web/20180502054513/http://download-cdn.miitomo.com/native/20180125111639/android/v2/asset_model_character_mii_AFLResHigh_2_3_dat.zip}"
RESOURCE_ZIP="${RENDERER_REPO}/AFLResHigh_2_3_dat.zip"
RESOURCE_DAT="${RENDERER_REPO}/FFLResHigh.dat"
APP_RESOURCE_DAT="${ROOT_DIR}/public/FFLResHigh.dat"

require_cmd git
require_cmd unzip
require_cmd curl

if [ ! -d "${RENDERER_REPO}/.git" ]; then
  git clone --branch "${RENDERER_BRANCH}" --single-branch "${RENDERER_REPO_URL}" "${RENDERER_REPO}"
fi

git -C "${RENDERER_REPO}" submodule update --init --recursive

if [ ! -f "${RESOURCE_ZIP}" ]; then
  curl -L "${RESOURCE_ZIP_URL}" -o "${RESOURCE_ZIP}"
fi

if [ ! -s "${RESOURCE_DAT}" ]; then
  unzip -p "${RESOURCE_ZIP}" asset/model/character/mii/AFLResHigh_2_3.dat > "${RESOURCE_DAT}"
fi

cp "${RESOURCE_DAT}" "${APP_RESOURCE_DAT}"

echo "Renderer repo ready at ${RENDERER_REPO}"
echo "Resource file ready at ${RESOURCE_DAT}"
echo "App resource copied to ${APP_RESOURCE_DAT}"
