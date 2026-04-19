#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import subprocess
from datetime import datetime, timezone
from pathlib import Path


REQUEST_DIRNAME = ".codex-local"
REQUEST_FILENAME = "git_sync_request.json"
def repo_root_from_script() -> Path:
    return Path(__file__).resolve().parents[1]


def repo_slug(repo_root: Path) -> str:
    return repo_root.name.replace("_", "-")


def agent_label(repo_root: Path) -> str:
    return f"com.jammyfu.{repo_slug(repo_root)}.local-git-sync"


def request_dir(repo_root: Path) -> Path:
    return repo_root / REQUEST_DIRNAME


def request_path(repo_root: Path) -> Path:
    return request_dir(repo_root) / REQUEST_FILENAME


def launchctl_target() -> str:
    return f"gui/{os.getuid()}/{agent_label(repo_root_from_script())}"


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def kickstart_local_agent() -> tuple[bool, str]:
    proc = subprocess.run(
        ["launchctl", "kickstart", "-k", launchctl_target()],
        text=True,
        capture_output=True,
        check=False,
    )
    if proc.returncode == 0:
        return True, ""
    details = proc.stderr.strip() or proc.stdout.strip() or "launchctl kickstart failed"
    return False, details


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Queue a local git sync request for a workspace.")
    parser.add_argument("--message", required=True, help="Commit message for the pending local sync.")
    parser.add_argument(
        "--reason",
        default="sandbox blocked .git write; request local terminal sync",
        help="Human-readable reason for queueing the local sync.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo_root = repo_root_from_script()
    request_file = request_path(repo_root)
    request_file.parent.mkdir(parents=True, exist_ok=True)

    payload = {
        "message": args.message,
        "reason": args.reason,
        "requested_at": utc_now_iso(),
        "repo_root": str(repo_root),
    }
    request_file.write_text(json.dumps(payload, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")
    print(f"Queued local git sync request at {request_file}")

    kicked, details = kickstart_local_agent()
    if kicked:
        print(f"Kickstarted LaunchAgent {agent_label(repo_root)}")
    else:
        print(f"LaunchAgent kickstart skipped: {details}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
