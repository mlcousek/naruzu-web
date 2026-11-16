// The two documentation sidebars. Each topic lists the pages of its folder
// automatically (alphabetical by file name unless a page sets `sidebar.order`
// in its frontmatter), so adding a Markdown file is enough to show it.
//
//   User guide       src/content/docs/docs/user/**  ->  /docs/user/...
//   Developer docs   src/content/docs/docs/dev/**   ->  /docs/dev/...
//
// Use `items` with explicit `{ label, slug }` entries or groups if a topic ever
// needs a hand-ordered sidebar (https://starlight.astro.build/guides/sidebar/).

/** @type {import("starlight-sidebar-topics").StarlightSidebarTopicsUserConfig} */
export const sidebarTopics = [
  {
    id: "user",
    label: "User guide",
    link: "/docs/user/",
    icon: "open-book",
    items: [{ autogenerate: { directory: "docs/user" } }],
  },
  {
    id: "dev",
    label: "Developer docs",
    link: "/docs/dev/",
    icon: "seti:config",
    items: [{ autogenerate: { directory: "docs/dev" } }],
  },
];
