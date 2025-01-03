import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

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

export default router;