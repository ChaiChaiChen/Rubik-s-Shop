/* eslint-disable import/no-extraneous-dependencies */
import { createApp } from 'vue';
// 匯入axios套件,連接api使用
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import 'bootstrap';
import { currency } from './methods/filters';

const app = createApp(App);
app.config.globalProperties.$filters = {
  currency,
};
app.use(router);
// 加入axios套件
app.use(VueAxios, axios);
app.mount('#app');
