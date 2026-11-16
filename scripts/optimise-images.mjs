// Copies the beta-safe artwork the website uses from the app into
// website/src/assets/scenery/ (resized, re-encoded WebP sources) and writes
// the social preview image public/og.jpg and the PNG/ICO icons.
// Astro then serves responsive AVIF and WebP variants at build time
// (components/Scenery.astro). Sources and licences: website/ASSETS.md.
//
//   pnpm --filter @naruzu/website images
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const site = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const menu = resolve(site, "../apps/web/src/assets/menu");
const out = resolve(site, "src/assets/scenery");
const pub = resolve(site, "public");

/** name in website -> source file in apps/web/src/assets/menu */
export const SCENERY = {
  "lake-road": "lake-road-sunset-v1.webp",
  "start-scene": "naruzu-loading-1920.webp",
  "forest-road": "forest-road-v1.webp",
  "coastal-road": "coastal-road-v1.webp",
  "alpine-route-data": "alpine-route-data-v1.webp",
  "fjord-data": "fjord-data-v1.webp",
};

await mkdir(out, { recursive: true });
for (const [name, file] of Object.entries(SCENERY)) {
  const input = resolve(menu, file);
  const target = resolve(out, `${name}.webp`);
  const info = await sharp(input)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(target);
  console.log(`${name}.webp ${info.width}x${info.height} ${info.size} B`);
}

// Social preview: the app's start scene (wordmark over a lake road), 1200 x 630.
const og = await sharp(resolve(menu, "naruzu-loading-1920.webp"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 78, mozjpeg: true })
  .toFile(resolve(pub, "og.jpg"));
console.log(`og.jpg ${og.size} B`);

// Icons from the brand mark (apps/web/public/icon.svg).
const mark = await readFile(resolve(site, "../apps/web/public/icon.svg"));
await writeFile(resolve(pub, "favicon.svg"), mark);
await sharp(mark, { density: 300 })
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile(resolve(pub, "apple-touch-icon.png"));
const png32 = await sharp(mark, { density: 96 })
  .resize(32, 32)
  .png({ compressionLevel: 9 })
  .toBuffer();
await writeFile(resolve(pub, "favicon.ico"), icoFromPng(png32, 32));
console.log("favicon.svg, favicon.ico, apple-touch-icon.png");

/** A single-image ICO container around a PNG (supported by every current browser). */
function icoFromPng(png, size) {
  const header = Buffer.alloc(6 + 16);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // icon
  header.writeUInt16LE(1, 4); // one image
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt8(0, 8); // palette
  header.writeUInt8(0, 9);
  header.writeUInt16LE(1, 10); // planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18); // offset
  return Buffer.concat([header, png]);
}
