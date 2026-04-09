#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "${ROOT_DIR}/scripts/common.sh"

TOOLS_DIR="$(cd "${ROOT_DIR}/.." && pwd)"
RENDERER_REPO="${MII_RENDERER_REPO:-${TOOLS_DIR}/FFL-Testing-with-hats}"
WEB_PORT="${MII_RENDERER_PORT:-5000}"
UPSTREAM_PORT="${MII_RENDERER_UPSTREAM_PORT:-12346}"
BUILD_JOBS="${MII_RENDERER_JOBS:-8}"
TEST_RENDER_DATA="${MII_RENDER_TEST_DATA:-00070e555d5863674e53666975777c767c7d848b9299989f9ea1a8a9b5bc89e1e9efececf6ecf6ece8f3faf7fbfdfe}"
TEST_RENDER_URL="http://127.0.0.1:${WEB_PORT}/miis/image.png?shaderType=switch&type=variableiconbody&width=96&verifyCharInfo=0&data=${TEST_RENDER_DATA}"

require_cmd cmake
require_cmd go
require_cmd pkg-config
require_cmd curl

if [ ! -s "${RENDERER_REPO}/FFLResHigh.dat" ]; then
  echo "Missing ${RENDERER_REPO}/FFLResHigh.dat" >&2
  echo "Run ./scripts/setup-local-renderer.sh first." >&2
  exit 1
fi

cmake -S "${RENDERER_REPO}" -B "${RENDERER_REPO}/build" \
  -DCMAKE_BUILD_TYPE=Release \
  -DRIO_NO_CLIP_CONTROL=ON \
  -DCMAKE_CXX_FLAGS="-DNDEBUG -O3"
cmake --build "${RENDERER_REPO}/build" -j"${BUILD_JOBS}"

cleanup() {
  if [ -n "${WEB_PID:-}" ]; then
    kill "${WEB_PID}" >/dev/null 2>&1 || true
  fi
  if [ -n "${RENDERER_PID:-}" ]; then
    kill "${RENDERER_PID}" >/dev/null 2>&1 || true
  fi
}

trap cleanup EXIT INT TERM

(
  cd "${RENDERER_REPO}"
  ./ffl_testing_2 --server --port "${UPSTREAM_PORT}"
) &
RENDERER_PID=$!

(
  cd "${RENDERER_REPO}/server-impl"
  go run . -host ":${WEB_PORT}" -upstream "localhost:${UPSTREAM_PORT}" -cors "*"
) &
WEB_PID=$!

echo "Local renderer is available at http://127.0.0.1:${WEB_PORT}/miis/image.png"

wait_for_http "${TEST_RENDER_URL}" "local renderer" 30

wait "${RENDERER_PID}" "${WEB_PID}"
