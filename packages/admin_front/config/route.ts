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
    access: 'adminHome',
  },
  {
    name: '酒店管理',
    path: '/manage',
    component: './Manage',
    access: 'adminManage',
    routes: [
      {
        name: '酒店管理',
        path: '',
        component: './Manage/Default',
        access: 'adminManage',
      },
      {
        name: '客房管理',
        path: '/manage/room',
        component: './Manage/Room',
        access: 'adminManageRoom',
      },
      {
        name: '客房类型管理',
        path: '/manage/category',
        component: './Manage/Category',
        access: 'adminManageRoomCategory',
      },
      {
        name: '财务管理',
        path: '/manage/finance',
        component: './Manage/Finance',
        access: 'adminManageRoomFinance',
      },
    ],
  },
  {
    name: '资源管理',
    path: '/resource',
    component: './Resource',
    routes: [
      {
        name: '员工管理',
        path: '/resource/personnel',
        component: './Resource/Personnel',
        access: 'adminResourcePersonnel',
      },
      {
        name: '权限管理',
        path: '/resource/role',
        component: './Resource/Role',
        access: 'adminResourceRole',
      },
      {
        name: '角色管理',
        path: '/resource/permission',
        component: './Resource/Permission',
        access: 'adminResourcePermission',
      },
    ],
  },
];
