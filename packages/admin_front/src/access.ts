import { hasPermisson } from './utils';

export default function access(initialState={roles:[]}) {
  console.log();
  const { roles } = initialState;
  const menuList: any[] = [];
  if (Array.isArray(roles)) {
    roles.forEach((item) => {
      menuList.push(...item.permissions);
    });
  }
  console.log(menuList,hasPermisson(menuList, 'adminManage'));
  
  return {
    //个人中心权限
    adminManage: hasPermisson(menuList, 'adminManage'),
    adminHome: hasPermisson(menuList, 'adminHome'),
    adminManageHotel: hasPermisson(menuList, 'adminManageHotel'),
    adminManageRoom: hasPermisson(menuList, 'adminManageRoom'),
    adminManageRoomCategory: hasPermisson(menuList, 'adminManageRoomFinance'),
    adminResourcePersonnel: hasPermisson(menuList, 'adminResourcePersonnel'),
    adminResourceRole: true,
    adminResourcePermission: hasPermisson(menuList, 'adminResourcePermission'),
  };
}
