// 导出环境无关的（通用的）应用代码

import { createSSRApp } from "vue";
import { createMyRouter } from '@/router/index'
import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia'
import App from "@/App.vue";
import "@/assets/base.css";

// 每次请求，SSR 都会请求一个新的 app 实例，因此必须导出一个函数
export function createApp() {
    const app = createSSRApp(App);
    const router = createMyRouter();
    const pinia = createPinia();
    const head = createHead()
    app.use(head)
    app.use(router);
    app.use(pinia)
    return { app, router, pinia }
}
