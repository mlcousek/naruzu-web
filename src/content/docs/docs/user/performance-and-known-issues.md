---
title: Performance tips and known issues
description: Make rides smoother, understand launch time, and read the honest list of what is unverified in the beta.
sidebar:
  order: 15
---

## Performance tips

- Leave **Quality** on **Automatic**, or choose **Low** or **Balanced** on an older computer (Settings, Display and sound).
- Turn on **Adaptive resolution** if frame rate dips; it may change sharpness while you ride.
- Update your graphics driver. NARUZU draws the world with WebGPU or WebGL2; an old driver can fail or run slowly. Try the **WebGL 2** renderer if Automatic misbehaves.
- Close other heavy programs. Measured frame rates on a shared machine varied by about two times between identical runs.
- Use the **Geographic map** view or **Ride without scenery** if the 3D world will not load: metrics, workouts and recording keep working.
- Hide panels or switch to the Minimal HUD preset to keep the screen clear.
- Keep free disk space. A full device pauses the ride and keeps data in memory until you free space.

## Launch time

See [Set up and launch](/naruzu-web/docs/user/setup-and-launch/#how-long-does-loading-take-an-honest-answer): about 20 seconds for a short loop to over a minute for a heavy mountain route on one development laptop; other machines not measured.

## Known issues (beta 0.1.0-beta.1)

The project says an item leaves this list only when it has been checked on the real thing.

- **Trainer control is unverified on real hardware.** Resistance response, control timing and a specific trainer model have not been ridden with this build.
- **Heart-rate straps are unverified.** Tests pass; real devices have not been run.
- **Builds are unsigned.** Windows SmartScreen warns; Linux shows no publisher.
- **Career mode is off** by design. Race stage routes are available under generic names.
- **iPhone install is unverified.**
- **Not measured on a real range of GPUs.** Frame rate and smoothness limits come from one machine.
- **Long rides are not endurance tested.** Six-hour and two-hour real-time rides have not been run.
- **Scenery on very long routes** and in dense cities can be plain or slow to load; road data comes from a public service that can be overloaded.
- **Offline maps and built-in route search** are not yet confirmed in an installed copy.
- **The app does not update itself.** Install a newer beta over the old one; your data is kept, but back up first.
- **Linux packages** have not been run on a Linux desktop.

## Reporting a problem

Note the version (**Settings, Data and accounts, About this copy**), your operating system, your graphics card and driver, what you did and what you expected, and a screenshot. Attach the diagnostics file from **Settings, Advanced, Export diagnostics** after checking its contents.

_Last verified against version 0.1.0-beta.1._
