# Automation Commands

## Primary Commands

```bash
python3 tools/verify.py
python3 tools/next_plan.py
python3 tools/sync_or_queue.py --message "<stable-closure>"
```

## Supporting Commands

```bash
python3 tools/check_git_writable.py
python3 tools/queue_local_git_sync.py --message "<stable-closure>"
python3 tools/local_git_flush.py
python3 tools/install_local_git_sync_agent.py
python3 tools/git_safe_sync.py --message "<stable-closure>"
bun install
bun run build.ts --once
bun test src/providers/mockPlazaPresence.test.ts src/game/plaza/plazaResidentAvatarAdapter.test.ts
python3 -m unittest tools.test_sync_or_queue tools.test_queue_local_git_sync tools.test_verify
bun run serve
```

## Plaza Runtime

Open the existing app in plaza mode:

```text
http://127.0.0.1:3000/?plaza=1
```

## Notes

- `tools/verify.py` avoids watch mode and is safe for automation.
- `tools/next_plan.py` reads the current planning files and prints the next recommended slice.
- `tools/sync_or_queue.py` is the preferred sync entrypoint: it will use direct git sync when possible and queue a local request when the environment blocks `.git` writes.
- For heartbeat-style automation, `python3 tools/sync_or_queue.py --message "<stable-closure>" --prefer-local` should be considered the default commit path.
- `.codex-local/git_sync_request.json` is a local sync control file and should not be treated as product diff.
- Continuous automation should wake this thread every 10 minutes, assess `CURRENT_PLAN.md`, execute one stable closure, verify, then record the result back into the governance files before continuing.
