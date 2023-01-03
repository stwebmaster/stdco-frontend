import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import { pageTitle } from "vue-page-title";

import Vue3Lottie from "vue3-lottie";
import "vue3-lottie/dist/style.css";

// @ts-ignore
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common = {
  Accept: "application/json",
};

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3Lottie);
app.use(pageTitle({ router, suffix: "- stdco", mixin: true }));
app.use(Toast, {
  newestOnTop: true,
  transition: "Vue-Toastification__fade",
  hideProgressBar: true,
});

app.mount("#app");
