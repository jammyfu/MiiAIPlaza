# Long Running Autonomy

## Single Execution Entry

`CURRENT_PLAN.md` is the only current execution entrypoint.

## Wake-Up Order

1. Read `CURRENT_PLAN.md`
2. Read `docs/project-governance/WORKLOG.md`
3. Run `python3 tools/verify.py`
4. Execute the bounded slice only
5. Re-run verification
6. Update worklog, changelog, and acceptance notes
7. Run `python3 tools/next_plan.py`

## Mainline

- Preserve existing Mii editor capability while building the plaza in parallel
- Keep client contracts provider-agnostic
- Prioritize a playable world over deep infrastructure

## Avoid

- replacing the editor flow before the plaza shell is stable
- coupling client rendering directly to provider-specific schemas
- introducing realtime infrastructure before the polling and mock path is solid
