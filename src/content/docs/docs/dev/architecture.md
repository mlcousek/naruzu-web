---
title: Runtime architecture
description: App shell, ride state machine, launch pipeline, rendering, world streaming, workers, devices, recording, account server and offline.
sidebar:
  order: 4
---

Diagrams are plain text so they render offline.

## Layers

```text
Sensors (BLE / relay)          Route (GPX, catalogue)
        |                               |
        v                               v
  @naruzu/devices                @naruzu/routes -> workers
        | value + freshness              |
        v                                v
  ride session (apps/web) -> RideEngine -> journal -> FIT
        | fixed-step physics (@naruzu/simulation)
        | command intent -> acknowledged trainer control
        v
  snapshots -> React HUD
  snapshots -> Corridor -> @naruzu/world (three.js)
```

Principles from `docs/ARCHITECTURE.md`: React does not own the physics clock; recording consumes timestamped measurements, the renderer consumes snapshots; graphics frame loss must not lose recording or cause command bursts; heavy generation runs in workers.

## App shell

`apps/web/src/main.tsx` starts the app: optional long-task recorder, native runtime (`@naruzu/ios`), device restore, then lazily imports `App` inside `AccountGate`. Navigation is hash based (`router.tsx`, `navigation.ts`) with six destinations: Home, Ride, Garage, Progress, Devices, Settings. Pages are lazy chunks registered in `lazyPages.ts` through `retryableLazy`, so a failed chunk load can be retried (ESLint forbids importing React's `lazy` directly). A shell error boundary keeps local data safe and offers a reload.

## Ride flow and state machine

The ride lifecycle is a pure table in `apps/web/src/rideMachine.ts`:

```text
idle --launch--> launching --world-ready--> ready
                   |  ^                       |
                   |  '------ retry ----------'
                   |                          | start
     world-failed  v                          v
          launch-failed --start--> running <-> paused
                                      |
                                      v
                          finished | discarded
```

Cancel returns a launch to idle. `reopen` (a save failed) and `recover` (an unfinished ride) both lead to paused.

A world that cannot load never blocks riding: `launch-failed` can still `start`. Commands that do not apply are rejected with a typed reason (`RideRejection`), never silently dropped.

The session (`rideSession.ts` and `rideSession*.ts`) runs the effects. `rideCommandQueue.ts` runs ride commands one at a time with an `AbortSignal`; a superseding command (pause, finish, cancel) aborts the running one, which stops at its next await. ESLint type-aware promise rules are on for the ride code. The session ticks at 100 ms (`rideSessionPersist.ts`), through a worker-based clock in browser builds so a hidden tab is not throttled (`rideClock.worker.ts`).

## Launch pipeline and Corridor

1. Setup (`RideSetup.tsx`) prefetches terrain and map data without a canvas (`worldPrefetch.ts`).
2. Launch (`useLaunchWorld.ts`, `worldStages.ts`): stages `terrain`, `graphics`, `world`; each writes a `naruzu:launch:<phase>` performance mark (`launchMarks.ts`). The renderer opens WebGPU first and falls back to WebGL2 (`openRenderer`).
3. `Corridor.tsx` builds the `WorldScene`, runs `compileConcurrently` (several `compileAsync` calls so shader programs link in parallel) and a warm-up render (`world.beginWarmup`/`endWarmup`, `sceneWarmup.ts`) so pipelines compile before the ride starts.
4. The launch card shows Start ride only when the world is ready (`ride-start-screen` change).

Ride browse, detail, setup and history screens never create a canvas (`openspec/specs/ride-launch`).

## Rendering

- three.js 0.186 `WebGPURenderer` with node (TSL) materials. Initialisation failure falls back to WebGL2; Settings can force WebGL2. After one fallback, later renderers skip the slow WebGPU probe (`rendererSetup.ts`).
- Post-processing (outline, bloom, grade, FXAA) in `packages/world/src/post.ts`, planned per preset (`postPlan`).
- Quality presets low, balanced, high: `qualityProfiles` and `qualityKnobs` (`qualityBudget.ts`). New installs use Auto: `classifyDevice` picks a starting preset, and the runtime `QualityGovernor` steps through live, reversible knobs (shadow refresh, LOD, ambient layers, scatter density) that never rebuild the world. Render scale is fixed unless the rider enables adaptive resolution.
- A lost GPU device or WebGL context is normal (backgrounding, driver reset). The app rebuilds the renderer and canvas with back-off (1 s, 5 s, 30 s, three attempts in ten minutes, then a manual button), without touching the ride, recording or trainer (`worldRecovery.ts`).

## World generation and streaming

`WorldScene` (`packages/world/src/scene.ts`) keeps the renderer on the main thread. A generation worker (`gen/gen.worker.ts`, protocol in `gen/protocol.ts`, client `gen/genClient.ts`) owns serializable terrain and map inputs and returns transferable typed arrays for far tiles, panorama refreshes and look-ahead near and road strips. `ChunkStrips` waits cooperatively ahead of the rider; if a late job's chunk enters the mandatory ring, it is cancelled and computed locally. Any malformed result or worker failure falls back to the same generators on the main thread. `ChunkRing` chooses which chunks are wanted. For long routes, mapped windows are fed and replaced as the rider moves (`worldStreaming.ts`, `worldWindowData.ts`). `?worldWorkers=off` keeps everything on the main thread for debugging. A build gate limits the generation worker bundle size and forbids a renderer inside it (`tools/check-worker-size.mjs`).

## Workers

Bundled module workers (the CSP allows `worker-src 'self'` only): route parsing, terrain download, scenery windows, exploration preview, route planning, section merge, ride clock, effort and training curve and load, ride pack handling, race data decoding, and the world generation worker. Pattern: a message in, a result or `{ error }` out, with heavy pure logic living in a package so it is also testable without a browser.

## Devices, BLE and ERG

`@naruzu/devices` decodes FTMS, power, cadence and heart-rate packets (little-endian, never reading unflagged optional fields) and runs control through a serialized, acknowledged queue (`BleControl`). Pairing reads telemetry only; control is requested on an explicit rider action. Repeated rejections make a control mode unavailable (`rejectionLimit`), repeated write failures lose control (`ControlLost`). In ERG rides the session runs an `ErgGuard` (from `@naruzu/workouts`) for power and control loss; on simulation rides a short power gap coasts and a long one pauses with automatic resume. Vendor adapters and the ANT+ FE-C path are boundaries listed in a registry with an honest status; at the time of writing the vendor entries are `unimplemented`. In the desktop app, Bluetooth lives in a separate device-host renderer so it survives ride rendering and reloads (`desktopDevices.cjs`, `deviceHostPreload.cjs`). In the browser, Web Bluetooth is used directly; on iOS the Capacitor Bluetooth plugin supplies the same port.

## Recording and FIT

`RideEngine` advances physics in 20 ms fixed steps with bounded catch-up (a short foreground stall is caught up in quarter-second steps; a gap over the limit pauses the ride and records an interruption). One sample per second is journaled by `RideJournal` to IndexedDB. An unfinished ride can be recovered after a crash. Export writes FIT through the Garmin FIT SDK and drops implausible readings. A finish whose save fails reopens the ride paused.

## Account server and sync

`apps/server` is a separate Node process (SQLite, argon2id passwords, rotating refresh tokens, TOTP). The web app talks to it through `@naruzu/accounts`; the origin is the one extra origin allowed by the CSP. Rides, friends, groups, chat and challenges are opt-in and private by default. Details of the security rules live in `docs/ACCOUNTS.md`.

## Offline and service worker

`tools/create-offline.mjs` generates `sw.js` after the Vite build. The shell (page, scripts, styles) installs all-or-nothing; models and maps cache individually so one failed file does not block offline use. The cache name follows the content hash of every precached file. The generator throws if any private-model path would be cached. The page reports install progress and gaps (`offlineStatus.ts`). Startup and precache size are budgeted (see [performance](/naruzu-web/docs/dev/performance/)).

## Desktop shell

`apps/desktop/main.cjs` registers per-domain IPC modules that share one sender check (`ipcAuthorize.cjs`). The preload exposes a frozen `naruzuDesktop` object. A regression test requires the preload and main to agree on every channel. Hardening includes Electron fuses (`tools/electron-fuses.mjs`), file-request confinement, navigation and permission guards, and crash recovery that reloads onto Ride start so the journal can offer the interrupted ride. Every network listener is inventoried and tested (`docs/LOCAL-SERVERS.md`, `listenerInventory.test.ts`).

## Sources

`docs/ARCHITECTURE.md`, `docs/WORLD-BUDGET.md`, `docs/WORLD-DESIGN.md`, `docs/LOCAL-SERVERS.md`, `docs/ACCOUNTS.md`, `docs/HARDWARE.md`, `docs/COMPATIBILITY.md`, `apps/web/src/main.tsx`, `rideMachine.ts`, `rideCommandQueue.ts`, `rideSessionTick.ts`, `rideSessionPersist.ts`, `worldStages.ts`, `worldRenderer.ts`, `rendererSetup.ts`, `worldRecovery.ts`, `qualityGovernor.ts`, `packages/world/src/gen/*`, `packages/world/src/qualityBudget.ts`, `packages/recording/src/rideEngine.ts`, `packages/simulation/src/index.ts`, `packages/devices/src/*`, `tools/create-offline.mjs`, `apps/desktop/*.cjs`, `openspec/specs/ride-launch/spec.md`.
