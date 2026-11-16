---
title: Developer docs
description: Start here. A map of the internal NARUZU documentation for contributors.
sidebar:
  label: Overview
  order: 0
---

NARUZU is a personal indoor cycling app (Windows, Linux, browser, later iPhone) built as a TypeScript pnpm monorepo. These pages are the contributor view of the repository: how to run it, how it is put together, what the gates are and how a change travels from idea to release.

Every page lists the repository files it was derived from under **Sources**. The repository is the authority: when a page and the code disagree, the code wins and the page needs a fix.

| Page                                                                  | What it covers                                                                                  |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [Getting started](/naruzu-web/docs/dev/getting-started/)                  | Prerequisites, install, dev servers, desktop, iOS, account server                               |
| [Monorepo map](/naruzu-web/docs/dev/monorepo-map/)                        | Apps and packages, responsibilities, dependency direction                                       |
| [Runtime architecture](/naruzu-web/docs/dev/architecture/)                | App shell, ride state machine, launch pipeline, rendering, workers, devices, recording, offline |
| [Build profiles and feature flags](/naruzu-web/docs/dev/build-profiles/)  | Public beta vs private profile, environment flags, the private-asset guard                      |
| [Data, assets and licensing](/naruzu-web/docs/dev/data-and-assets/)       | Asset ledger, map data and ODbL, race data, distribution scan                                   |
| [Testing](/naruzu-web/docs/dev/testing/)                                  | Vitest, Playwright tiers, local gates, size caps, Czech coverage, goldens                       |
| [Performance](/naruzu-web/docs/dev/performance/)                          | Budgets and how to measure them                                                                 |
| [Internationalisation and accessibility](/naruzu-web/docs/dev/i18n-a11y/) | English and Czech catalogues, the 12 px and 44 px rules, contrast tests                         |
| [Release process](/naruzu-web/docs/dev/release/)                          | Versioning, packaging, checksums, smoke launch                                                  |
| [Conventions and PR checklist](/naruzu-web/docs/dev/conventions/)         | Code conventions and what to run before a pull request                                          |
| [Glossary](/naruzu-web/docs/dev/glossary/)                                | Terms used across the code and docs                                                             |

## Sources

`README.md`, `docs/README.md`, `docs/ARCHITECTURE.md`, `package.json`.

## Status of this documentation

Written 2026-11-15 from `main` at commit `71ad7296`. Commands were checked against the root `package.json` and `tools/`. Anything that needs a GPU, a Windows desktop or a real trainer was not run while writing, and the relevant pages say so.
