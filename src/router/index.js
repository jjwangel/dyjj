import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import store from '@/store'
import {routers,otherRouter,appRouter} from './router';
import Cookies from 'js-cookie';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();

  if (store.getters.token !== '') {
    store.dispatch('VerifyToken', { token: store.getters.token, init_user_info: (store.getters.user_id === '' ? true : false) })  // 判断token是否有效,如果user_id为空，则验证token同时，拉取用户数所据
      .then(code => {
        if (code === '000000') {
          if (to.name === "login") {
            next({
              replace: true,
              name: 'home'
            });
          } else {
            if (to.meta.limit) { // 判断to的页面是否需要权限
              if (store.getters.user_limits.includes(to.meta.limit)) { // 判断用户是否to页面的权限
                next();  // 放行
              } else {  // 跳转到没有权限页面
                next({
                  replace: true,
                  name: 'error-403'
                });
              }
            } else {
              next();
            }
          }

        } else {
          next({
            replace: true,
            name: 'login'
          });
        }
      })
      .catch((err) => {
        console.log(err);
        next({
          replace: true,
          name: 'login'
        });
      })
  } else if (to.name !== 'login') {
    next({
      replace: true,
      name: 'login'
    });
  } else {
    next();
  }
});

router.afterEach((to) => {
  iView.LoadingBar.finish();
});
