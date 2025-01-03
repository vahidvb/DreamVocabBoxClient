import App from '../App.vue'
import LoginPage from '../pages/Login.vue';
import BoxesPage from '../pages/Boxes.vue';
import AddVocabularyPage from '../pages/AddVocabulary.vue';
import CheckVocabularyPage from '../pages/CheckVocabulary.vue';

const routes = [
    { path: '/', component: App, meta: { requiresAuth: true, showHeader: false } },
    { path: '/Login', component: LoginPage, meta: { requiresAuth: false, showHeader: false } },
    { path: '/Boxes', component: BoxesPage, meta: { requiresAuth: true, showHeader: true } },
    { path: '/AddVocabulary', component: AddVocabularyPage, meta: { requiresAuth: true, showHeader: true } },
    { path: '/CheckVocabulary/:boxNumber', component: CheckVocabularyPage, meta: { requiresAuth: true, showHeader: true } }
];

export default routes;