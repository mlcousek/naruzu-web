---
title: Data, assets and licensing
description: The asset ledger, map data and ODbL attribution, race data format and the distribution checks.
sidebar:
  order: 6
---

This is engineering guidance, not legal advice.

## Rules

- Project visuals are original and mostly procedural: code-built riders, scenery and sky, Blender-authored modular equipment. No copyrighted game assets and no paid pack assumption.
- Every non-code asset under `packages/world/src/assets/`, `apps/web/src/assets/`, `apps/web/public/` and the iOS asset catalogue must match a row of the machine-readable table in `docs/ASSET-LEDGER.md`. Add or widen a row in the same pull request that adds the asset. `pnpm check:assets` enforces it.
- Third-party models for the owner's machine are git-ignored and never tracked, committed or packaged. The mechanism is described under [build profiles](/naruzu-web/docs/dev/build-profiles/).
- Generated art (made with an image tool) is recorded with its provenance and marked terms-unconfirmed where that is true.
- Landmark models carry a separate rights screening in `docs/LANDMARK-RIGHTS-LEDGER.md`, rebuilt by `pnpm check:landmark-rights` (fails if stale).
- Real brand, team, rider and sponsor names stay out of the public beta; a scan test covers tracked sources, file names and image metadata.

## Data sources and attribution

| Data                                           | Source                                                                     | Licence note                                                                                |
| ---------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Famous-climb roads, scenic rides, map features | OpenStreetMap contributors (routed with BRouter, Overpass), SRTM elevation | ODbL 1.0; attribution is shown in the app (ride panel and offline maps) and bundled notices |
| Terrain grids                                  | AWS Terrain Tiles (Terrarium)                                              | Per its attribution; bundled notices                                                        |
| One Czech climb's terrain and colour           | Czech national height and orthophoto data                                  | CC BY 4.0; bundled notices                                                                  |

Fetch tools live in `tools/` (`fetch-osm.py`, `fetch-terrain.py`, `fetch-cuzk.py`, `fetch-famous-climbs.mjs`, `fetch-scenic-rides.mjs`). User-imported GPX stays the user's responsibility and is never shipped. `tools/create-notices.mjs` (`pnpm release:notices`) writes the third-party and data notices that ship with the app.

## Race data format

Race editions ship as a compact binary (`NRZR`: zigzag-varint deltas, CRC-32 closing the file), about 4.8 times smaller than the JS module form and faster to load. Files from a newer version are refused with a readable message; older ones are refetched; a damaged file throws rather than returning a partial route. `tools/encode-race-data.mjs` runs inside `pnpm build`. Race data is excluded from the public beta.

## Derived data checks

- `pnpm card-profiles` regenerates route-card elevation thumbnails; `pnpm card-profiles:check` fails if committed output is stale (also unit tested).
- `packages/progression/src/*.lock.json` lock shop and quest pool prices: an item may be added but never removed or repriced.
- `pnpm assets:weight` and `pnpm assets:check` audit asset size and GPU texture memory against `tools/asset-budget.json`.

## Repository hygiene gates

| Command                                          | Catches                                                                                            |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `pnpm check:secrets` / `pnpm check:secrets:tree` | Credential patterns in added lines or the whole tree; reports file, line and rule, never the value |
| `pnpm check:personal-data`                       | Home paths, personal emails, private roster and skin files in tracked text                         |
| `pnpm check:licences`                            | Production dependency licences against an allowlist                                                |
| `pnpm check:legal-bundle`                        | Licence, EULA and notices present in the packaged app                                              |
| `pnpm check:repo`                                | Assets, personal data, tree secrets and licences in one go                                         |
| `pnpm size:check`                                | Oversized tracked files and tracked evidence growth                                                |

Run output goes to the ignored `artifacts/run/`; curated evidence is promoted deliberately with `node tools/evidence.mjs promote`.

## Sources

`docs/ASSET-LEDGER.md`, `docs/SECURITY-AND-LICENCES.md`, `docs/DISTRIBUTION-CHECKLIST.md`, `docs/RACE-DATA-FORMAT.md`, `docs/EVIDENCE-ARCHIVE.md`, `docs/LANDMARK-RIGHTS-LEDGER.md`, `package.json`, `tools/check-assets-ledger.mjs`, `tools/check-secrets.mjs`, `tools/check-personal-data.mjs`, `tools/check-licences.mjs`.
