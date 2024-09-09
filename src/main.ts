/* eslint-disable no-param-reassign */
// css
import 'bootstrap';
import './assets/main.scss';
// vue pinia
import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router/index.ts';

const app = createApp(App);
// pinia
const pinia = createPinia();
app.use(pinia);
pinia.use(({ store }) => (store.$router = markRaw(router)));

app.use(router);

app.mount('#app');
