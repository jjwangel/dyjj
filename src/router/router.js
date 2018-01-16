import Main from '@/views/main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '系统登录'
  },
  component: resolve => {require(['@/views/login/login.vue'], resolve);}
};

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: resolve => {require(['@/views/error-page/404.vue'], resolve);}
}

export const page403 = {
  path: '/403',
  name: 'error-403',
  meta: {
    title: '403-权限不足',
  },
  component: resolve => {require(['@/views/error-page/403.vue'], resolve);}
}

export const page500 = {
  path: '/500',
  name: 'error-500',
  meta: {
    title: '500-服务端错误'
  },
  component: resolve => {require(['@/views/error-page/500.vue'], resolve);}
}

// export const lockScreen = {
//   path: '/lockscreen',
//   name: 'lockscreen',
//   component: resolve => {require(['@/views/lockscreen/components/lock-page.vue'], resolve);}
// }


// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    {path: 'home',name: 'home',meta: {title: '',limit:''},component: resolve => {require(['@/views/home/home.vue'], resolve);}
  }]
}


// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
    path: '/sale-quantity-stat',
    icon: 'stats-bars',
    name: 'sale-quantity-stat',
    meta: {
      title: '售销数量统计'
    },
    component: Main,
    children: [{
        path: 'by-inv',
        icon: '',
        name: 'sqs-by-inv',
        meta: {
          title: '按存货档案统计',
          limit: ''
        },
        component: resolve => {require(['@/views/sale-quantity-stat/components/by-inv.vue'], resolve);}
      },
      {
        path: 'by-inv-class',
        icon: '',
        name: 'sqs-by-inv-class',
        meta: {
          title: '按存货分类统计',
          limit: ''
        },
        component: resolve => {require(['@/views/sale-quantity-stat/components/by-inv-class.vue'], resolve);}
      },
      {
        path: 'by-dep',
        icon: '',
        name: 'sqs-by-dep',
        meta: {
          title: '按部门统计',
          limit: ''
        },
        component: resolve => {require(['@/views/sale-quantity-stat/components/by-dep.vue'], resolve);}
      },
      {
        path: 'by-psn',
        icon: '',
        name: 'sqs-by-psn',
        meta: {
          title: '按业务员统计',
          limit: ''
        },
        component: resolve => {require(['@/views/sale-quantity-stat/components/by-psn.vue'], resolve);}
      },
      {
        path: 'by-cus',
        icon: '',
        name: 'sqs-by-cus',
        meta: {
          title: '按客户统计',
          limit: ''
        },
        component: resolve => {require(['@/views/sale-quantity-stat/components/by-cus.vue'], resolve);}
      }
    ]
  },
  {
    path: '/sale-amount-stat',
    icon: 'stats-bars',
    name: 'sale-amount-stat',
    meta: {
      title: '售销金额统计'
    },
    component: Main,
    children: [{
        path: 'by-inv',
        icon: '',
        name: 'sas-by-inv',
        meta: {
          title: '按存货档案统计',
          limit: ''
        },
        component: resolve => {require(['@/views/sale-amount-stat/components/by-inv.vue'], resolve);}
      },
      {
        path: 'by-inv-class',
        icon: '',
        name: 'sas-by-inv-class',
        meta: {
          title: '按存货分类统计',
          limit: ''
        },
        component: resolve => {require(['@/views/sale-amount-stat/components/by-inv-class.vue'], resolve);}
      },
      {
        path: 'by-dep',
        icon: '',
        name: 'sas-by-dep',
        meta: {
          title: '按部门统计',
          limit: ''
        },
        component: resolve => {require(['@/views/sale-amount-stat/components/by-dep.vue'], resolve);}
      },
      {
        path: 'by-psn',
        icon: '',
        name: 'sas-by-psn',
        meta: {
          title: '按业务员统计',
          limit: ''
        },
        component: resolve => {require(['@/views/sale-amount-stat/components/by-psn.vue'], resolve);}
      },
      {
        path: 'by-cus',
        icon: '',
        name: 'sas-by-cus',
        meta: {
          title: '按客户统计',
          limit: ''
        },
        component: resolve => {require(['@/views/sale-amount-stat/components/by-cus.vue'], resolve);}
      }
    ]
  },
  {
    path: '/system-manage',
    icon: 'android-settings',
    name: 'system-manage',
    meta: {
      title: '系统管理'
    },
    component: Main,
    children: [{
      path: 'user-setting',
      icon: '',
      name: 'user-setting',
      meta: {
        title: '用户设置',
        limit: ''
      },
      component: resolve => {require(['@/views/system-manage/components/user-setting.vue'], resolve);}
    }]
  }
]

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  // lockScreen,
  otherRouter,
  ...appRouter,
  page403,
  page500,
  page404
];
