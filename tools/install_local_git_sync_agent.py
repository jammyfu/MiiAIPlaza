#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
import plistlib
import subprocess
import sys
from pathlib import Path


def repo_root_from_script() -> Path:
    return Path(__file__).resolve().parents[1]


def repo_slug(repo_root: Path) -> str:
    return repo_root.name.replace("_", "-")


def agent_label(repo_root: Path) -> str:
    return f"com.jammyfu.{repo_slug(repo_root)}.local-git-sync"


def launch_agent_path() -> Path:
    repo_root = repo_root_from_script()
    return Path.home() / "Library" / "LaunchAgents" / f"{agent_label(repo_root)}.plist"


def logs_dir() -> Path:
    return Path.home() / ".codex" / "logs"


def build_plist(repo_root: Path, interval_seconds: int) -> dict[str, object]:
    python_executable = sys.executable
    log_root = logs_dir()
    repo_name = repo_slug(repo_root)
    return {
        "Label": agent_label(repo_root),
        "ProgramArguments": [
            python_executable,
            str(repo_root / "tools" / "local_git_flush.py"),
        ],
        "WorkingDirectory": str(repo_root),
        "RunAtLoad": True,
        "StartInterval": interval_seconds,
        "StandardOutPath": str(log_root / f"{repo_name}-local-git-sync.log"),
        "StandardErrorPath": str(log_root / f"{repo_name}-local-git-sync.err.log"),
    }


def run_launchctl(args: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(["launchctl", *args], text=True, capture_output=True)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Install or remove the repository-local git sync LaunchAgent.")
    parser.add_argument("--interval-seconds", type=int, default=120, help="launchd StartInterval in seconds.")
    parser.add_argument("--remove", action="store_true", help="Remove the LaunchAgent instead of installing it.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    plist_path = launch_agent_path()
    gui_target = f"gui/{os.getuid()}"
    repo_root = repo_root_from_script()
    label = agent_label(repo_root)

    if args.remove:
        run_launchctl(["bootout", gui_target, str(plist_path)])
        if plist_path.exists():
            plist_path.unlink()
        print(f"Removed LaunchAgent {label}")
        return 0

    plist_path.parent.mkdir(parents=True, exist_ok=True)
    logs_dir().mkdir(parents=True, exist_ok=True)

    payload = build_plist(repo_root, args.interval_seconds)
    with plist_path.open("wb") as handle:
        plistlib.dump(payload, handle)

    run_launchctl(["bootout", gui_target, str(plist_path)])
    bootstrap = run_launchctl(["bootstrap", gui_target, str(plist_path)])
    if bootstrap.returncode != 0:
        if bootstrap.stdout.strip():
            print(bootstrap.stdout.strip())
        if bootstrap.stderr.strip():
            print(bootstrap.stderr.strip(), file=sys.stderr)
        return bootstrap.returncode

    kickstart = run_launchctl(["kickstart", "-k", f"{gui_target}/{label}"])
    if kickstart.returncode != 0:
        if kickstart.stdout.strip():
            print(kickstart.stdout.strip())
        if kickstart.stderr.strip():
            print(kickstart.stderr.strip(), file=sys.stderr)
        return kickstart.returncode

    print(f"Installed LaunchAgent at {plist_path}")
    print(f"Label: {label}")
    print(f"Interval: {args.interval_seconds} seconds")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
