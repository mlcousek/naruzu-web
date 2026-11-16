# NARUZU website

Public website for NARUZU, an indoor cycling app: ride real roads on a smart trainer, follow structured workouts and build a rider career. This repository holds the website and its public documentation only (Home, About the app, The game, User guide). The app itself is developed in a private repository and is not part of this one.

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build) into a static folder (`dist/`). The built site loads no third-party scripts, fonts or trackers.

## Run, build, check

```sh
pnpm install
pnpm dev        # http://127.0.0.1:4321/naruzu-web/
pnpm build      # static site in dist/
pnpm preview
pnpm check      # astro check + build + link check
```

## Base path

Built for `https://mlcousek.github.io/naruzu-web/` (base `/naruzu-web/`). Override at build time with `SITE_BASE` and `SITE_URL`. GitHub Pages is not enabled and no deploy workflow is included yet. Never hard-code the base path: use `url()` from `src/lib/url.ts`.

## Licence

All rights reserved, see [LICENSE](LICENSE). Image sources are listed in [ASSETS.md](ASSETS.md).

This repository is generated from the private project; do not edit it by hand.
