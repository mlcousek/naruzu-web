// Link check over the built site (website/dist). Every internal href, src,
// srcset and the og:image/canonical URLs must:
//   - start with the configured base path (SITE_BASE, default /naruzu-web/), and
//   - resolve to a file in dist/ (a page, its index.html, or an asset), and
//   - for "#fragment" links, point at an id that exists on the target page.
// External links are listed but not fetched (no network in the check).
//
//   node scripts/check-links.mjs            after `astro build`
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const trimmed = String(process.env.SITE_BASE ?? "/naruzu-web/").replace(
  /^\/+|\/+$/g,
  "",
);
const base = trimmed ? `/${trimmed}/` : "/";
const siteOrigin = process.env.SITE_URL ?? "https://mlcousek.github.io";

if (!existsSync(dist)) {
  console.error("website/dist does not exist: run `astro build` first.");
  process.exit(2);
}

/** @param {string} dir */
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const files = walk(dist);
const pages = files.filter((f) => f.endsWith(".html"));
const idsCache = new Map();

/** Ids (and legacy names) defined in a built page. */
function idsOf(file) {
  if (!idsCache.has(file)) {
    const html = readFileSync(file, "utf8");
    const ids = new Set(
      [...html.matchAll(/\s(?:id|name)=["']?([^"'\s>]+)/g)].map((m) => m[1]),
    );
    idsCache.set(file, ids);
  }
  return idsCache.get(file);
}

/** The file in dist/ that serves `pathname` (already stripped of the base), or null. */
function target(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, "");
  const candidates = [
    join(dist, clean),
    join(dist, clean, "index.html"),
    join(dist, `${clean.replace(/\/$/, "")}.html`),
  ];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile()) ?? null;
}

const ATTR =
  /\s(href|src|srcset|content|poster|action)=("([^"]*)"|'([^']*)'|([^\s>]+))/g;
const problems = [];
const external = new Set();
let checked = 0;

for (const page of pages) {
  const html = readFileSync(page, "utf8")
    // Inline scripts and styles hold code, not links.
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "");
  const where = relative(dist, page).split(sep).join("/");
  for (const match of html.matchAll(ATTR)) {
    const attr = match[1];
    const raw = (match[3] ?? match[4] ?? match[5] ?? "").trim();
    const values =
      attr === "srcset"
        ? raw.split(",").map((part) => part.trim().split(/\s+/)[0])
        : [raw];
    for (let value of values) {
      if (!value) continue;
      value = value.replace(/&amp;/g, "&");
      if (attr === "content") {
        // Only URL-valued meta content (og:image, og:url) is a link.
        if (!value.startsWith(siteOrigin)) continue;
        value = value.slice(siteOrigin.length) || "/";
      }
      if (/^(mailto:|tel:|data:|javascript:|blob:)/i.test(value)) continue;
      if (/^(https?:)?\/\//i.test(value)) {
        if (value.startsWith(siteOrigin))
          value = value.slice(siteOrigin.length) || "/";
        else {
          external.add(value);
          continue;
        }
      }
      checked += 1;
      const [pathPart, hash] = value.split("#");
      const path = pathPart.split("?")[0];
      let file = page;
      if (path) {
        if (!path.startsWith("/")) {
          problems.push(`${where}: relative link "${value}" (use url())`);
          continue;
        }
        if (!path.startsWith(base)) {
          problems.push(`${where}: "${value}" is missing the base ${base}`);
          continue;
        }
        file = target(path.slice(base.length - 1));
        if (!file) {
          problems.push(`${where}: "${value}" does not exist in dist/`);
          continue;
        }
      }
      if (hash && file.endsWith(".html") && !idsOf(file).has(hash))
        problems.push(`${where}: "${value}" has no element with id "${hash}"`);
    }
  }
}

console.log(
  `Checked ${checked} internal links in ${pages.length} pages (base ${base}); ${external.size} external links not fetched.`,
);
if (problems.length) {
  console.error(`${problems.length} broken link(s):`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log("Links OK.");
