/** Site-wide names, copy and navigation. Paths are site-relative; render them with `url()`. */
export const SITE = {
  name: "NARUZU",
  tagline: "Indoor cycling on real roads",
  description:
    "NARUZU is an indoor cycling app: ride real roads on your smart trainer, follow structured workouts and track every ride, on your own computer and offline.",
  locale: "en",
  /** Social preview image in public/, 1200 x 630. */
  ogImage: "og.jpg",
  ogImageAlt:
    "The NARUZU wordmark over an illustrated mountain road at sunset beside a lake.",
} as const;

/** The beta the pages describe (root package.json "version"). */
export const BETA_VERSION = "0.1.0-beta.1";

export interface NavItem {
  label: string;
  href: string;
  /** Match child pages too (docs sections). */
  section?: boolean;
}

/** The primary navigation, in order. Used by Nav, Footer and the docs header. */
export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "The game", href: "/game/" },
  { label: "User guide", href: "/docs/user/", section: true },
  { label: "Developer docs", href: "/docs/dev/", section: true },
];
