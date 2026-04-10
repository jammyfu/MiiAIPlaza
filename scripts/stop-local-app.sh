#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source "${ROOT_DIR}/scripts/common.sh"
STATE_DIR="${ROOT_DIR}/.local-app"

if [ ! -d "${STATE_DIR}" ]; then
  echo "No local app state directory found."
  exit 0
fi

stop_pid_file "${STATE_DIR}/app.pid"
stop_pid_file "${STATE_DIR}/app-server.pid"
stop_pid_file "${STATE_DIR}/app-build.pid"

rm -f "${STATE_DIR}/app.env"
rmdir "${STATE_DIR}" >/dev/null 2>&1 || true

echo "Local app stopped."
