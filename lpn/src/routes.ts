import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Page from "./components/Page.vue";
import sitemap from "./sitemap.json";
import { type Route } from "./types"

function getRoutes(root: Route[], path?: string): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  const basePath = path ? path + "/" : "/";
  root.forEach((route) => {
    if (route.children) {
      const innerRoutes = getRoutes(route.children, basePath + route.path);
      routes.push(...innerRoutes);
    } else
      routes.push({
        path: basePath + route.path,
        component: Page,
      });
  });
  return routes;
}
export const router = createRouter({
  history: createWebHistory(),
  routes: getRoutes(sitemap.$r),
});
