import { createApp } from "vue";
import App from "./App.vue";
import router from '@/router/router'
import vuetify from "./plugins/vuetify.js";
import { createPinia } from 'pinia'

createApp(App).use(vuetify).use(router).use(createPinia()).mount("#app");