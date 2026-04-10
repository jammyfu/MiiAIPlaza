#!/usr/bin/env bash

is_pid_running() {
  local pid="$1"
  [ -n "${pid}" ] && kill -0 "${pid}" >/dev/null 2>&1
}

is_port_in_use() {
  local port="$1"
  lsof -nP -iTCP:"${port}" -sTCP:LISTEN >/dev/null 2>&1
}

port_listener_summary() {
  local port="$1"
  lsof -nP -iTCP:"${port}" -sTCP:LISTEN 2>/dev/null | awk 'NR>1 {printf "%s(pid=%s)", $1, $2; exit}'
}

find_free_port() {
  local start_port="$1"
  local end_port="${2:-65535}"
  local port

  for ((port = start_port; port <= end_port; port++)); do
    if ! is_port_in_use "$port"; then
      echo "$port"
      return 0
    fi
  done

  echo "Could not find a free port in range ${start_port}-${end_port}" >&2
  return 1
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

stack_value() {
  local env_file="$1"
  local key="$2"

  if [ ! -f "${env_file}" ]; then
    return 1
  fi

  grep "^${key}=" "${env_file}" | tail -n 1 | cut -d "=" -f 2-
}

wait_for_file() {
  local path="$1"
  local label="$2"
  local timeout="${3:-30}"
  local start_ts
  start_ts="$(date +%s)"

  while true; do
    if [ -s "${path}" ]; then
      return 0
    fi

    if [ $(( $(date +%s) - start_ts )) -ge "$timeout" ]; then
      echo "Timed out waiting for ${label}: ${path}" >&2
      return 1
    fi

    sleep 1
  done
}

wait_for_http() {
  local url="$1"
  local label="$2"
  local timeout="${3:-30}"
  local start_ts
  start_ts="$(date +%s)"

  while true; do
    if curl -fsS -o /dev/null "$url" >/dev/null 2>&1; then
      return 0
    fi

    if [ $(( $(date +%s) - start_ts )) -ge "$timeout" ]; then
      echo "Timed out waiting for ${label}: ${url}" >&2
      return 1
    fi

    sleep 1
  done
}

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
