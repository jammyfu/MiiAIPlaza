#!/usr/bin/env python3
from __future__ import annotations

import sys
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from tools.git_safe_sync import ENVIRONMENT_BLOCKED_PREFIX, probe_git_writable, repo_root_from_script


def main() -> int:
    repo_root: Path = repo_root_from_script()
    writable, reason = probe_git_writable(repo_root)
    if writable:
        print("Git metadata writable.")
        return 0
    print(f"{ENVIRONMENT_BLOCKED_PREFIX} {reason}")
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
