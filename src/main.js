import { createApp } from 'vue'
import App from './App.vue'
import LoginPage from './Login.vue';
import { createRouter, createWebHistory } from 'vue-router';
import NotyfPlugin from './plugins/notyf';
import axiosPlugin from './plugins/axios';

const routes = [
  { path: '/', component: App, meta: { requiresAuth: true } },
  { path: '/Login', component: LoginPage, meta: { requiresAuth: false } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');
  //if(to.fullPath=="/" && token)
  if (to.meta.requiresAuth && !token) {
    next('/Login');
  } else {
    next();
  }
});

const app = createApp(App);
app.use(router);
app.use(NotyfPlugin);
app.use(axiosPlugin);
app.mount('#app');