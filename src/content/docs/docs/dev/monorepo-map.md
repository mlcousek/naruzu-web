---
title: Monorepo map
description: Every app and package in the pnpm workspace, what it owns and which way dependencies point.
sidebar:
  order: 3
---

The workspace is `apps/*` and `packages/*` (`pnpm-workspace.yaml`). Packages are consumed from source (`exports` points at `src/index.ts`); `tsconfig.json` maps each `@naruzu/*` name to its source for type checking.

## Apps

| App            | Responsibility                                                                                                                                                                                                 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/web`     | The React and Vite UI, PWA shell and service worker generation, ride session, HUD, all screens, English and Czech catalogues. Two HTML entries: the app and `device-host.html` (Bluetooth host page).          |
| `apps/desktop` | Electron main process in CommonJS: window and crash recovery, IPC modules (`ipc*.cjs`), device host, built-in router (BRouter) and regional maps, sensor relay, secret storage, update check, security guards. |
| `apps/ios`     | Capacitor shell: native Bluetooth, file and credential ports and the mobile lifecycle (`src/runtime.ts`, `src/bluetooth.ts`).                                                                                  |
| `apps/server`  | The account server: sign-in, sync, friends, groups, chat, challenges. Node 24 built-ins only (`node:http`, `node:sqlite`, `node:crypto`).                                                                      |

## Packages

| Package                | Responsibility                                                                                                                                                                                                     | Public API surface (from `src/index.ts`)                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `@naruzu/core`         | Profile, units, normalized power and training load, logger, release/version helpers                                                                                                                                | `Profile`, `createLogger`, power-load functions                                                   |
| `@naruzu/simulation`   | Fixed-step ride physics (gravity, rolling, drag, drivetrain, inertia)                                                                                                                                              | `RidePhysics`, `Physics`, grade helpers                                                           |
| `@naruzu/routes`       | GPX parsing and repair, elevation, route library, famous climbs, scenic rides, race editions and the compact race data format, quick-ride and route planning                                                       | `parseGpx`, `RouteLibrary`, route and race catalogues, `enableBinaryRaceData`                     |
| `@naruzu/devices`      | Bluetooth (FTMS, power, cadence, heart rate) decoding, the `BleManager`, control point queue, ERG and simulation commands, spin-down, ANT+ FE-C transport boundary, vendor adapter registry, sensor relay protocol | `BleManager`, `BleControl`, protocol decoders, `ControlLost`/`ControlRejected`, `SpinDownSession` |
| `@naruzu/recording`    | Ride engine, journal in IndexedDB, interruption and recovery, FIT export, history and summaries, data-quality checks                                                                                               | `RideEngine`, `RideJournal`, `fitActivity`, `detectSuspectReadings`                               |
| `@naruzu/storage`      | Dataset repository, backup and restore, per-store usage and storage budgets                                                                                                                                        | `STORAGE_BUDGETS`, `measureStores`                                                                |
| `@naruzu/workouts`     | Normalized workout model, ZWO import, execution state, ERG guard, ramp test, library                                                                                                                               | `Workout`, `importZwo`, `advanceWorkout`, `ErgGuard`                                              |
| `@naruzu/world`        | The 3D world: three.js scene, chunk streaming, terrain, roads, scenery, riders, post-processing, quality presets, generation worker                                                                                | `WorldScene`, `classifyDevice`, `qualityProfiles`, `StylizedPost`                                 |
| `@naruzu/companions`   | Ghosts, bots, drafting, segments, race controller and tactics                                                                                                                                                      | `draftMultiplier`, ghosts and race runtime                                                        |
| `@naruzu/career`       | Stage-race career: field, teams, simulation of unridden parts, scoring, standings, rewards, migration (off in the public beta)                                                                                     | pure and deterministic, no React or three.js                                                      |
| `@naruzu/progression`  | Rewards, quests, seasons, cosmetic coin-shop catalogue with price lock files                                                                                                                                       | `ProgressionRepository`, receipts, bonuses                                                        |
| `@naruzu/training`     | Training plans, fitness and load, FTP history, power curve, records                                                                                                                                                | plans, load, curve                                                                                |
| `@naruzu/exploration`  | Visited countries and GPX history, country boundaries                                                                                                                                                              | `ExplorationRepository`                                                                           |
| `@naruzu/integrations` | Intervals.icu and Strava provider adapters and the durable upload outbox                                                                                                                                           | `Provider`, `Transport`, outbox                                                                   |
| `@naruzu/accounts`     | Client for the account server: auth, sync engine, social and group APIs                                                                                                                                            | `manager`, `syncEngine`, API clients                                                              |

`@naruzu/world` also exports `./minimap`, `./raceLines` and `./settings` sub-paths. `docs/ARCHITECTURE.md` mentions a `packages/ui` module as proposed; it does not exist in the repository.

## Dependency direction

```text
apps/web ──► every package            apps/desktop ──► (no @naruzu packages; talks to the page over IPC)
                                      apps/ios     ──► Capacitor plugins, loaded by apps/web

core ◄── recording ◄── training            routes ◄── simulation ◄── recording
core ◄── storage                           routes ◄── world ◄── progression
workouts ◄── recording / integrations      routes + simulation ◄── career
recording + routes + simulation ◄── companions
```

The rule that matters: lower packages never import from `apps/*`, `world` never imports React, and `career` and `simulation` stay free of three.js so they run in tests and workers. Check a package's real imports in its `package.json` before assuming a new edge is allowed.

## Sources

`pnpm-workspace.yaml`, `tsconfig.json`, `package.json` files of each app and package, each package's `src/index.ts`, `docs/ARCHITECTURE.md`, `apps/server/Dockerfile`, `apps/desktop/main.cjs`.
