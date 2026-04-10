#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "${ROOT_DIR}/scripts/common.sh"
STATE_DIR="${ROOT_DIR}/.local-app"
APP_ENV="${STATE_DIR}/app.env"
APP_PID_FILE="${STATE_DIR}/app.pid"
BUILD_PID_FILE="${STATE_DIR}/app-build.pid"
SERVER_PID_FILE="${STATE_DIR}/app-server.pid"

APP_PORT="${MII_APP_PORT:-}"
APP_URL=""

if [ -d "${STATE_DIR}" ] && [ -f "${APP_ENV}" ]; then
  APP_PORT="$(stack_value "${APP_ENV}" "APP_PORT" || true)"
  APP_URL="$(stack_value "${APP_ENV}" "APP_URL" || true)"
fi

if [ -z "${APP_PORT}" ]; then
  APP_PORT="3000"
fi

if [ -z "${APP_URL}" ]; then
  APP_URL="http://127.0.0.1:${APP_PORT}/"
fi

app_pid=""
build_pid=""
server_pid=""

if [ -f "${APP_PID_FILE}" ]; then
  app_pid="$(cat "${APP_PID_FILE}")"
fi
if [ -f "${BUILD_PID_FILE}" ]; then
  build_pid="$(cat "${BUILD_PID_FILE}")"
fi
if [ -f "${SERVER_PID_FILE}" ]; then
  server_pid="$(cat "${SERVER_PID_FILE}")"
fi

app_pid_status="stopped"
if is_pid_running "${app_pid}"; then
  app_pid_status="running"
fi

build_pid_status="stopped"
if is_pid_running "${build_pid}"; then
  build_pid_status="running"
fi

server_pid_status="stopped"
if is_pid_running "${server_pid}"; then
  server_pid_status="running"
fi

app_http_status="down"
if [ -n "${APP_URL}" ] && curl -fsS -o /dev/null "${APP_URL}" >/dev/null 2>&1; then
  app_http_status="up"
fi

tracked_state_status="missing"
if [ -d "${STATE_DIR}" ] && [ -f "${APP_ENV}" ]; then
  tracked_state_status="present"
fi

port_listener="none"
if is_port_in_use "${APP_PORT}"; then
  port_listener="$(port_listener_summary "${APP_PORT}")"
fi

echo "Local app status"
echo "  Tracked State: ${tracked_state_status}"
echo "  App PID:      ${app_pid:-n/a} (${app_pid_status})"
echo "  Build PID:    ${build_pid:-n/a} (${build_pid_status})"
echo "  Server PID:   ${server_pid:-n/a} (${server_pid_status})"
echo "  App HTTP:     ${app_http_status}"
echo "  App URL:      ${APP_URL:-n/a}"
echo "  App Port:     ${APP_PORT:-n/a}"
echo "  Port Owner:   ${port_listener}"
