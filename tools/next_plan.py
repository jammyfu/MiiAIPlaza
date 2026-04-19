#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path


def pending_checkboxes(path: Path) -> list[str]:
    if not path.exists():
        return []
    return [line.strip() for line in path.read_text().splitlines() if line.strip().startswith("- [ ]")]


def main() -> int:
    repo_root = Path(__file__).resolve().parent.parent
    current_plan = repo_root / "CURRENT_PLAN.md"
    master_plan = repo_root / "MASTER_PLAN.md"

    pending = pending_checkboxes(current_plan)
    print("# Next Plan Suggestion")
    if pending:
        for item in pending[:3]:
            print(item)
        return 0

    print("No unchecked boxes found in CURRENT_PLAN.md.")
    print("Review these master phases next:")
    for line in master_plan.read_text().splitlines():
        if line.startswith("## "):
            print(f"- {line[3:]}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
