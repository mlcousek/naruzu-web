import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

/**
 * Keeps "Previous" and "Next" inside one documentation sidebar: the last User
 * guide page must not link on to the Developer docs. (starlight-sidebar-topics
 * does this itself, but compares hrefs without the base path, so under
 * /naruzu-web/ it never matches.)
 */
const topicOf = (path: string) => path.match(/docs\/(user|dev)\b/)?.[1];

export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  const here = topicOf(route.id);
  if (!here) return;
  const { prev, next } = route.pagination;
  if (prev && topicOf(prev.href) !== here) route.pagination.prev = undefined;
  if (next && topicOf(next.href) !== here) route.pagination.next = undefined;
});
