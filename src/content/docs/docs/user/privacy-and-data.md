---
title: Privacy and your data
description: What NARUZU stores on your device, what leaves it, and what an account server sees.
sidebar:
  order: 19
---

## In short

Your rides are stored on your own device. Only map, route and elevation requests, and any service you connect yourself, leave it.

## What is stored where

| Data                                                | Where                                                              |
| --------------------------------------------------- | ------------------------------------------------------------------ |
| Profile, rides, routes, workouts, rewards, settings | On your device (browser storage or the desktop data folder)        |
| Offline app files and maps                          | On your device                                                     |
| Provider tokens (Strava, Intervals)                 | On Windows, protected by your Windows login; excluded from backups |
| Account, synced rides and settings                  | On the account server, only if you sign in and sync                |
| Diagnostics file                                    | Created only when you export it; never uploaded automatically      |

## What leaves your device

- Map, place-search, route-search and elevation requests to public services, which see your computer's IP address. Quick Ride searches send your chosen place and ranges.
- Sign-in and account calls to the account server.
- Uploads only when you press Send.
- An optional once-a-day update check, off by default, which sends no personal data.

## Account server privacy defaults

A new account is private: not discoverable by handle, rides private, raw ride data not shared. Email, weight, FTP, country and bio are never visible to others. Per ride you choose only you, friends or everyone; others see a summary only. Group chat is **not end-to-end encrypted**: whoever runs the server can read it.

Retention: account until you delete it; sign-in sessions 60 days; security log 12 months; friend requests and invitations 30 days; group chat 30 days by default; reports 12 months.

You can **Export account data** and **Delete account** under Settings, Rider. Deleting removes your account, sessions, picture, synced data, friendships and messages; rides saved on your device stay.

**Not yet verified:** who operates the server for the public beta; the privacy page shows that contact as not filled in yet.

_Last verified against version 0.1.0-beta.1._
