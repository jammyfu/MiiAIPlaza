#!/usr/bin/env python3
from __future__ import annotations

import argparse
import subprocess
import sys
import time
from pathlib import Path


LOCK_ERROR_MARKERS = (
    "index.lock",
    "cannot lock ref",
    "Unable to create",
    "Another git process",
)

ENVIRONMENT_BLOCKED_PREFIX = "GIT_ENVIRONMENT_BLOCKED:"


def run_git(args: list[str], repo_root: Path, check: bool = True) -> subprocess.CompletedProcess[str]:
    proc = subprocess.run(
        ["git", *args],
        cwd=repo_root,
        text=True,
        capture_output=True,
    )
    if check and proc.returncode != 0:
        raise subprocess.CalledProcessError(proc.returncode, proc.args, proc.stdout, proc.stderr)
    return proc


def is_lock_error(text: str) -> bool:
    lowered = text.lower()
    return any(marker.lower() in lowered for marker in LOCK_ERROR_MARKERS)


def run_git_with_lock_retry(args: list[str], repo_root: Path, retries: int = 2) -> subprocess.CompletedProcess[str]:
    last_error: subprocess.CalledProcessError | None = None
    for attempt in range(retries + 1):
        try:
            return run_git(args, repo_root)
        except subprocess.CalledProcessError as exc:
            combined = f"{exc.stdout}\n{exc.stderr}"
            last_error = exc
            if attempt >= retries or not is_lock_error(combined):
                raise
            time.sleep(1.0)
    assert last_error is not None
    raise last_error


def repo_root_from_script() -> Path:
    return Path(__file__).resolve().parents[1]


def git_dir(repo_root: Path) -> Path:
    return repo_root / ".git"


def current_branch(repo_root: Path) -> str:
    branch = run_git(["branch", "--show-current"], repo_root).stdout.strip()
    if not branch:
        raise RuntimeError("Could not determine current git branch.")
    return branch


def status_short(repo_root: Path) -> str:
    return run_git(["status", "--short"], repo_root).stdout


def probe_git_writable(repo_root: Path) -> tuple[bool, str]:
    probe_path = git_dir(repo_root) / ".codex_lock_probe"
    try:
        probe_path.write_text("probe", encoding="utf-8")
        probe_path.unlink()
        return True, "ok"
    except OSError as exc:
        return False, str(exc)


def rev_parse(ref: str, repo_root: Path) -> str | None:
    proc = run_git(["rev-parse", ref], repo_root, check=False)
    if proc.returncode != 0:
        return None
    return proc.stdout.strip()


def fetch_branch(branch: str, repo_root: Path) -> None:
    run_git_with_lock_retry(["fetch", "origin", branch], repo_root)


def stage_changes(repo_root: Path, paths: list[str] | None) -> None:
    if paths:
        run_git_with_lock_retry(["add", *paths], repo_root)
    else:
        run_git_with_lock_retry(["add", "-A"], repo_root)


def commit_changes(message: str, repo_root: Path) -> tuple[bool, str]:
    proc = run_git(["commit", "-m", message], repo_root, check=False)
    output = f"{proc.stdout}{proc.stderr}"
    if proc.returncode == 0:
        return True, output
    if "nothing to commit" in output.lower():
        return False, output
    raise subprocess.CalledProcessError(proc.returncode, proc.args, proc.stdout, proc.stderr)


def push_branch(branch: str, repo_root: Path) -> tuple[bool, str]:
    proc = run_git(["push", "-u", "origin", branch], repo_root, check=False)
    output = f"{proc.stdout}{proc.stderr}"
    if proc.returncode == 0:
        return True, output
    if "everything up-to-date" in output.lower():
        return True, output
    if "non-fast-forward" in output.lower() or "[rejected]" in output.lower():
        return False, output
    raise subprocess.CalledProcessError(proc.returncode, proc.args, proc.stdout, proc.stderr)


def ensure_remote_synced(branch: str, repo_root: Path) -> bool:
    head = rev_parse("HEAD", repo_root)
    remote = rev_parse(f"origin/{branch}", repo_root)
    if head and remote and head == remote:
        return True
    fetch_branch(branch, repo_root)
    head = rev_parse("HEAD", repo_root)
    remote = rev_parse(f"origin/{branch}", repo_root)
    return bool(head and remote and head == remote)


def safe_rebase(branch: str, repo_root: Path) -> tuple[bool, str]:
    proc = run_git(["rebase", f"origin/{branch}"], repo_root, check=False)
    output = f"{proc.stdout}{proc.stderr}"
    if proc.returncode == 0:
        return True, output
    abort_proc = run_git(["rebase", "--abort"], repo_root, check=False)
    abort_output = f"{abort_proc.stdout}{abort_proc.stderr}"
    return False, output + "\n" + abort_output


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Safely stage, commit, and push a stable closure.")
    parser.add_argument("--message", required=True, help="Commit message to use for the sync.")
    parser.add_argument(
        "--paths",
        nargs="*",
        default=None,
        help="Optional explicit paths to stage. Defaults to all changes with git add -A.",
    )
    parser.add_argument(
        "--probe-only",
        action="store_true",
        help="Only check whether .git metadata is writable, then exit.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo_root = repo_root_from_script()

    writable, writable_reason = probe_git_writable(repo_root)
    if args.probe_only:
        if writable:
            print("Git metadata writable.")
            return 0
        print(f"{ENVIRONMENT_BLOCKED_PREFIX} {writable_reason}", file=sys.stderr)
        return 2

    if not writable:
        print(f"{ENVIRONMENT_BLOCKED_PREFIX} {writable_reason}", file=sys.stderr)
        return 2

    before_status = status_short(repo_root)
    branch = current_branch(repo_root)

    if not before_status.strip():
        print("No git diff detected. Nothing to commit.")
        return 0

    try:
        stage_changes(repo_root, args.paths)
    except subprocess.CalledProcessError as exc:
        combined = f"{exc.stdout}\n{exc.stderr}"
        if "operation not permitted" in combined.lower() and "index.lock" in combined.lower():
            print(f"{ENVIRONMENT_BLOCKED_PREFIX} {combined.strip()}", file=sys.stderr)
            return 2
        raise
    committed, commit_output = commit_changes(args.message, repo_root)
    print(commit_output.strip())

    if not committed:
        print("Commit resulted in nothing to commit. Treating as success.")
        return 0

    pushed, push_output = push_branch(branch, repo_root)
    print(push_output.strip())

    if pushed:
        if ensure_remote_synced(branch, repo_root):
            print(f"Remote sync confirmed for branch {branch}.")
            return 0
        print(f"Push returned success but remote sync could not be confirmed for branch {branch}.", file=sys.stderr)
        return 1

    fetch_branch(branch, repo_root)
    if status_short(repo_root).strip():
        print("Working tree is not clean before rebase retry. Stopping.", file=sys.stderr)
        return 1

    rebased, rebase_output = safe_rebase(branch, repo_root)
    print(rebase_output.strip())
    if not rebased:
        print("Rebase failed and was aborted. Stopping.", file=sys.stderr)
        return 1

    pushed, push_output = push_branch(branch, repo_root)
    print(push_output.strip())
    if not pushed:
        print("Push still failed after one fetch/rebase retry.", file=sys.stderr)
        return 1

    if ensure_remote_synced(branch, repo_root):
        print(f"Remote sync confirmed for branch {branch}.")
        return 0

    print(f"Push returned success after retry but remote sync could not be confirmed for branch {branch}.", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
