// The NARUZU website: custom marketing pages (src/pages) and Starlight docs
// (src/content/docs/docs/{user,dev}) with one sidebar per audience.
// Static output in dist/; the base path comes from SITE_BASE (README.md).
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightSidebarTopics from "starlight-sidebar-topics";
import { sidebarTopics } from "./src/config/sidebar.mjs";

/** "/naruzu-web/" by default (GitHub project site); always with leading and trailing slash. */
const normaliseBase = (value) => {
  const trimmed = String(value ?? "").replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}/` : "/";
};
const base = normaliseBase(process.env.SITE_BASE ?? "/naruzu-web/");
const site = process.env.SITE_URL ?? "https://mlcousek.github.io";

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  build: { format: "directory" },
  // No third-party scripts, fonts or telemetry: everything is served from dist/.
  devToolbar: { enabled: false },
  prefetch: false,
  integrations: [
    starlight({
      title: "NARUZU",
      description:
        "NARUZU is an indoor cycling app: ride real roads on your smart trainer, train with structured workouts and build a rider career.",
      logo: { src: "./src/assets/brand/mark.svg", alt: "" },
      favicon: "/favicon.svg",
      // The site's own 404 page (src/pages/404.astro) uses the marketing layout.
      disable404Route: true,
      lastUpdated: false,
      pagefind: true,
      credits: false,
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      customCss: ["./src/styles/starlight.css"],
      routeMiddleware: "./src/routeMiddleware.ts",
      head: [
        { tag: "meta", attrs: { name: "theme-color", content: "#031d25" } },
      ],
      components: {
        Header: "./src/components/starlight/Header.astro",
        ThemeProvider: "./src/components/starlight/ThemeProvider.astro",
        ThemeSelect: "./src/components/starlight/ThemeSelect.astro",
        MobileMenuFooter: "./src/components/starlight/MobileMenuFooter.astro",
        Footer: "./src/components/starlight/Footer.astro",
      },
      plugins: [
        starlightSidebarTopics(sidebarTopics, {
          // Marketing pages are plain Astro pages; nothing else is topic-less.
          exclude: [],
        }),
      ],
    }),
  ],
});
