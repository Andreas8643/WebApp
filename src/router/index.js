import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';   // Esileht
import AddPost from '@/views/AddPost.vue';     // Lisa postituse leht
import LoginView from '@/views/LoginView.vue'; // Logimise leht
import SignUp from '@/views/SignUp.vue';       // Registreerimise leht
import ContactUs from '@/views/ContactUS.vue';
import aPost from '@/views/aPost.vue';         // Ühe postituse detailvaade

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/addPost', name: 'AddPost', component: AddPost },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/contactUs', name: 'ContactUs', component: ContactUs },
  {
    path: '/post/:id',
    name: 'aPost',
    component: aPost,
    props: true, // Annab `id` propina aPost komponendile
  },
];

const router = createRouter({
  history: createWebHistory(), // Kasutab ajaloolist URL-i stiili (ilma hashita #)
  routes,
});

export default router;
