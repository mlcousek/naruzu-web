---
title: Build profiles and feature flags
description: The public beta and private profiles, the environment flags, build-time feature constants and how the private-asset guard works.
sidebar:
  order: 5
---

One environment variable selects the variant. Without it a build is the owner's private profile.

## Flags

| Flag                            | Effect                                                                                                                                                                                                                                                     |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (none)                          | Default build. Private third-party models are never included, whether or not the local folder exists. Race data is included.                                                                                                                               |
| `NARUZU_PRIVATE_MODELS=1`       | Include the owner's private models. Local use only (`pnpm desktop:private`, `pnpm dev:private`).                                                                                                                                                           |
| `NARUZU_ALLOW_PRIVATE_MODELS=1` | With the flag above, lets Windows packaging produce a build named as not for distribution. Alone it does nothing.                                                                                                                                          |
| `NARUZU_NO_RACES=1`             | Leave race edition data out.                                                                                                                                                                                                                               |
| `NARUZU_DISTRIBUTION=1`         | Make `check:distributable` apply the race-data policy.                                                                                                                                                                                                     |
| `NARUZU_PUBLIC_BETA=1`          | The public beta profile. Implies no races, the distribution policy, career off, official names off, Garage shop off, training plans off, and no private models. It wins over `NARUZU_PRIVATE_MODELS=1` (the build succeeds and says the flag was ignored). |
| `NARUZU_PRIVATE_SKIN=1`         | Include an owner-supplied overlay skin in a build (local only; the guards refuse to package it).                                                                                                                                                           |

Use `pnpm build:beta`, `pnpm desktop:beta`, `pnpm package:windows:beta` and `pnpm package:linux:beta`; they set the profile for the whole run through `tools/run-beta.mjs`. A plain `pnpm package:windows` does not set it.

## Feature constants

`tools/private-models-plugin.mjs` (`resolveProfile`) feeds a virtual module, `virtual:naruzu-features`, with build-time constants:

| Feature                                                  | Private | Public beta        |
| -------------------------------------------------------- | ------- | ------------------ |
| `career` (stage races)                                   | on      | off                |
| `officialNames` (real event and brand labels)            | on      | off, generic names |
| `garageShop` (Garage shop and companions)                | on      | off                |
| `trainingPlans` (Plan tab, plan pages, home suggestions) | on      | off                |

Code imports them as `import { career } from "virtual:naruzu-features"`. They are constants, so the false branch is removed from the bundle and nothing can flip them in a tester's browser. Tests and `pnpm dev` use the private profile unless `NARUZU_PUBLIC_BETA=1` is set. A beta build writes `<meta name="naruzu-profile" content="public-beta">` into `index.html`, which later scans read. Every build prints one line saying what it contains. Saved data of a disabled feature (for example a career) is left untouched.

## How the private-asset guard works

The mechanism, without any private path:

1. **Opt-in inclusion.** A Vite plugin generates a virtual module listing private models as explicit imports. Nothing is emitted unless the flag is set, so a plain build contains none, even if files exist locally.
2. **Marker.** A build that includes private content writes a marker string into the bundle and the page.
3. **Scan of the output.** `pnpm check:distributable` inspects the built output (not the source): it fails on files byte-identical to a private model, on names on a denylist, on the private marker, on a model that is on neither the denylist nor the allowlist, on race data when the distribution policy is on, and, for a beta, on official event names or logo and skin files.
4. **Packaging and sync refuse.** Windows and Linux packaging, the iOS sync, `verify-package` and the offline service worker generator each re-check and refuse private content.
5. **Tests.** A unit test fails if private content is tracked or the ignore rule disappears; another fails if a bundled data folder has no ledger entry.

The scan prevents accidents. It is not legal clearance: it cannot see a renamed or edited model, and it says nothing about textures inside an allowlisted model, trademarks or brand names. The owner decisions behind these rules are recorded in `docs/DISTRIBUTION-CHECKLIST.md`.

## Public beta local scan

`pnpm release:beta` builds the beta and the beta with the private flag set (to prove it is ignored), copies each output under `release/beta-scan/`, scans both and verifies a packaged desktop build when one exists. It is local: no network, no CI minutes.

## Sources

`docs/DISTRIBUTION-CHECKLIST.md`, `tools/private-models-plugin.mjs`, `tools/check-distributable.mjs`, `tools/release-beta.mjs`, `tools/run-beta.mjs`, `tools/run-private.mjs`, `tools/create-offline.mjs`, `apps/web/vite.config.ts`, `openspec/changes/beta-feature-flags/`, `openspec/changes/asset-licensing-guard/`.
