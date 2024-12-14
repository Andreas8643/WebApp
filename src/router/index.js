import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';   // Esileht
import AddPost from '@/views/AddPost.vue';     // Lisa postituse leht
import LoginView from '@/views/LoginView.vue'; // Logimise leht
import SignUp from '@/views/SignUp.vue';       // Registreerimise leht
import ContactUs from '@/views/ContactUS.vue';
import aPost from '@/views/aPost.vue';         // Ühe postituse detailvaade
import { isTokenValid } from "@/utils/auth";

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  {
    path: "/addPost",
    name: "AddPost",
    component: AddPost,
    beforeEnter: (to, from, next) => {
      if (isTokenValid()) {
        next(); // Allow access if the token is valid
      } else {
        next("/login"); // Redirect to the login page if not authenticated
      }
    },
  },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/contactUs', name: 'ContactUs', component: ContactUs },
  {
    path: '/post/:id',
  name: 'aPost',
  component: aPost,
  beforeEnter: (to, from, next) => {
    if (isTokenValid()) {
      next(); // Allow access if authenticated
    } else {
      next('/login'); // Redirect to login
    }
  },
  },  
];

const router = createRouter({
  history: createWebHistory(), // Kasutab ajaloolist URL-i stiili (ilma hashita #)
  routes,
});

export default router;
