import { createApp } from 'vue';
import App from './App.vue';         // Juurelement
import router from './router';       // Routeri seadistus
import store from './store';         // Vuex-i pood

// Loo Vue rakendus
const app = createApp(App);

// Lisa Vue Router ja Vuex pood
app.use(router);
app.use(store);

// Mounti rakendus DOM-i
app.mount('#app');
