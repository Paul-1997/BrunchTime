// css
import 'bootstrap';
import './assets/main.scss';
// pinia
import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
// vee-validate
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { all } from '@vee-validate/rules';

import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router/index';

// VeeValidate 驗證規則設定
Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

const app = createApp(App);
const pinia = createPinia();

// 使用 Pinia 和 Router
pinia.use(({ store }) => {
  /* eslint-disable no-param-reassign */
  store.$router = markRaw(router);
});

app.use(pinia);
app.use(router);

// 注册 VeeValidate 组件
app.component('VeeField', Field);
app.component('VeeForm', Form);
app.component('VeeErrorMessage', ErrorMessage);

// 挂载应用
app.mount('#app');
