#!/usr/bin/env python3
from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path


def run(command: list[str], cwd: Path) -> None:
    print(f"+ {' '.join(command)}")
    subprocess.run(command, cwd=cwd, check=True)


def resolve_bun(repo_root: Path) -> str | None:
    candidates = [
        shutil.which("bun"),
        str(Path.home() / ".bun" / "bin" / "bun"),
        str(repo_root / "node_modules" / ".bin" / "bun"),
    ]

    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return candidate
    return None


def repo_root_from_script() -> Path:
    return Path(__file__).resolve().parent.parent


def verification_commands(repo_root: Path) -> list[list[str]]:
    bun = resolve_bun(repo_root)
    if bun is None:
        raise RuntimeError("bun executable not found in known locations")

    return [
        [
            bun,
            "test",
            "src/providers/mockPlazaPresence.test.ts",
            "src/game/plaza/plazaResidentAvatarAdapter.test.ts",
        ],
        [
            sys.executable,
            "-m",
            "unittest",
            "tools.test_sync_or_queue",
            "tools.test_queue_local_git_sync",
            "tools.test_verify",
        ],
        [bun, "run", "build.ts", "--once"],
    ]


def main() -> int:
    repo_root = repo_root_from_script()
    try:
        commands = verification_commands(repo_root)
    except RuntimeError as error:
        print(str(error), file=sys.stderr)
        return 1

    for command in commands:
        run(command, repo_root)

    print("verify: ok")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
