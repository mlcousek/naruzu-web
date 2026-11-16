---
title: Ramp test and FTP
description: What FTP is, why your first FTP is marked Estimated, and how to measure it with the guided ramp test.
sidebar:
  order: 8
---

## What FTP is

**FTP** (functional threshold power) is the most power, in watts, you could hold for about an hour. NARUZU uses it to set workout targets and power zones.

New profiles start with a default FTP of **250 W** and a default weight of 75 kg. Until you change them, Settings shows an **Estimated** badge next to your FTP with the text "Estimated FTP: a starting guess, not a measurement", and a link **Measure it with a ramp test**.

![Settings, Rider: FTP 250 W with an Estimated badge and a link to measure it with a ramp test.](./img/settings-rider.webp)

You can type your own FTP in **Settings, Rider** (and in the first-run wizard) if you already know it.

## The guided ramp test

The built-in **FTP Ramp Test** workout has:

1. A five-minute warm-up.
2. One-minute steps that rise every minute (each step is 8 percent of your starting FTP higher) until you cannot hold the target.
3. An easy five-minute cool-down.

Your FTP estimate is **75 percent of your best one-minute power** during the ramp.

### Before you start

Choose **Do the guided test** on the workout page (or the ramp test link next to your FTP). A check screen appears first:

- **Power source.** The result can only set your FTP if the power comes from a real trainer or power meter. With the virtual trainer the ride is a **practice**: the result is shown but cannot set your FTP.
- **Control.** With ERG, the trainer holds each step's target. With ERG off you ride to the on-screen targets yourself, and the result says so.
- **Start value for this test.** The steps rise from this value. If your FTP is still the default, choose a realistic start value.
- **Calibration** is suggested, not required: warm up for 10 minutes, then run a spin-down on Devices if your trainer supports it.
- **Safety.** This is a hard, all-out effort. Check with a health professional first if you have a heart condition, symptoms, a recent illness or injury, or doubts about exercising hard. Stop immediately if you feel chest pain, dizziness, faintness or unusual shortness of breath. You must tick "I have read this and will stop if I feel unwell." before the test can start.

### During the test

A panel shows the step, the target, the last minute's power and heart rate. **End test** (or the **E** key, pressed twice) ends it at any time; the load drops to an easy cool-down at once. If cadence stays too low, the test ends after a short countdown.

### The result

The result page shows **Estimated FTP**, a **confidence** grade (Good, Limited or Unusable), the best minute and steps completed, and your power zones now and from this estimate. Reasons for a lower grade include a skipped step, missing power for more than a fifth of the test, finishing before four steps, ERG off, pauses, or completing every step (your FTP may then be higher; retest with a higher start value).

- Nothing changes until you choose **Apply as my FTP**. Rides you already did keep their own FTP.
- A change of more than 25 percent asks for a second confirmation.
- If you set custom power zones you choose whether to keep them or use zones estimated from the new FTP. Heart-rate zones are not changed.
- **Undo** puts your previous FTP back.

This is a training estimate from your recorded power, not medical advice. The test has been checked with simulated rides and seeded data; **a real trainer ramp test is not yet verified** with this build.

## Power curve and fitness

Under **Progress** you will find **Fitness** and **Power curve** tabs built from your finished rides.

_Last verified against version 0.1.0-beta.1._
