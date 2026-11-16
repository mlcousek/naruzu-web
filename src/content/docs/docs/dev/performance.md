---
title: Performance budgets and measurement
description: Frame, draw call, main-thread, startup and storage budgets, and how to measure each.
sidebar:
  order: 8
---

Every figure describes the machine and graphics backend it was taken on. Compare runs on the same machine; reports name both. No reference machine is set, and most published numbers come from one laptop.

## Budgets at a glance

| What                                | Budget                                                                                                                                    | Where it lives                                                            | How to check                                                           |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Triangles and draw calls per preset | low 750k / 200, balanced 1.5M / 300, high 2.5M / 450                                                                                      | `packages/world/src/qualityBudget.ts`                                     | `pnpm budget` measures kit models against `tools/budget-baseline.json` |
| Beta gate frame metrics             | p95 22 ms, worst frame after warm-up 100 ms, at most 2 frames over 50 ms per minute, 0 auto-pauses, 0 unlisted long tasks, regression 15% | `tools/beta-gate-budget.json`                                             | `pnpm gate:beta`                                                       |
| Main-thread task during a ride      | 50 ms; frame gap 250 ms; large GPX preview task 100 ms                                                                                    | `apps/web/src/mainThreadBudget.ts`, allowlist in `mainThreadAllowlist.ts` | `NARUZU_BUDGET=1` specs                                                |
| Startup and install                 | startup closure, largest chunk, precache bytes and file count                                                                             | `tools/startup-budget.json`                                               | `pnpm build` runs `tools/check-startup-budget.mjs`                     |
| Asset size and GPU texture memory   | per file and precache ceilings                                                                                                            | `tools/asset-budget.json`                                                 | `pnpm assets:check`, `pnpm assets:weight`                              |
| World generation worker bundle      | 300 kB, no renderer inside                                                                                                                | `tools/check-worker-size.mjs`                                             | runs in `pnpm build`                                                   |
| Local storage per store             | measured ceilings for 1 and 3 years of riding                                                                                             | `packages/storage/src/budget.ts`, `docs/STORAGE-BUDGET.md`                | long-use fixture tests                                                 |

## Measuring a ride

- **Launch marks.** `performance.mark("naruzu:launch:<phase>")` for `terrain`, `graphics`, `renderer-ready` and `ready` (`launchMarks.ts`). Read with `performance.getEntriesByType("mark")`. Slow chunk steps leave `naruzu:chunk-step` and `naruzu:chunk-create` measures.
- **Long-task recorder.** Off by default. Enable with `?longtasks=1` or `localStorage["naruzu.longtasks"] = "1"`; it exposes `window.__naruzuLongTasks` (`report()`, `reset()`, `stop()`) and records long tasks and frame gaps with the active screen. Entries over budget go to the redacting logger without route names or file contents.
- **Beta gate.** `pnpm gate:beta` builds, rides a 70 s balanced ride and the main-thread scenario, and compares with the budget file and a per-machine baseline in `test-results/beta-gate/`. It needs a hardware GL context, never substitutes numbers, and `--dry-run` only validates the budget file. `--update-baseline` stores a baseline on purpose.
- **A/B comparison.** `tests/ride-perf-ab.spec.ts` (opt-in with `NARUZU_PERF=1`) alternates A and B variants in A B B A order and writes result files; `node tools/benchmark-compare.mjs a.json b.json` prints a percentage only when machine, backend and fixture match. A few runs on a busy machine say nothing below roughly a 30% change.

## Allowlist and offload rule

Anything long over budget needs an allowlist entry with an id, scenario, maximum, reason, owner and measured value; a unit test enforces that the limit is at most 1.25 times the measurement. Removing entries is the goal. Work estimated over 50 ms must run in a worker, be baked at build time, or yield between slices; record before and after numbers in the owning change.

## Lessons recorded in the repository

- Shader link time dominated launch: compiling programs with several `compileAsync` calls at once cut the demo loop launch from a 25 to 60 s spread to about 20 s. Hidden layers must be shown for the warm-up render or they compile on first appearance mid-ride.
- Slicing rider-group compilation per drawable was tried and made launch slower; it was not shipped. Negative results are kept in `docs/WORLD-BUDGET.md`.
- Software GL is unusable for ride frames; frame work is never measured there.

## Sources

`docs/PERFORMANCE-BUDGET.md`, `docs/WORLD-BUDGET.md`, `docs/ASSET-WEIGHT.md`, `docs/STORAGE-BUDGET.md`, `tools/beta-gate-budget.json`, `tools/gate-beta.mjs`, `tools/startup-budget.json`, `tools/asset-budget.json`, `tools/benchmark-compare.mjs`, `tools/budget-report.mjs`, `apps/web/src/launchMarks.ts`, `apps/web/src/mainThreadBudget.ts`, `packages/world/src/qualityBudget.ts`.
