import { createApp } from 'vue'
import App from './App.vue'
import notyfPlugin from './plugins/notyf';
import axiosPlugin from './plugins/axios';
import { createPinia } from 'pinia';
import router from './router';
import directives from './directives';
import speechPlugin from './plugins/speech';
import Vue3TouchEvents from "vue3-touch-events";
import i18n from '@/i18n'

// Vuetify
import vuetify from './plugins/vuetify';

// notyf
import 'notyf/notyf.min.css'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// material design


const app = createApp(App);
const pinia = createPinia();

const lang = localStorage.getItem("lang") || "en-GB"

document.documentElement.lang = lang
document.documentElement.dir = lang === "fa-IR" || lang === "ar-SA" ? "rtl" : "ltr"

app.use(directives);
app.use(vuetify);
app.use(Vue3TouchEvents);
app.use(router);
app.use(notyfPlugin);
app.use(axiosPlugin);
app.use(speechPlugin);
app.use(pinia);
app.use(i18n);

app.mount('#app');