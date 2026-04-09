#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "${ROOT_DIR}/scripts/common.sh"

APP_PORT="${MII_APP_PORT:-3000}"
APP_URL="http://127.0.0.1:${APP_PORT}/"
APP_RESOURCE_DAT="${ROOT_DIR}/public/FFLResHigh.dat"
MAIN_BUNDLE="${ROOT_DIR}/public/dist/main.js"
WORKER_BUNDLE="${ROOT_DIR}/public/dist/worker.js"
MAIN_CSS="${ROOT_DIR}/public/dist/main.css"

export PATH="${HOME}/.bun/bin:${PATH}"
cd "${ROOT_DIR}"

require_cmd bun
require_cmd python3
require_cmd curl

if [ ! -s "${APP_RESOURCE_DAT}" ]; then
  echo "Missing ${APP_RESOURCE_DAT}. Preparing local renderer resources..."
  "${ROOT_DIR}/scripts/setup-local-renderer.sh"
fi

bun build.ts &
BUILD_PID=$!

cleanup() {
  kill "${BUILD_PID}" >/dev/null 2>&1 || true
}

trap cleanup EXIT INT TERM

cd "${ROOT_DIR}/public"
python3 -m http.server --bind 127.0.0.1 "${APP_PORT}" &
SERVER_PID=$!

cleanup() {
  kill "${SERVER_PID}" >/dev/null 2>&1 || true
  kill "${BUILD_PID}" >/dev/null 2>&1 || true
}

trap cleanup EXIT INT TERM

wait_for_http "${APP_URL}" "local app" 15
wait_for_file "${MAIN_BUNDLE}" "main bundle" 30
wait_for_file "${WORKER_BUNDLE}" "worker bundle" 30
wait_for_file "${MAIN_CSS}" "main stylesheet" 30
wait_for_http "${APP_URL}dist/main.js" "main bundle URL" 15
wait_for_http "${APP_URL}dist/worker.js" "worker bundle URL" 15
echo "Local app is available at ${APP_URL}"

wait "${SERVER_PID}" "${BUILD_PID}"
