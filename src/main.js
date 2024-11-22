import { createApp } from 'vue';
import App from './App.vue';         // The root app component
import router from './router';       // Import the router for Vue Router
import store from './store';         // Import the Vuex store

// Create the Vue app
const app = createApp(App);

// Use Vue Router and Vuex store in the app
app.use(router);    // Use the Vue Router
app.use(store);     // Use Vuex store

// Mount the app to the DOM
app.mount('#app');
