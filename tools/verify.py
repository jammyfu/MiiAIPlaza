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


def main() -> int:
    repo_root = Path(__file__).resolve().parent.parent
    bun = resolve_bun(repo_root)
    if bun is None:
        print("bun executable not found in known locations", file=sys.stderr)
        return 1

    run(
        [
            bun,
            "test",
            "src/providers/mockPlazaPresence.test.ts",
            "src/game/plaza/plazaResidentAvatarAdapter.test.ts",
        ],
        repo_root,
    )
    run([bun, "run", "build.ts", "--once"], repo_root)
    print("verify: ok")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
