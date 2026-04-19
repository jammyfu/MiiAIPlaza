# AGENTS

## Project Loop

This repository uses the `continuous-project-loop` convention.

### Canonical files

- `CURRENT_PLAN.md`: the only current execution entrypoint
- `MASTER_PLAN.md`: long-range roadmap
- `TODO_BACKLOG.md`: deferred and candidate work
- `docs/project-governance/WORKLOG.md`: execution history
- `docs/project-governance/DECISIONS.md`: architectural and process decisions
- `docs/project-governance/ACCEPTANCE.md`: active acceptance targets and evidence
- `docs/project-governance/CHANGELOG.md`: user-visible or developer-visible changes

## Required loop

1. Read this file first.
2. Check whether the git worktree is clean before starting new work.
3. Read `CURRENT_PLAN.md`, `PROJECT_BRIEF.md`, and the governance docs.
4. Pick one small, high-value, low-blocking task from `CURRENT_PLAN.md`.
5. Implement a stable closure.
6. Run `python3 tools/verify.py`.
7. Update `CURRENT_PLAN.md`, `TODO_BACKLOG.md`, and the governance records.
8. If the current slice is complete, generate and hand-check the next slice.

## Dirty worktree rule

- If `git status --short` is non-empty, do not expand scope immediately.
- First decide whether the current diff is already a stable closure.
- If it is stable, verify first, then prefer the repository sync entrypoint instead of raw `git commit` / `git push`.
- If it is not stable, finish or explicitly record the blocker in `docs/project-governance/WORKLOG.md`.

## Verification

Primary command:

```bash
python3 tools/verify.py
```

Supporting commands:

```bash
python3 tools/next_plan.py
python3 tools/sync_or_queue.py --message "<stable-closure>"
python3 tools/check_git_writable.py
python3 tools/queue_local_git_sync.py --message "<stable-closure>"
python3 tools/local_git_flush.py
python3 tools/install_local_git_sync_agent.py
python3 tools/git_safe_sync.py --message "<stable-closure>"
bun test src/providers/mockPlazaPresence.test.ts
bun run build.ts --once
```

## Sync and submission logic

- Prefer one stable closure per commit.
- Run `python3 tools/verify.py` before any commit or sync attempt.
- Heartbeat and automation runs should treat `python3 tools/sync_or_queue.py --message "<stable-closure>" --prefer-local` as the default submission path.
- If `.git` is writable and the environment is not restricted, `python3 tools/sync_or_queue.py --message "<stable-closure>"` is the preferred direct-sync path.
- Only use raw `git commit` / `git push` manually when diagnosing the sync tooling itself.
- Treat `.codex-local/git_sync_request.json` as a sync control file, not as product work.
- If `git status --short` is empty but a sync request remains, run `python3 tools/local_git_flush.py` before deciding the repo is blocked.

## Current product direction

- Preserve the existing Mii editor and library flow
- Build the plaza as a parallel runtime at `/?plaza=1`
- Keep provider integration behind client-owned contracts
- Prefer world-first progress over infrastructure-first expansion
