#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "${ROOT_DIR}/scripts/common.sh"
STATE_DIR="${ROOT_DIR}/.local-stack"
STACK_ENV="${STATE_DIR}/stack.env"

if [ ! -d "${STATE_DIR}" ] || [ ! -f "${STACK_ENV}" ]; then
  echo "Local stack is not running."
  exit 0
fi

BACKEND_MODE="$(stack_value "${STACK_ENV}" "BACKEND_MODE")"
APP_PORT="$(stack_value "${STACK_ENV}" "APP_PORT")"
APP_URL="$(stack_value "${STACK_ENV}" "APP_URL")"
APP_OPEN_URL="$(stack_value "${STACK_ENV}" "APP_OPEN_URL" || true)"
RENDERER_PORT="$(stack_value "${STACK_ENV}" "RENDERER_PORT" || true)"
RENDERER_URL="$(stack_value "${STACK_ENV}" "RENDERER_URL" || true)"
RENDERER_HEALTHCHECK_URL="$(stack_value "${STACK_ENV}" "RENDERER_HEALTHCHECK_URL" || true)"
UPSTREAM_PORT="$(stack_value "${STACK_ENV}" "UPSTREAM_PORT" || true)"

APP_PID_FILE="${STATE_DIR}/app-stack.pid"
RENDERER_PID_FILE="${STATE_DIR}/renderer-stack.pid"

app_pid=""
renderer_pid=""

if [ -f "${APP_PID_FILE}" ]; then
  app_pid="$(cat "${APP_PID_FILE}")"
fi
if [ -f "${RENDERER_PID_FILE}" ]; then
  renderer_pid="$(cat "${RENDERER_PID_FILE}")"
fi

app_pid_status="stopped"
if is_pid_running "${app_pid}"; then
  app_pid_status="running"
fi

renderer_pid_status="not started"
if [ -n "${renderer_pid}" ]; then
  renderer_pid_status="stopped"
  if is_pid_running "${renderer_pid}"; then
    renderer_pid_status="running"
  fi
fi

app_http_status="down"
if [ -n "${APP_URL}" ] && curl -fsS -o /dev/null "${APP_URL}" >/dev/null 2>&1; then
  app_http_status="up"
fi

renderer_http_status="not applicable"
if [ -n "${RENDERER_HEALTHCHECK_URL}" ]; then
  renderer_http_status="down"
  if curl -fsS -o /dev/null "${RENDERER_HEALTHCHECK_URL}" >/dev/null 2>&1; then
    renderer_http_status="up"
  fi
fi

echo "Local stack status"
echo "  Mode:          ${BACKEND_MODE}"
echo "  App PID:       ${app_pid:-n/a} (${app_pid_status})"
echo "  App HTTP:      ${app_http_status}"
echo "  App URL:       ${APP_OPEN_URL:-${APP_URL}}"

if [ -n "${RENDERER_URL}" ]; then
  echo "  Renderer PID:  ${renderer_pid:-n/a} (${renderer_pid_status})"
  echo "  Renderer HTTP: ${renderer_http_status}"
  echo "  Renderer URL:  ${RENDERER_URL}"
  echo "  Upstream Port: ${UPSTREAM_PORT:-n/a}"
else
  echo "  Renderer PID:  n/a (${renderer_pid_status})"
  echo "  Renderer HTTP: ${renderer_http_status}"
fi

echo "  App Log:       ${STATE_DIR}/app.log"
if [ -f "${STATE_DIR}/renderer.log" ]; then
  echo "  Renderer Log:  ${STATE_DIR}/renderer.log"
fi
