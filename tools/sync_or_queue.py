#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
import subprocess
import sys
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from tools.git_safe_sync import ENVIRONMENT_BLOCKED_PREFIX, probe_git_writable


def repo_root_from_script() -> Path:
    return Path(__file__).resolve().parents[1]


def repo_slug(repo_root: Path) -> str:
    return repo_root.name.replace("_", "-")


def prefer_local_env_name(repo_root: Path) -> str:
    slug = repo_slug(repo_root).replace("-", "_").upper()
    return f"{slug}_PREFER_LOCAL_GIT_SYNC"


def status_short(repo_root: Path) -> str:
    proc = subprocess.run(
        ["git", "status", "--short"],
        cwd=repo_root,
        text=True,
        capture_output=True,
        check=False,
    )
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr.strip() or "Failed to read git status.")
    return proc.stdout


def run_python_tool(args: list[str], repo_root: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, *args],
        cwd=repo_root,
        text=True,
        capture_output=True,
        check=False,
    )


def print_output(proc: subprocess.CompletedProcess[str]) -> None:
    if proc.stdout.strip():
        print(proc.stdout.strip())
    if proc.stderr.strip():
        print(proc.stderr.strip(), file=sys.stderr)


def queue_local_sync(repo_root: Path, message: str, reason: str) -> subprocess.CompletedProcess[str]:
    return run_python_tool(
        ["tools/queue_local_git_sync.py", "--message", message, "--reason", reason],
        repo_root,
    )


def run_safe_sync(repo_root: Path, message: str, paths: list[str] | None) -> subprocess.CompletedProcess[str]:
    args = ["tools/git_safe_sync.py", "--message", message]
    if paths:
        args.extend(["--paths", *paths])
    return run_python_tool(args, repo_root)


def prefer_local_from_env(repo_root: Path) -> bool:
    value = os.getenv(prefer_local_env_name(repo_root), "")
    return value.strip().lower() in {"1", "true", "yes", "on"}


def run_sync_or_queue(repo_root: Path, message: str, paths: list[str] | None, prefer_local: bool = False) -> int:
    if not status_short(repo_root).strip():
        print("No git diff detected. Nothing to sync.")
        return 0

    if prefer_local:
        queue_proc = queue_local_sync(
            repo_root,
            message,
            reason="preferred local git sync path for automation or sandboxed agent",
        )
        print_output(queue_proc)
        return queue_proc.returncode

    writable, reason = probe_git_writable(repo_root)
    if not writable:
        print(f"{ENVIRONMENT_BLOCKED_PREFIX} {reason}")
        queue_proc = queue_local_sync(
            repo_root,
            message,
            reason=f"direct git sync blocked: {reason}",
        )
        print_output(queue_proc)
        return queue_proc.returncode

    sync_proc = run_safe_sync(repo_root, message, paths)
    print_output(sync_proc)
    if sync_proc.returncode == 0:
        return 0

    combined = f"{sync_proc.stdout}\n{sync_proc.stderr}"
    if ENVIRONMENT_BLOCKED_PREFIX in combined:
        queue_proc = queue_local_sync(
            repo_root,
            message,
            reason="git_safe_sync reported environment blocked; queued local terminal sync",
        )
        print_output(queue_proc)
        return queue_proc.returncode

    return sync_proc.returncode


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Safely sync git changes, or queue local terminal sync if blocked.")
    parser.add_argument("--message", required=True, help="Commit message to use for the sync.")
    parser.add_argument(
        "--paths",
        nargs="*",
        default=None,
        help="Optional explicit paths to stage. Defaults to all changes with git add -A.",
    )
    parser.add_argument(
        "--prefer-local",
        action="store_true",
        help="Skip direct .git probing and queue the sync request for the local LaunchAgent immediately.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo_root = repo_root_from_script()
    prefer_local = args.prefer_local or prefer_local_from_env(repo_root)
    return run_sync_or_queue(repo_root, args.message, args.paths, prefer_local=prefer_local)


if __name__ == "__main__":
    raise SystemExit(main())
