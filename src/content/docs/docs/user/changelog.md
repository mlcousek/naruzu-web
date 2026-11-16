---
title: Changelog
description: What changed in each NARUZU beta version.
sidebar:
  order: 20
---

## Next beta (not released yet)

- Beta entry: the first screen has one **RIDE** button instead of sign-in. No account server is contacted; rides and settings stay on your device. The full account flow stays in the private build.
- Race and event names are generic in every build (for example "France Grand Tour"); GPX tracks and scenic rides are all kept.
- The Simulator seed moved from Settings, Advanced into ride Setup, next to Virtual trainer.
- Ride Setup: Repeat last ride checks that the road and workout still exist, Cancel while preparing scenery asks first, a trainer with control switched off shows a warning with a one-click fix, and the Load ride bar stays visible on a phone.
- Devices: power and cadence are restored the same way on web and desktop; a trainer no longer takes over a remembered power meter.
- Fixed: Garage controls no longer clip on short windows; Home and menu artwork fades out behind the first card; phone HUD editor, 360 px HUD timer and Czech bottom-nav labels; Czech Settings, Data and accounts at 390 px; sign-in screens fill a 1920 window.
- Text is at least 12 px everywhere and phone buttons are at least 44 px.
- World: ground no longer pokes through tunnel portals or bridge decks on open spans.
- Fixed: the WebGL2 fallback no longer fails on `_precompilationState`, so frame measurements run on that path; the hidden HUD warm-up layer no longer shows on the launch screen.
- The web target resolution is 1920x1080 (tests and screenshots).

## 0.1.0-beta.1

First beta. Unsigned.

- Free ride, Quick Ride and GPX rides on generated and mapped scenery, with a bundled router for route search.
- Recording with FIT export, local data, backup and restore.
- Bluetooth trainer and heart-rate support with the in-ride HUD (real-device behaviour not yet verified).
- Offline maps (Settings, Data) and offline use of the packaged app (unverified in an installed copy).
- Windows installer and portable ZIP; Linux packages.
- Career mode is off. Race stage routes are included under generic names (no real race or organiser names), and real team, rider and sponsor names are not included.
- Optional once-a-day check for a newer version (off until you turn it on).

The full list of rough edges is in [Performance tips and known issues](/naruzu-web/docs/user/performance-and-known-issues/).

_Last verified against version 0.1.0-beta.1._
