import App from '../App.vue'
import LoginPage from '../pages/Login.vue';
import BoxesPage from '../pages/Boxes.vue';
import AddVocabularyPage from '../pages/AddVocabulary.vue';
import CheckVocabularyPage from '../pages/CheckVocabulary.vue';
import VocabulariesPage from '../pages/Vocabularies.vue';
import FriendsPage from '../pages/Friends.vue';
import MessagesListPage from '../pages/MessagesList.vue';
import MessagesPage from '../pages/Messages.vue';
import ReviewVocabularyPage from '../pages/ReviewVocabulary.vue';

const routes = [
    { path: '/', component: App, meta: { requiresAuth: true, Authorize: false } },
    { path: '/Login', component: LoginPage, meta: { requiresAuth: false, Authorize: false } },
    { path: '/Boxes', component: BoxesPage, meta: { requiresAuth: true, Authorize: true } },
    { path: '/AddVocabulary', component: AddVocabularyPage, meta: { requiresAuth: true, Authorize: true } },
    { path: '/AddVocabulary/:Word', component: AddVocabularyPage, meta: { requiresAuth: true, Authorize: true }},
    { path: '/CheckVocabulary/:boxNumber', component: CheckVocabularyPage, meta: { requiresAuth: true, Authorize: true } },
    { path: '/ReviewVocabulary/:boxNumber', component: ReviewVocabularyPage, meta: { requiresAuth: true, Authorize: true } },
    { path: '/Vocabularies', component: VocabulariesPage, meta: { requiresAuth: true, Authorize: true }},
    { path: '/Vocabularies/:boxNumber', component: VocabulariesPage, meta: { requiresAuth: true, Authorize: true }},
    { path: '/Friends', component: FriendsPage, meta: { requiresAuth: true, Authorize: true } },
    { path: '/MessagesList', component: MessagesListPage, meta: { requiresAuth: true, Authorize: true } },
    { path: '/Messages/:userId', component: MessagesPage, meta: { requiresAuth: true, Authorize: true } },
];

export default routes;