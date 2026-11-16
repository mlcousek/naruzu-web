---
title: Conventions and pull request checklist
description: Coding conventions the tooling enforces and what to run before opening a pull request.
sidebar:
  order: 13
---

## Conventions

- TypeScript strict mode, ES2022, no unused locals or parameters (`tsconfig.json`). Desktop code is CommonJS checked with `checkJs` against an error baseline that may only shrink.
- Modules stay small: 400 lines is the soft limit, 800 the hard limit for new files, and existing oversized files have caps that never rise ([testing](/naruzu-web/docs/dev/testing/)).
- Promises: in ride, devices, storage, recording and integrations code, no floating promises. `await` it, mark `void` with a reason where the function handles its own failure, or `.catch` and log. Never disable the rule for a file.
- Use `retryableLazy`, not React `lazy`. No native `select`; use the choice components.
- Logging goes through the redacting logger (`apps/web/src/logger.ts`): scope in lowercase, never credentials, coordinates or file contents.
- Pure logic goes in packages; keep three.js and React out of `simulation`, `career` and generation cores.
- Seeded determinism for simulations; do not use unseeded randomness in anything that is recorded or compared against a golden.
- Add a desktop capability in three places in one change: the handler in `main.cjs` or an `ipc*.cjs` module, the bridge in `preload.cjs`, and the key lists in the preload test.
- Every user-facing string has an English and a Czech form; every new asset has a ledger row.
- Prettier applies to files you touch (`pnpm format:check origin/main`, `pnpm exec prettier --write <file>`).
- Commits follow Conventional Commits (`feat(world): ...`, `fix(garage): ...`, `perf(world): ...`, `docs: ...`); pull requests merge into `main` through a PR.
- No secrets, personal paths, private model paths, real brand data or owner contact details in tracked files; the gates scan for them.

## Pull request checklist

- [ ] An OpenSpec change exists for behaviour changes, validated with `openspec validate --all --strict --no-interactive`.
- [ ] `pnpm typecheck`, `pnpm lint`, `pnpm test` pass; `pnpm format:check origin/main` is clean.
- [ ] UI changes: `pnpm check:cs` passes, checked at 390 px and 1280 px, both themes, keyboard only, 12 px and 44 px rules respected.
- [ ] `pnpm build` passes (it runs the CSP, startup, asset and personal-data gates).
- [ ] The right e2e tier ran locally for what you touched; GPU-dependent specs were run on a GPU machine or the PR says they were not.
- [ ] `pnpm check:repo` passes if you added assets, data or dependencies.
- [ ] Docs changed alongside behaviour; `pnpm docs:links` and `pnpm docs:check` pass.
- [ ] No module-size cap raised; evidence written only under `artifacts/run/` (`node tools/check-clean-tree.mjs`).
- [ ] The description states what was verified and what was not. Do not claim hardware, GPU or device results you did not obtain.

## Sources

`tsconfig.json`, `eslint.config.js`, `package.json`, `docs/ENGINEERING-CHECKS.md`, `docs/OBSERVABILITY.md`, `docs/TESTING.md`, `git log` history for commit style.
