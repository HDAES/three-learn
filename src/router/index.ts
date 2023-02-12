import { createWebHistory, RouteRecordRaw } from "vue-router";
import type { App } from "vue";

import { createRouter, createWebHashHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/views/index.vue"),
  },
  {
    path: "/3d-house",
    component: () => import("@/views/3d-house.vue"),
  },
  {
    path: "/ball-house",
    component: () => import("@/views/ball-house.vue"),
  },
  {
    path: "/small-Island",
    component: () => import("@/views/small-Island.vue"),
  },
  {
    path: "/crystal",
    component: () => import("@/views/crystal.vue"),
  },
  {
    path: "/porsche",
    component: () => import("@/views/porsche.vue"),
  },
  {
    path: "/robotics",
    component: () => import("@/views/robotics.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
