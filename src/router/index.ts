import {
    createRouter,
    createMemoryHistory,
    createWebHistory,
    type RouteRecordRaw
} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("../pages/home.vue"),
    },
    {
        path: "/blog",
        component: () => import("../pages/blog.vue"),
    },
];

export function createMyRouter() {
    return createRouter({
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes,
    });
}
