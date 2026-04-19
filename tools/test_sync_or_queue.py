#!/usr/bin/env python3
from __future__ import annotations

import subprocess
import unittest
from pathlib import Path
from unittest.mock import patch

import tools.sync_or_queue as sync_or_queue


def completed(
    args: list[str],
    returncode: int = 0,
    stdout: str = "",
    stderr: str = "",
) -> subprocess.CompletedProcess[str]:
    return subprocess.CompletedProcess(args=args, returncode=returncode, stdout=stdout, stderr=stderr)


class SyncOrQueueTests(unittest.TestCase):
    def test_prefer_local_queues_without_probing_git_writable(self) -> None:
        repo_root = Path("/tmp/repo")

        with patch.object(sync_or_queue, "status_short", return_value=" M CURRENT_PLAN.md\n"):
            with patch.object(sync_or_queue, "queue_local_sync", return_value=completed(["queue"], stdout="queued\n")) as mocked_queue:
                with patch.object(sync_or_queue, "probe_git_writable") as mocked_probe:
                    exit_code = sync_or_queue.run_sync_or_queue(
                        repo_root,
                        message="docs: stable closure",
                        paths=None,
                        prefer_local=True,
                    )

        self.assertEqual(exit_code, 0)
        mocked_queue.assert_called_once()
        mocked_probe.assert_not_called()

    def test_blocked_git_environment_falls_back_to_queue(self) -> None:
        repo_root = Path("/tmp/repo")

        with patch.object(sync_or_queue, "status_short", return_value=" M CURRENT_PLAN.md\n"):
            with patch.object(sync_or_queue, "probe_git_writable", return_value=(False, "Operation not permitted")):
                with patch.object(sync_or_queue, "queue_local_sync", return_value=completed(["queue"], stdout="queued\n")) as mocked_queue:
                    exit_code = sync_or_queue.run_sync_or_queue(
                        repo_root,
                        message="docs: stable closure",
                        paths=None,
                    )

        self.assertEqual(exit_code, 0)
        mocked_queue.assert_called_once()

    def test_writable_git_environment_runs_safe_sync(self) -> None:
        repo_root = Path("/tmp/repo")

        with patch.object(sync_or_queue, "status_short", return_value=" M CURRENT_PLAN.md\n"):
            with patch.object(sync_or_queue, "probe_git_writable", return_value=(True, "ok")):
                with patch.object(sync_or_queue, "run_safe_sync", return_value=completed(["sync"], returncode=0, stdout="synced\n")) as mocked_sync:
                    exit_code = sync_or_queue.run_sync_or_queue(
                        repo_root,
                        message="docs: stable closure",
                        paths=["CURRENT_PLAN.md"],
                    )

        self.assertEqual(exit_code, 0)
        mocked_sync.assert_called_once()

    def test_no_diff_returns_success_without_queue_or_sync(self) -> None:
        repo_root = Path("/tmp/repo")

        with patch.object(sync_or_queue, "status_short", return_value=""):
            with patch.object(sync_or_queue, "queue_local_sync") as mocked_queue:
                with patch.object(sync_or_queue, "run_safe_sync") as mocked_sync:
                    exit_code = sync_or_queue.run_sync_or_queue(
                        repo_root,
                        message="docs: stable closure",
                        paths=None,
                    )

        self.assertEqual(exit_code, 0)
        mocked_queue.assert_not_called()
        mocked_sync.assert_not_called()


if __name__ == "__main__":
    unittest.main()
