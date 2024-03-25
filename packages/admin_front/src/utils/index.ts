export const hasPermisson = (menuList: any[] = [], name) => {
  return !!menuList.find((item) => item?.name === name);
};
export const listToTree = (list: any[], parentId: number = 0): any[] => {
  const map = {};
  const roots = [];

  for (const item of list) {
    map[item["id"]] = { ...item, children: [] };
  }

  for (const item of list) {
    if (item[parentId] !== 0 && map[item[parentId]]) {
      map[item[parentId]].children.push(map[item["id"]]);
    } else {
      roots.push(map[item["id"]]);
    }
  }

  return roots;
};
