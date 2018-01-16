import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
// import {appRouter} from './router/router';
import store from './store';
import Util from './libs/util';
import App from './app.vue';
import * as filters from './filters'; // 全局filter
import'./mock';
import '@/styles/normalize.css';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  data: {

  },
  mounted() {

  },
  created() {

  }
});
