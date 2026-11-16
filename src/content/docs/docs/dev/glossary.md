---
title: Glossary
description: Terms used across the NARUZU code, docs.
sidebar:
  order: 14
---

| Term                                | Meaning                                                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Beta profile / public beta          | Build selected by `NARUZU_PUBLIC_BETA=1`: no private models, no race data, career and official names off.                |
| Private profile                     | The owner's default build with all features; never shared.                                                               |
| Corridor                            | `Corridor.tsx`, the React component that owns the renderer and `WorldScene` during a ride.                               |
| Chunk                               | A slice of the world along the route, streamed and disposed around the rider (`ChunkRing`, `ChunkBuilder`).              |
| Strips                              | Near-terrain and road geometry rows computed ahead of the rider, in the generation worker when possible (`ChunkStrips`). |
| Launch                              | The phase between choosing a ride and Start ride: terrain, graphics, world build, shader compile, warm-up.               |
| Warm-up                             | A render before the ride starts that forces pipelines to compile so they do not stall mid-ride.                          |
| Preset                              | Quality level low, balanced or high; Auto chooses and adapts one.                                                        |
| Governor                            | `QualityGovernor`, the runtime ladder of reversible quality knobs in Auto mode.                                          |
| TSL                                 | three.js Shading Language, the node material system used with WebGPU and WebGL2.                                         |
| FTMS                                | Bluetooth Fitness Machine Service, the standard trainer protocol.                                                        |
| ERG                                 | Trainer mode holding a target power set by the workout.                                                                  |
| SIM                                 | Simulation mode: the trainer applies the route grade as resistance.                                                      |
| Journal                             | The ride journal in IndexedDB: samples and events, recoverable after a crash.                                            |
| FIT                                 | Garmin's activity file format, produced on export.                                                                       |
| Ledger                              | `docs/ASSET-LEDGER.md`: the record of every asset's source and licence.                                                  |
| Allowlist (module size / long task) | A list of known exceptions with a recorded cap that may only shrink.                                                     |
| Tier                                | Playwright grouping: smoke, full or gpu.                                                                                 |
| Golden                              | A recorded expected output of a deterministic computation.                                                               |
| Lockout                             | After a rejection, the author may not revise the rejected artefact.                                                      |
| Relay                               | The desktop sensor relay: a LAN listener that forwards sensor readings from another device.                              |
| BRouter                             | The offline routing engine bundled with the desktop app for Quick Ride.                                                  |
| Quick Ride                          | Generating a ride on real roads from a start and a target distance.                                                      |
| NRZR                                | The compact binary format of shipped race data.                                                                          |
| ODbL                                | Open Database Licence governing OpenStreetMap-derived data.                                                              |

## Sources

Terms were taken from the code and documents named on the other developer pages, mainly `docs/ARCHITECTURE.md`, `docs/WORLD-BUDGET.md`, `docs/TESTING.md`, `docs/DISTRIBUTION-CHECKLIST.md` and `docs/HARDWARE.md`.
