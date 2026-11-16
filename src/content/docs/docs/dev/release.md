---
title: Release process
description: Beta versioning, packaging, checksums and the smoke-launch check.
sidebar:
  order: 12
---

All release steps run locally. There is no signing, no publication and no deploy script; if a deploy is ever added it must call `check:distributable`.

## Versioning

Versions follow `0.x.y-beta.N`. The root `package.json` is the source of truth; `apps/desktop`, `apps/web`, `apps/server` and `apps/ios` must match. `CHANGELOG.md` has one entry per version, written as what a tester sees; known rough edges go in `docs/KNOWN-ISSUES.md`.

```bash
pnpm release:info                    # check version scheme and changelog
node tools/beta-release-info.mjs --notes   # print release notes
pnpm release:info --sums <folder>    # write SHA256SUMS.txt from <folder>/release-manifest.json
```

## Steps for a beta

1. Run the [local gate](/naruzu-web/docs/dev/testing/): typecheck, lint, test, build, `pnpm release:beta`, `pnpm gate:beta`.
2. Bump versions and the changelog; `pnpm release:info` must pass.
3. Package with the beta profile: `pnpm package:windows:beta` (Windows host) and `pnpm package:linux:beta` (Linux host). Linux packaging needs `bsdtar` for the bundled router archive. Output goes to `release/<platform>/` with `release-manifest.json`.
4. Verify the package: `node tools/verify-package.mjs release/windows` (Linux: `release/linux --platform=linux`). It reads Electron fuses from the built executable, checks every artefact size and SHA-256 against the manifest, and confirms no private models and the legal bundle are present.
5. Smoke launch: `pnpm smoke:launch` launches the packaged app with an isolated profile, rides the demo route on the simulator for 60 seconds, saves, exports and checks the FIT file, and expects a clean quit. `--strict-console` also fails on renderer console errors. `node tools/smoke-installed.mjs` checks an installed copy.
6. Write checksums with `pnpm release:info --sums release/windows` and attach release notes. Builds are unsigned, so checksums prove a file matches the list, not who made it, and the notes say so.
7. Third-party notices ship with the installer (`pnpm release:notices`); `pnpm check:legal-bundle` confirms licence, EULA and notices are present. The EULA is a draft awaiting owner and lawyer review.

## What is not verified

Verification evidence in `docs/RELEASE-VERIFICATION.md` shows what was run per release. Items such as the NSIS installer run, signing and the Linux desktop run were recorded as not run. iPhone installation is unverified.

## Sources

`package.json`, `CHANGELOG.md`, `tools/beta-release-info.mjs`, `tools/release-beta.mjs`, `tools/package-desktop.mjs`, `tools/verify-package.mjs`, `tools/smoke-launch.mjs`, `tools/smoke-installed.mjs`, `tools/create-notices.mjs`, `docs/DISTRIBUTION-CHECKLIST.md`, `docs/RELEASE-VERIFICATION.md`, `docs/INSTALLATION-LINUX.md`, `docs/KNOWN-ISSUES.md`.
