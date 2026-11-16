---
title: Offline use and offline maps
description: What works without internet, how to prepare the web app, and offline regional maps on desktop.
sidebar:
  order: 14
---

## What works offline

The desktop package ships its assets. It needs no network for simulation, local GPX rides, workouts, the globe, locally generated sound, recording or FIT export. Free riding needs no account service, map key or music service.

What needs internet:

- Searching for **new Quick Ride routes** (public map services).
- Downloading real terrain and scenery for a route the first time.
- Account changes, and uploads to Strava or Intervals.icu.

Prepared scenery and terrain, and saved routes, work offline.

## Web app

Open the production app online once and wait for its offline shell to cache before disconnecting. **Settings, Advanced, Offline use** says "Ready to ride offline" when it is ready, shows progress on a first install and offers **Try again** for files that could not be saved. A route's artwork is saved the first time you see it, so offline a route you never opened shows a bundled scene instead. Pages that were never cached cannot load offline.

## Offline maps (desktop app)

**Settings, Data and accounts, Offline maps** lets you download a region once so Quick Ride and real-world scenery work without the map services. Maps stay on your computer, and preparing a map needs more disk space than the download itself. Buttons: **Download routing and scenery**, **Update scenery map**, **Remove offline maps**. The panel only appears where the feature is supported.

Large regions are slow and big. Measured on one very large regional extract, indexing took minutes and the finished map took hundreds of megabytes. A whole-country download of the largest region was **never indexed end to end**, so its disk and time figures are estimates. Very dense areas can exceed query limits and report "too much detail" even offline.

**Not yet verified:** offline maps and built-in route search in an installed copy, and offline use of the installed app (the project's known-issues list says so).

_Last verified against version 0.1.0-beta.1._
