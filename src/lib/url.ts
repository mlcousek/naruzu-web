/**
 * Every internal link and asset path goes through `url()` so the site works
 * under any base path (SITE_BASE, default "/naruzu-web/"). External URLs, anchors
 * and mailto/tel links are returned unchanged.
 *
 *   url("/docs/user/")   -> "/naruzu-web/docs/user/"
 *   url("og.jpg")        -> "/naruzu-web/og.jpg"
 */
const RAW_BASE = import.meta.env.BASE_URL || "/";
export const BASE = RAW_BASE.endsWith("/") ? RAW_BASE : `${RAW_BASE}/`;

const PASS_THROUGH = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i;

export function url(path = "/"): string {
  if (PASS_THROUGH.test(path)) return path;
  if (path.startsWith(BASE)) return path;
  return BASE + path.replace(/^\/+/, "");
}

/** The pathname without the base, always starting and ending with "/". */
export function stripBase(pathname: string): string {
  const rest = pathname.startsWith(BASE)
    ? pathname.slice(BASE.length)
    : pathname.replace(/^\/+/, "");
  const clean = `/${rest}`.replace(/\/+$/, "");
  return `${clean}/`.replace(/^\/\/$/, "/");
}

/** True when `href` (site-relative, without base) is the current page or, for sections, an ancestor. */
export function isCurrent(
  pathname: string,
  href: string,
  section = false,
): boolean {
  const here = stripBase(pathname);
  if (href === "/") return here === "/";
  return section ? here.startsWith(href) : here === href;
}
