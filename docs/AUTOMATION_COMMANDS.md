# Automation Commands

## Primary Commands

```bash
python3 tools/verify.py
python3 tools/next_plan.py
```

## Supporting Commands

```bash
bun install
bun run build.ts --once
bun test src/providers/mockPlazaPresence.test.ts
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
- Continuous automation should wake this thread every 10 minutes, assess `CURRENT_PLAN.md`, execute one stable closure, verify, then record the result back into the governance files before continuing.
