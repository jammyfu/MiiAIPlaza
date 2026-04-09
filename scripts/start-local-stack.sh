#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "${ROOT_DIR}/scripts/common.sh"
STATE_DIR="${ROOT_DIR}/.local-stack"
mkdir -p "${STATE_DIR}"
RENDERER_HEALTHCHECK_QUERY="shaderType=switch&type=variableiconbody&width=96&verifyCharInfo=0&data=00070e555d5863674e53666975777c767c7d848b9299989f9ea1a8a9b5bc89e1e9efececf6ecf6ece8f3faf7fbfdfe"

BACKEND_MODE="${MII_RENDERER_BACKEND:-ffljs}"
APP_PORT="${MII_APP_PORT:-}"
RENDERER_PORT="${MII_RENDERER_PORT:-}"
UPSTREAM_PORT="${MII_RENDERER_UPSTREAM_PORT:-}"

require_cmd bash
require_cmd lsof

if [ -z "${APP_PORT}" ]; then
  APP_PORT="$(find_free_port 3000 3999)"
fi

case "${BACKEND_MODE}" in
  ffljs|server|both)
    ;;
  *)
    echo "Unsupported MII_RENDERER_BACKEND: ${BACKEND_MODE}" >&2
    echo "Expected one of: ffljs, server, both" >&2
    exit 1
    ;;
esac

if [ "${BACKEND_MODE}" != "ffljs" ] && [ -z "${RENDERER_PORT}" ]; then
  RENDERER_PORT="$(find_free_port 5000 5999)"
fi
if [ "${BACKEND_MODE}" != "ffljs" ] && [ -z "${UPSTREAM_PORT}" ]; then
  UPSTREAM_PORT="$(find_free_port 12346 12446)"
fi

"${ROOT_DIR}/scripts/setup-local-renderer.sh"

cleanup() {
  kill "${APP_STACK_PID:-}" >/dev/null 2>&1 || true
  kill "${RENDERER_STACK_PID:-}" >/dev/null 2>&1 || true
}

trap cleanup EXIT INT TERM

if [ "${BACKEND_MODE}" != "ffljs" ]; then
  MII_RENDERER_PORT="${RENDERER_PORT}" \
  MII_RENDERER_UPSTREAM_PORT="${UPSTREAM_PORT}" \
  "${ROOT_DIR}/scripts/start-local-renderer.sh" \
    >"${STATE_DIR}/renderer.log" 2>&1 &
  RENDERER_STACK_PID=$!
  echo "${RENDERER_STACK_PID}" > "${STATE_DIR}/renderer-stack.pid"

  wait_for_http "http://127.0.0.1:${RENDERER_PORT}/miis/image.png?${RENDERER_HEALTHCHECK_QUERY}" "local renderer" 30
else
  rm -f "${STATE_DIR}/renderer.log"
  rm -f "${STATE_DIR}/renderer-stack.pid"
fi

MII_APP_PORT="${APP_PORT}" \
"${ROOT_DIR}/scripts/start-local-app.sh" \
  >"${STATE_DIR}/app.log" 2>&1 &
APP_STACK_PID=$!
echo "${APP_STACK_PID}" > "${STATE_DIR}/app-stack.pid"

wait_for_http "http://127.0.0.1:${APP_PORT}/" "local app" 15

APP_URL="http://127.0.0.1:${APP_PORT}/"
APP_OPEN_URL="${APP_URL}"
if [ "${BACKEND_MODE}" = "server" ]; then
  APP_OPEN_URL="${APP_URL}?rendererBackend=server&rendererPort=${RENDERER_PORT}"
fi

cat > "${STATE_DIR}/stack.env" <<EOF
BACKEND_MODE=${BACKEND_MODE}
APP_PORT=${APP_PORT}
APP_URL=${APP_URL}
APP_OPEN_URL=${APP_OPEN_URL}
EOF

if [ "${BACKEND_MODE}" != "ffljs" ]; then
  cat >> "${STATE_DIR}/stack.env" <<EOF
RENDERER_PORT=${RENDERER_PORT}
UPSTREAM_PORT=${UPSTREAM_PORT}
RENDERER_URL=http://127.0.0.1:${RENDERER_PORT}/miis/image.png
RENDERER_HEALTHCHECK_URL=http://127.0.0.1:${RENDERER_PORT}/miis/image.png?${RENDERER_HEALTHCHECK_QUERY}
EOF
fi

echo
echo "Stack ready:"
echo "  App:      ${APP_OPEN_URL}"
if [ "${BACKEND_MODE}" = "both" ]; then
  echo "  Alt URL:  ${APP_URL}?rendererBackend=server&rendererPort=${RENDERER_PORT}"
fi
if [ "${BACKEND_MODE}" != "ffljs" ]; then
  echo "  Renderer: http://127.0.0.1:${RENDERER_PORT}/miis/image.png"
fi
echo "  Mode:     ${BACKEND_MODE}"
if [ "${BACKEND_MODE}" = "ffljs" ]; then
  echo "  Logs:     ${STATE_DIR}/app.log"
else
echo "  Logs:     ${STATE_DIR}/app.log and ${STATE_DIR}/renderer.log"
fi
echo

if [ -n "${RENDERER_STACK_PID:-}" ]; then
  wait "${RENDERER_STACK_PID}" "${APP_STACK_PID}"
else
  wait "${APP_STACK_PID}"
fi
