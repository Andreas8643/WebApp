import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';  // Home page
import AddPost from '@/views/AddPost.vue';    // AddPost page
import LoginView from '@/views/LoginView.vue';// Login page
import SignUp from '@/views/SignUp.vue';      // SignUp page

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/addPost', name: 'AddPost', component: AddPost },
  { path: '/login', name: 'Login', component: LoginView },
  {path: '/signup', name: 'SignUp', component: SignUp}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
