---
title: Troubleshooting
description: Fix common problems with Bluetooth pairing, trainer control, black screens, slow loading and saving.
sidebar:
  order: 16
---

## Bluetooth

**"Bluetooth is unavailable here."** Use the Windows app, or Chrome or Edge on HTTPS or localhost. iPhone Safari cannot pair devices.

**"No device found yet."** Try these, then press **Rescan**:

1. Wake the device: pedal a few turns or press its button.
2. Close other cycling apps that may be connected to it.
3. Move closer to the device and try again.

**Pairing timed out or was cancelled.** Run Pair again. If reconnecting keeps failing ("Reconnect attempts exhausted"), pair the device again. Reconnect tries 1, 2 and 4 seconds apart, at most three times.

**Readings show "No fresh reading".** A reading older than three seconds shows as unavailable. Pedal, check the battery and wake the sensor.

**"Trainer control not permitted. Another app may hold it."** Close the other app. NARUZU asks again every 30 seconds.

**"Trainer control lost."** NARUZU requests it again by itself while the ride continues. If it does not return, ERG cannot resume: untick ERG to ride the workout yourself, or reconnect the trainer in Devices.

**The ride paused with "no power".** After 15 seconds with no power the ride pauses and resumes by itself when power returns. After a low-cadence pause, keep pedalling.

**Trainer feels stuck on a load.** Stop pedalling or disconnect it in Devices. Use **Stop test and disconnect** after a control test.

**Windows Firewall prompt.** It appears only when you start the phone sensor relay. Allow private networks only.

On Linux, check that `bluetoothd` is running and your user may use it.

## The app will not start, or the screen is black

Update your graphics driver, then try the **WebGL 2** renderer in Settings, Display and sound. Not every GPU is covered. If it still fails, send a report with exported diagnostics.

## The ride will not load

"Could not load" messages usually mean the map or elevation service is busy or unreachable. Try again, switch to the **Geographic map** view, use **Use simpler graphics**, or **Ride without scenery**. See [Set up and launch](/naruzu-web/docs/user/setup-and-launch/).

## Quick Ride finds nothing

"No real-road loop matched." Widen the distance and climbing ranges, try another place, or choose Mixed surfaces. If the map service is busy, wait and retry.

## GPX will not import

The file must be at most 10 MB and a valid GPX or FIT with one continuous section. An indoor FIT file without GPS cannot be a route.

## Saving problems

"Your ride could not be saved: export it now." Export the FIT or journal at once; the ride stays open and paused until saving works again. Free disk space in Settings, Data and accounts, Storage used.

## Sign-in

"The account server cannot be reached." Riding still works offline. Too many failed sign-ins lock you out for a few minutes.

## Windows blocks the installer

That is the expected unsigned-build warning. See [Install](/naruzu-web/docs/user/install/).

_Last verified against version 0.1.0-beta.1._
