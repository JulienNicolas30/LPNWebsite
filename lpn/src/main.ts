import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./routes";
import Vue3Marquee from "vue3-marquee";

createApp(App).use(router).use(Vue3Marquee).mount("#app");
