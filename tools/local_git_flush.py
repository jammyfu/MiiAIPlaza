#!/usr/bin/env python3
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path


REQUEST_DIRNAME = ".codex-local"
REQUEST_FILENAME = "git_sync_request.json"


def repo_root_from_script() -> Path:
    return Path(__file__).resolve().parents[1]


def request_path(repo_root: Path) -> Path:
    return repo_root / REQUEST_DIRNAME / REQUEST_FILENAME


def run_command(args: list[str], repo_root: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run(args, cwd=repo_root, text=True, capture_output=True)


def print_output(proc: subprocess.CompletedProcess[str]) -> None:
    if proc.stdout.strip():
        print(proc.stdout.strip())
    if proc.stderr.strip():
        print(proc.stderr.strip(), file=sys.stderr)


def load_request(path: Path) -> dict[str, str]:
    return json.loads(path.read_text(encoding="utf-8"))


def clear_request(path: Path) -> None:
    if path.exists():
        path.unlink()


def status_short(repo_root: Path) -> str:
    proc = run_command(["git", "status", "--short"], repo_root)
    if proc.returncode != 0:
        print_output(proc)
        raise RuntimeError("Failed to read git status.")
    return proc.stdout


def main() -> int:
    repo_root = repo_root_from_script()
    sync_request = request_path(repo_root)
    if not sync_request.exists():
        print("No pending local git sync request.")
        return 0

    request = load_request(sync_request)
    message = request.get("message", "docs: local git sync")

    if not status_short(repo_root).strip():
        clear_request(sync_request)
        print("No git diff detected. Cleared pending local git sync request.")
        return 0

    verify_proc = run_command([sys.executable, "tools/verify.py"], repo_root)
    print_output(verify_proc)
    if verify_proc.returncode != 0:
        print("Verification failed. Keeping local git sync request for retry.", file=sys.stderr)
        return verify_proc.returncode

    writable_proc = run_command([sys.executable, "tools/check_git_writable.py"], repo_root)
    print_output(writable_proc)
    if writable_proc.returncode != 0:
        print("Git metadata still blocked. Keeping local git sync request for retry.", file=sys.stderr)
        return writable_proc.returncode

    sync_proc = run_command([sys.executable, "tools/git_safe_sync.py", "--message", message], repo_root)
    print_output(sync_proc)
    if sync_proc.returncode != 0:
        print("Safe sync failed. Keeping local git sync request for retry.", file=sys.stderr)
        return sync_proc.returncode

    clear_request(sync_request)
    print(f"Completed local git sync request with message: {message}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
