import {
  otherRouter,
  appRouter
} from '@/router/router';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';

const app = {
  state: {
    menu_list: appRouter,
    current_path: [{
      title: '首页',
      path: '/home',
      name: 'home'
    }],
  },
  mutations: {
    SET_CURRENT_PATH(state, value) {
      state.current_path = value;
    }
  },
  actions: {

  }
};

export default app;
