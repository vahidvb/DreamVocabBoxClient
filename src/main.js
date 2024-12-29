import { createApp } from 'vue'
import App from './App.vue'
import LoginPage from './pages/Login.vue';
import BoxesPage from './pages/Boxes.vue';
import AddWordPage from './pages/AddWord.vue';
import { createRouter, createWebHistory } from 'vue-router';
import NotyfPlugin from './plugins/notyf';
import axiosPlugin from './plugins/axios';

const routes = [
  { path: '/', component: App, meta: { requiresAuth: true,showHeader: false } },
  { path: '/Login', component: LoginPage, meta: { requiresAuth: false,showHeader: false } },
  { path: '/Boxes', component: BoxesPage, meta: { requiresAuth: true,showHeader: true } },
  { path: '/AddWord', component: AddWordPage, meta: { requiresAuth: true,showHeader: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.fullPath == "/" || to.fullPath == "/Login" && token != null)
    next('/Boxes');

  if (to.meta.requiresAuth && token == null) {
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