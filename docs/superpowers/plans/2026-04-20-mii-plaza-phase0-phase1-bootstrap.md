# Mii Plaza Phase 0 and Phase 1 Bootstrap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the repository governance baseline and ship the first playable plaza shell beside the existing editor flow.

**Architecture:** Keep the current app intact and add a parallel plaza mode that boots from the existing frontend entrypoint. Isolate the new world shell behind provider-agnostic contracts and a mock presence provider so later `OpenClaw` integration only touches the adapter edge.

**Tech Stack:** Bun, TypeScript, Three.js, Sass, Python 3

---

### Task 1: Add project governance and automation files

**Files:**
- Create: `PROJECT_BRIEF.md`
- Create: `MASTER_PLAN.md`
- Create: `CURRENT_PLAN.md`
- Create: `TODO_BACKLOG.md`
- Create: `docs/architecture/PLATFORM_ROADMAP.md`
- Create: `docs/project-governance/WORKLOG.md`
- Create: `docs/project-governance/DECISIONS.md`
- Create: `docs/project-governance/ACCEPTANCE.md`
- Create: `docs/project-governance/CHANGELOG.md`
- Create: `docs/AUTOMATION_COMMANDS.md`
- Create: `docs/LONG_RUNNING_AUTONOMY.md`

- [ ] **Step 1: Write the docs with concrete project direction**

```md
# Current Plan

## Current Slice

Phase 0 and early Phase 1 bootstrap.
```

- [ ] **Step 2: Verify the files form a single plan hierarchy**

Run: `python3 - <<'PY'\nfrom pathlib import Path\nfor path in [Path('PROJECT_BRIEF.md'), Path('MASTER_PLAN.md'), Path('CURRENT_PLAN.md')]:\n    assert path.exists(), path\nprint('planning-files-ok')\nPY`

Expected: `planning-files-ok`

- [ ] **Step 3: Commit**

```bash
git add PROJECT_BRIEF.md MASTER_PLAN.md CURRENT_PLAN.md TODO_BACKLOG.md docs/
git commit -m "docs: add project governance baseline"
```

### Task 2: Add automation-safe verification and next-plan tooling

**Files:**
- Modify: `build.ts`
- Create: `tools/verify.py`
- Create: `tools/next_plan.py`
- Modify: `package.json`

- [ ] **Step 1: Add one-shot build support**

```ts
const runOnce = process.argv.includes("--once");
await build();
if (!runOnce) {
  watch(...);
}
```

- [ ] **Step 2: Add verification script**

```py
subprocess.run([bun, "test", "src/providers/mockPlazaPresence.test.ts"], check=True)
subprocess.run([bun, "run", "build.ts", "--once"], check=True)
```

- [ ] **Step 3: Add next-plan helper**

```py
pending = [line for line in current_plan if line.startswith("- [ ]")]
print(pending[:3])
```

- [ ] **Step 4: Run verification**

Run: `python3 tools/verify.py`
Expected: test and build succeed

- [ ] **Step 5: Commit**

```bash
git add build.ts tools/verify.py tools/next_plan.py package.json
git commit -m "chore: add automation-safe project tooling"
```

### Task 3: Define plaza contracts and a mock presence provider

**Files:**
- Create: `src/contracts/plaza.ts`
- Create: `src/providers/mockPlazaPresence.ts`
- Create: `src/providers/mockPlazaPresence.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { expect, test } from "bun:test";
import { listMockResidents } from "./mockPlazaPresence";

test("mock residents expose stable ids", () => {
  const residents = listMockResidents();
  expect(new Set(residents.map((resident) => resident.agent.id)).size).toBe(
    residents.length
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test src/providers/mockPlazaPresence.test.ts`
Expected: FAIL with module or export missing

- [ ] **Step 3: Write minimal implementation**

```ts
export function listMockResidents(): PlazaResident[] {
  return [{ agent: { id: "openclaw" }, presence: { status: "active" } }] as PlazaResident[];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test src/providers/mockPlazaPresence.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/contracts/plaza.ts src/providers/mockPlazaPresence.ts src/providers/mockPlazaPresence.test.ts
git commit -m "feat: add plaza presence contracts"
```

### Task 4: Add the first playable plaza shell

**Files:**
- Create: `src/game/plaza/createPlazaExperience.ts`
- Create: `src/ui/pages/Plaza.ts`
- Modify: `src/ui/setup.ts`
- Modify: `src/ui/pages/Library.ts`
- Modify: `src/scss/main.scss`

- [ ] **Step 1: Route a new plaza mode from the existing app entry**

```ts
if (searchParams.has("plaza")) {
  Plaza();
  return;
}
```

- [ ] **Step 2: Render the shell and movement scene**

```ts
const scene = new Scene();
const player = new Mesh(new CapsuleGeometry(...), material);
```

- [ ] **Step 3: Add interaction HUD and resident panel**

```ts
prompt.textContent = nearest?.prompt ?? "Walk toward a resident or hotspot";
```

- [ ] **Step 4: Expose an entry button in the library**

```ts
new Html("button").text("Enter Plaza").on("click", () => {
  location.href = `${location.pathname}?plaza=1`;
});
```

- [ ] **Step 5: Run verification**

Run: `python3 tools/verify.py`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/game/ src/ui/pages/Plaza.ts src/ui/setup.ts src/ui/pages/Library.ts src/scss/main.scss
git commit -m "feat: add first playable plaza shell"
```
