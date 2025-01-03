import { createApp } from 'vue'
import App from './App.vue'
import notyfPlugin from './plugins/notyf';
import axiosPlugin from './plugins/axios';
import messagePlugin from './plugins/message';
import { createPinia } from 'pinia';
import router from './router'; 

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(notyfPlugin);
app.use(axiosPlugin);
app.use(messagePlugin);
app.use(pinia);
app.mount('#app');