export const hasPermisson = (menuList: any[] = [], name) => {
  return !!menuList.find((item) => item?.name === name);
};
