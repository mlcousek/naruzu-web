---
title: Getting started
description: Prerequisites, install, dev servers, desktop, iOS and the account server.
sidebar:
  order: 2
---

## Prerequisites

- Node 22.12 or newer and pnpm 10 (`packageManager` is `pnpm@10.32.1`). The account server needs Node 24 (`apps/server/package.json`, `engines`).
- Windows is the reference platform for the desktop app and for visual baselines. Linux works for the browser build, unit tests and the smoke tier.
- A hardware GPU context for anything that rides the 3D world (the `gpu` test tier, performance work).
- Short checkout paths on Windows (long paths break some tools).
- For the iOS shell: a Mac with a recent Xcode. See `docs/IPHONE-INSTALLATION.md`; the iPhone build has not been verified on a device.

## Install

```bash
pnpm install --frozen-lockfile
```

Playwright needs a browser once:

```bash
pnpm exec playwright install chromium
```

Electron downloads its binary on first install. If an offline install leaves `node_modules/electron/dist` missing, run `node node_modules/electron/install.js`.

## Run

| Goal                               | Command                                                              | Notes                                                                                                             |
| ---------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Browser dev server                 | `pnpm dev`                                                           | Vite at `http://127.0.0.1:5173` (`apps/web/package.json`). Development mode does not register the service worker. |
| Built, offline-capable browser app | `pnpm build` then `pnpm --filter @naruzu/web preview --port 5173`    | Open once online to cache the shell.                                                                              |
| Desktop (Electron)                 | `pnpm desktop`                                                       | Builds, then runs `electron apps/desktop/main.cjs`.                                                               |
| Desktop, public beta profile       | `pnpm desktop:beta`                                                  | See [build profiles](/naruzu-web/docs/dev/build-profiles/).                                                           |
| Account server                     | `node apps/server/src/main.ts` or `pnpm --filter @naruzu/server dev` | Node 24, no third-party packages, data in `./data`.                                                               |
| Account server in Docker           | `docker compose -f apps/server/docker-compose.yml up --build`        | Set `AUTH_SECRET` first; see `apps/server/.env.example`.                                                          |
| Server tryout                      | `pnpm server:tryout`                                                 | Starts a throwaway server and drives two riders through friends, groups, chat and erase.                          |
| iOS sync                           | `pnpm --filter @naruzu/ios sync`                                     | Runs the personal-data and distribution scans first, then `cap sync ios`.                                         |

Open **GPX ride**, choose **Use demo route** and **Start ride** for a simulated preview that needs no trainer.

The app finds the account server at `VITE_ACCOUNT_API` (build time), default `http://127.0.0.1:38787`.

Browser data is origin specific. Keep the same address and port between runs, or use backup and restore. Windows desktop data lives under `%APPDATA%/NARUZU`.

## Check your setup

```bash
pnpm typecheck
pnpm lint
pnpm test
```

A clean checkout must leave `git status` clean after tests and tools: they write to the ignored `artifacts/run/`, and `node tools/check-clean-tree.mjs` fails on anything else.

## Where to go next

Read the [monorepo map](/naruzu-web/docs/dev/monorepo-map/) and [architecture](/naruzu-web/docs/dev/architecture/), then the [PR checklist](/naruzu-web/docs/dev/conventions/).

## Sources

`README.md`, `package.json`, `apps/web/package.json`, `apps/server/package.json`, `apps/ios/package.json`, `docs/ACCOUNTS.md`, `docs/IPHONE-INSTALLATION.md`, `docs/INSTALLATION-LINUX.md`, `docs/EVIDENCE-ARCHIVE.md`, `tools/check-clean-tree.mjs`.
