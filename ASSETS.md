# Website assets

Every image the website ships, where it came from and under what terms. Only
art the public beta app already ships is used: no private-profile models, no
real race, team or brand names or logos, no photos of people. Add a row here
for every new file under `public/` or `src/assets/`.

Scenery sources are re-encoded by `scripts/optimise-images.mjs` (WebP, at most
1920 px wide). At build time Astro serves each one as responsive AVIF and WebP
at 480 to 1920 px (`src/components/Scenery.astro`).

| File                                                | Source                                                                                                                          | Licence                                                           |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `src/assets/scenery/lake-road.webp`                 | the NARUZU app artwork, generated interpretive artwork | Original project policy (project asset ledger, kept in the app repository) |
| `src/assets/scenery/start-scene.webp`               | the NARUZU app artwork, the app's start screen artwork                                             | Original project policy                                           |
| `src/assets/scenery/forest-road.webp`               | the NARUZU app artwork                                                                                  | Original project policy                                           |
| `src/assets/scenery/coastal-road.webp`              | the NARUZU app artwork                                                                                 | Original project policy                                           |
| `src/assets/scenery/alpine-route-data.webp`         | the NARUZU app artwork                        | Original project policy                                           |
| `src/assets/scenery/fjord-data.webp`                | the NARUZU app artwork                               | Original project policy                                           |
| `src/assets/brand/mark.svg`                         | Copy of the NARUZU app artwork (the NARUZU mark)                                                                            | Same as the app icon (ledger: owner to confirm)                   |
| `public/favicon.svg`                                | Copy of the NARUZU app artwork                                                                                              | Same as the app icon                                              |
| `public/favicon.ico`, `public/apple-touch-icon.png` | Rendered from the NARUZU app artwork by `scripts/optimise-images.mjs`                                                       | Same as the app icon                                              |
| `public/og.jpg`                                     | 1200 x 630 crop of `naruzu-loading-1920.webp` by `scripts/optimise-images.mjs`                                                  | Original project policy                                           |

The scenery is generated artwork, not photographs, and can show imagined
details. The image-generation tool's terms for this use are still an open owner
decision (owner decision pending); the website uses
the art on the same terms as the app.

Inline SVG decoration (the elevation line, footer contours, icons in the theme
toggle and nav) is drawn in code in the components and is original.

No fonts are downloaded: the site uses the visitor's system faces.

## User guide screenshots

`src/content/docs/docs/user/img/*.webp` (29 files): screenshots of the NARUZU app captured from the public beta profile production build (NARUZU_PUBLIC_BETA=1, NARUZU_DISTRIBUTION=1) with the simulated virtual trainer and the generated demo loop, at 1280 px wide (files named `mobile-*` at 390 px). They show only beta-safe content: no career mode, no real brand names, no account data. Licence: original project content, same terms as the app.
