#!/usr/bin/env python3
from __future__ import annotations

import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import tools.verify as verify


def completed(args: list[str], returncode: int = 0) -> subprocess.CompletedProcess[str]:
    return subprocess.CompletedProcess(args=args, returncode=returncode)


class VerifyTests(unittest.TestCase):
    def test_verification_commands_use_explicit_executables(self) -> None:
        with tempfile.TemporaryDirectory() as tmpdir:
            repo_root = Path(tmpdir)
            expected_bun = str(repo_root / "node_modules" / ".bin" / "bun")
            expected_home_bun = str(Path.home() / ".bun" / "bin" / "bun")

            def fake_exists(self: Path) -> bool:
                return str(self) in {expected_bun, expected_home_bun}

            with patch.object(verify.shutil, "which", return_value=None):
                with patch.object(Path, "exists", fake_exists):
                    commands = verify.verification_commands(repo_root)

        self.assertEqual(commands[0][0], expected_home_bun)
        self.assertEqual(
            commands[1],
            [
                sys.executable,
                "-m",
                "unittest",
                "tools.test_sync_or_queue",
                "tools.test_queue_local_git_sync",
                "tools.test_verify",
            ],
        )
        self.assertEqual(commands[2], [expected_home_bun, "run", "build.ts", "--once"])

    def test_main_runs_commands_without_shell(self) -> None:
        with tempfile.TemporaryDirectory() as tmpdir:
            repo_root = Path(tmpdir)
            calls: list[list[str]] = []

            def fake_run(args: list[str], cwd: Path, **kwargs: object) -> subprocess.CompletedProcess[str]:
                self.assertEqual(cwd, repo_root)
                self.assertNotIn("shell", kwargs)
                calls.append(args)
                return completed(args)

            command_list = [
                ["bun", "test"],
                [sys.executable, "-m", "unittest", "tools.test_sync_or_queue"],
                ["bun", "run", "build.ts", "--once"],
            ]

            with patch.object(verify, "repo_root_from_script", return_value=repo_root):
                with patch.object(verify, "verification_commands", return_value=command_list):
                    with patch.object(verify.subprocess, "run", side_effect=fake_run):
                        exit_code = verify.main()

        self.assertEqual(exit_code, 0)
        self.assertEqual(calls, command_list)


if __name__ == "__main__":
    unittest.main()
