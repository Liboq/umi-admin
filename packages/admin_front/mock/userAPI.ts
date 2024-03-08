const users = [
  { id: 0, name: 'admin', nickName: 'A', gender: 'MALE', password: '123456' },
  {
    id: 1,
    name: 'zhangsan',
    nickName: 'Z',
    gender: 'FEMALE',
    password: '123456',
  },
];
export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'post /api/v1/userLogin': (req: any, res: any) => {
    const { name, password } = req.body;
    const findUser = users.some(
      (item) => item.name === name && item.password === password,
    );
    res.json({
      success: findUser,
      data: findUser,
      errorCode: 0,
    });
  },
  'post /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
};
