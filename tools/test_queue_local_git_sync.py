#!/usr/bin/env python3
from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import tools.queue_local_git_sync as queue_local_git_sync


class QueueLocalGitSyncTests(unittest.TestCase):
    def test_main_writes_request_and_kickstarts_agent(self) -> None:
        with tempfile.TemporaryDirectory() as tmpdir:
            repo_root = Path(tmpdir)

            with patch.object(queue_local_git_sync, "repo_root_from_script", return_value=repo_root):
                with patch.object(queue_local_git_sync, "kickstart_local_agent", return_value=(True, "")) as mocked_kickstart:
                    with patch("sys.argv", ["queue_local_git_sync.py", "--message", "docs: stable closure"]):
                        exit_code = queue_local_git_sync.main()

            self.assertEqual(exit_code, 0)
            mocked_kickstart.assert_called_once()

            request_file = repo_root / ".codex-local" / "git_sync_request.json"
            self.assertTrue(request_file.exists())
            payload = json.loads(request_file.read_text(encoding="utf-8"))
            self.assertEqual(payload["message"], "docs: stable closure")
            self.assertEqual(payload["repo_root"], str(repo_root))


if __name__ == "__main__":
    unittest.main()
