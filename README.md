# NARUZU website

Public website for [NARUZU](https://mlcousek.github.io/naruzu-web/), an indoor cycling app: ride real roads on a smart trainer, follow structured workouts and build a rider career. This repository holds the website and its public documentation only (Home, About the app, The game, User guide, Developer docs). The app itself is developed elsewhere and is not part of this repository.

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

The site is built for `https://mlcousek.github.io/naruzu-web/` (base `/naruzu-web/`). Override at build time:

| Variable    | Default                      | Use                                                   |
| ----------- | ---------------------------- | ----------------------------------------------------- |
| `SITE_BASE` | `/naruzu-web/`               | Path the site is served under. `/` for a root domain. |
| `SITE_URL`  | `https://mlcousek.github.io` | Origin for canonical URLs, OpenGraph and the sitemap. |

GitHub Pages is not enabled and no deploy workflow is included yet. Never hard-code the base path: use `url()` from `src/lib/url.ts` in `.astro` files.

## Assets and licence

See [ASSETS.md](ASSETS.md) for every image's source. Site code is MIT; text and artwork are all rights reserved (see [LICENSE](LICENSE)). Map data credits are on the About page (OpenStreetMap contributors, ODbL).
