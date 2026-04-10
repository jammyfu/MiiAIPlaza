#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATE_DIR="${ROOT_DIR}/.local-app"

if [ ! -d "${STATE_DIR}" ]; then
  echo "No local app state directory found."
  exit 0
fi

stop_pid_file() {
  local pid_file="$1"
  if [ ! -f "${pid_file}" ]; then
    return 0
  fi

  local pid
  pid="$(cat "${pid_file}")"
  if [ -n "${pid}" ] && kill -0 "${pid}" >/dev/null 2>&1; then
    kill "${pid}" >/dev/null 2>&1 || true
  fi

  rm -f "${pid_file}"
}

stop_pid_file "${STATE_DIR}/app.pid"
stop_pid_file "${STATE_DIR}/app-server.pid"
stop_pid_file "${STATE_DIR}/app-build.pid"

rm -f "${STATE_DIR}/app.env"
rmdir "${STATE_DIR}" >/dev/null 2>&1 || true

echo "Local app stopped."
