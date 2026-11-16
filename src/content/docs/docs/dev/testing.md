---
title: Testing strategy
description: Vitest, the Playwright tiers, local gates, module-size caps, Czech coverage and the golden-file policy.
sidebar:
  order: 7
---

## No paid CI

A red or missing GitHub check is a billing state of the free account, not a code verdict. The owner decided against paid CI, so the gates run locally and a skipped CI run is never a pass. A minimal `ci.yml` exists (checks, repo gates, server, e2e smoke) and heavier workflows are manual or weekly.

## Local gate before merging or releasing

```bash
pnpm typecheck
pnpm lint            # ESLint plus the module size budget
pnpm test            # vitest, 3 workers
pnpm build           # bundle, offline service worker and the build gates
pnpm release:beta    # beta variants scanned for private content
pnpm gate:beta       # frame-time gate (needs a hardware GL context)
```

Also: `pnpm format:check origin/main` (Prettier on changed files only), `pnpm typecheck:desktop` (ratchet for the CommonJS desktop code), `pnpm check:repo`, `pnpm docs:links`, `pnpm docs:check`, and `openspec validate --all --strict --no-interactive`.

`pnpm build` is itself a gate: after Vite it encodes race data, generates the service worker and runs the CSP, worker-size, dev-page, startup-budget, asset-budget and personal-data checks.

### Known state on `main` (2026-11-16)


## Unit tests

Vitest covers `packages`, `apps/web/src`, `apps/desktop`, `apps/server`, `apps/ios/src` and `tools` (`vitest.config.ts`). `pnpm vitest run <path>` runs a subset. Slow checks are named `*.slow.test.ts`, are outside the default run and execute with `npx vitest run --project slow`. `pnpm test:regressions` runs files named `regression`. Pure logic (state machines, physics, career, generation cores) is kept apart from React and three.js so it can be tested without a browser; the ride state machine is a table that is unit tested for every phase and command pair.

## Playwright tiers

Every spec in `tests/` begins with exactly one marker, `// e2e-tier: smoke`, `full` or `gpu`; `playwright.config.ts` turns markers into projects and `pnpm e2e:tiers` fails on a missing, duplicate or unknown marker.

| Tier    | Intent                                     | Needs                               | Command              |
| ------- | ------------------------------------------ | ----------------------------------- | -------------------- |
| `smoke` | Journeys that need no ride frames          | software GL is fine                 | `pnpm test:e2e`      |
| `full`  | Slower non-ride journeys, visual baselines | Windows for shared visual baselines | `pnpm test:e2e:full` |
| `gpu`   | Rides the world or measures frame time     | hardware GL context                 | `pnpm test:e2e:gpu`  |

`pnpm test:e2e:all` runs every offered project. All e2e commands build first. The `gpu` project is offered only on Windows or when `NARUZU_E2E_GPU=1`; software GL trips the ride engine's stall guard, so those specs are left out of a run (with a printed warning), never reported as passed. Default is one worker (`NARUZU_E2E_WORKERS` raises it), `NARUZU_E2E_PORT` allows a second checkout, `NARUZU_E2E_DEV=1` serves the dev server for specs that need dev-only tools. `pnpm e2e:inventory` lists every spec with tier, test count and duration.

Fixtures in `tests/fixtures/` seed the ride journal, careers and long-use data directly instead of driving menus. Visual fixtures fix the date so date-driven labels are stable. Visual and computed-style baselines use Windows font metrics; do not replace them from another OS.

## Flake policy

A flake fails an attempt and passes on a retry. Retries are on only in CI (`retries: 1`). `pnpm e2e:flakes` fails for a spec with 3 recorded retries in 30 days until it is quarantined with an owner and a deadline in `tests/flake-ledger.json`. Do not call a failure unrelated without re-running it alone.

## Soak and recovery

`pnpm soak` (with `--short`, `--only`, `--minutes`) runs a 30 minute heap soak, an offline cold start and a crash-recovery check on a developer machine. They need real time and an idle machine.

## Module size caps (they only shrink)

ESLint warns above 400 lines per `.ts`, `.tsx`, `.cjs`, `.mjs` file. `tools/check-module-size.mjs`, run by `pnpm lint`, fails a file over 800 lines that is not allowlisted, fails an allowlisted file that grows past its recorded cap, and fails an allowlisted file that shrank to 400 or fewer until its entry is removed. After a split, lower the caps with `node tools/check-module-size.mjs --update`. Never raise a cap.

## Czech coverage

`pnpm check:cs` runs `csCoverage.test.ts` and `messages.test.ts`: every English UI text needs a non-empty Czech entry with matching placeholders, and texts that bypass the typed `t()` (runtime `tr()` calls and state-setter strings) are scanned. See [i18n and accessibility](/naruzu-web/docs/dev/i18n-a11y/).

## Golden files

Deterministic simulations (career, race controller, team tactics) have golden tests that pin results for older versions. The policy: simulations stay seeded and deterministic; runs of an older version must simulate as before; a golden is re-recorded only for an intended change, once, with a note in the change that explains why. Visual baselines follow the same rule: refresh only in the pull request that justifies it. Do not "fix" a failing golden by regenerating it without understanding the diff.

## Other guards worth knowing

- IPC agreement: the desktop preload and main must register the same channels.
- Listener inventory: a new desktop network listener must be added to the inventory or its test fails.
- Evidence writers: tests and tools may not write literal `artifacts/` paths; run output goes through `evidencePath()`.
- `node tools/check-clean-tree.mjs` after tests: the tree must stay clean.

## Sources

`docs/TESTING.md`, `docs/ENGINEERING-CHECKS.md`, `package.json`, `vitest.config.ts`, `playwright.config.ts`, `tools/e2e-inventory.mjs`, `tools/e2e-flakes.mjs`, `tools/check-module-size.mjs`, `tools/run-soak-checks.mjs`, `apps/web/src/csCoverage.test.ts`, `packages/career/src/*.golden.test.ts`, `.github/workflows/ci.yml`.
