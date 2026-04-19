#!/usr/bin/env python3
from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path


def run(command: list[str], cwd: Path) -> None:
    print(f"+ {' '.join(command)}")
    subprocess.run(command, cwd=cwd, check=True)


def main() -> int:
    repo_root = Path(__file__).resolve().parent.parent
    bun = shutil.which("bun")
    if bun is None:
        print("bun executable not found in PATH", file=sys.stderr)
        return 1

    run([bun, "test", "src/providers/mockPlazaPresence.test.ts"], repo_root)
    run([bun, "run", "build.ts", "--once"], repo_root)
    print("verify: ok")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
