# Long Running Autonomy

## Single Execution Entry

`CURRENT_PLAN.md` is the only current execution entrypoint.

## Wake-Up Order

1. Read `CURRENT_PLAN.md`
2. Read `docs/project-governance/WORKLOG.md`
3. Check `git status --short` and close any existing stable diff before starting new work
4. Run `python3 tools/verify.py`
5. Execute the bounded slice only
6. Re-run verification
7. Update worklog, changelog, backlog, and acceptance notes
8. Run `python3 tools/next_plan.py`

## Heartbeat Cadence

- Preferred automation mode: a heartbeat attached to this thread every 10 minutes
- Each wake-up should complete at most one small stable closure before verifying and recording

## Mainline

- Preserve existing Mii editor capability while building the plaza in parallel
- Keep client contracts provider-agnostic
- Prioritize a playable world over deep infrastructure

## Avoid

- replacing the editor flow before the plaza shell is stable
- coupling client rendering directly to provider-specific schemas
- introducing realtime infrastructure before the polling and mock path is solid
