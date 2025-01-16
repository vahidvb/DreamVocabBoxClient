import { createApp } from 'vue'
import App from './App.vue'
import notyfPlugin from './plugins/notyf';
import axiosPlugin from './plugins/axios';
import { createPinia } from 'pinia';
import router from './router';
import directives from './directives';
import speechPlugin from './plugins/speech';


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


app.use(directives);
app.use(vuetify);
app.use(router);
app.use(notyfPlugin);
app.use(axiosPlugin);
app.use(speechPlugin);
app.use(pinia);
app.mount('#app');