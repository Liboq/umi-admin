export const hasPermisson = (menuList: any[] = [], name) => {
  return !!menuList.find((item) => item?.name === name);
};
export const listToTree = (list: any[], parentId: number = 0): any[] => {
  const map = {};
  const roots = [];
  for (const item of list) {
    map[item['id']] = { ...item, children: [] };
  }
  for (const item of list) {
    if (item[parentId] !== 0 && map[item[parentId]]) {
      map[item[parentId]].children.push(map[item['id']]);
    } else {
      roots.push(map[item['id']]);
    }
  }
  return roots;
};
export function randomColor() {
  // 生成一个随机的 R、G、B 分量
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // 将 R、G、B 分量转换为十六进制，并拼接成颜色字符串
  const color = '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);

  return color;
}

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}
