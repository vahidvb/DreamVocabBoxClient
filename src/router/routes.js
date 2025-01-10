import App from '../App.vue'
import LoginPage from '../pages/Login.vue';
import BoxesPage from '../pages/Boxes.vue';
import AddVocabularyPage from '../pages/AddVocabulary.vue';
import CheckVocabularyPage from '../pages/CheckVocabulary.vue';
import VocabulariesPage from '../pages/Vocabularies.vue';

const routes = [
    { path: '/', component: App, meta: { requiresAuth: true, Authorize: false } },
    { path: '/Login', component: LoginPage, meta: { requiresAuth: false, Authorize: false } },
    { path: '/Boxes', component: BoxesPage, meta: { requiresAuth: true, Authorize: true } },
    { path: '/AddVocabulary', component: AddVocabularyPage, meta: { requiresAuth: true, Authorize: true } },
    { path: '/AddVocabulary/:text', component: AddVocabularyPage, meta: { requiresAuth: true, Authorize: true } },
    { path: '/CheckVocabulary/:boxNumber', component: CheckVocabularyPage, meta: { requiresAuth: true, Authorize: true } },
    { path: '/Vocabularies/:boxNumber', component: VocabulariesPage, meta: { requiresAuth: true, Authorize: true } }
];

export default routes;