export const route = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '登陆',
    path: '/login',
    component: './Login',
    hideInMenu: true,
    layout: false,
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: '权限演示',
    path: '/access',
    component: './Access',
  },
  {
    name: '酒店管理',
    path: '/manage',
    component: './Manage',
    routes: [
      {
        name: '客房管理',
        path: '',
        component: './Manage/Default',
      },
      {
        name: '客房管理',
        path: '/manage/room',
        component: './Manage/Room',
      },
      {
        name: '客房类型管理',
        path: '/manage/category',
        component: './Manage/Category',
      },
      {
        name: '员工管理',
        path: '/manage/personnel',
        component: './Manage/Personnel',
      },
      {
        name: '财务管理',
        path: '/manage/finance',
        component: './Manage/Finance',
      },
    ],
  },
  {
    name: ' CRUD 示例',
    path: '/table',
    component: './Table',
  },
];
