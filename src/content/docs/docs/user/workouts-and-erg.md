---
title: Workouts and ERG mode
description: Ride a structured workout, build or import your own, and let your trainer hold the target watts.
sidebar:
  order: 7
---

Open **Ride**, then **Workouts**. The page is called the Workout studio: "Choose a session or build your own. Your workouts stay on this device."

![The Workouts tab with Import workout and Create workout buttons, search, and filters.](./img/workouts.webp)

## Find a workout

- Search by name, and sort by **Name**, **Duration** or **Recently updated**.
- Filter chips: **Built in**, **Mine**, **Imported files**, **Intervals.icu**, **Favorites**, and length (**Under 45 min**, **45 to 90 min**, **Over 90 min**).
- At the time of writing the beta listed 12 workouts, including the built-in FTP Ramp Test.

Open a workout to see its **power profile**, expressed as a percentage of your FTP. Targets in watts are worked out from the FTP you have when you start the ride.

## Ride a workout

Open the workout and choose to ride it, or choose it in the **Workout** row of [Setup](/naruzu-web/docs/user/setup-and-launch/). During the ride a workout card shows the current step, the target in watts, the time left, and "Based on FTP". The **Details** drawer (key **D**) has an **Intensity** control and **Skip workout step**.

## ERG mode

ERG lets your smart trainer set the resistance to match the workout target, so you only have to keep pedalling. The trainer holds your target watts whatever your cadence.

- For ERG the trainer must advertise it, you must **request trainer control** in Devices, and your power must be fresh.
- In Setup, tick **Use trainer ERG control for this workout** for a Bluetooth ride. Untick it to ride to the targets yourself.
- If control is lost, NARUZU asks the trainer again and tells you. You can untick ERG to ride the workout on your own power.
- There is a gentle start: when you begin or resume, the load builds over a few seconds once you are moving. If your cadence drops very low the load eases, and after a short while the ride pauses and resumes by itself when you pedal again.

ERG on a real trainer is **not yet verified** with this build. Test it with a light target first, using **Test trainer control** on [Devices](/naruzu-web/docs/user/pairing-devices/).

## Build and import workouts

- **Create workout** opens the editor: add blocks, set start and end targets (as a percentage of FTP), and use warm-up, cool-down and repeat blocks. Save, **Save as copy**, or **Save and ride**.
- **Import workout** accepts `.zwo` and `.json` files. You review the import before it is added.
- **Export workout** saves a NARUZU file or a ZWO file.
- Unsaved edits are kept as a recovery draft so a crash does not lose them.

Deleting a workout does not change your recorded rides: they keep their own copy.

_Last verified against version 0.1.0-beta.1._
