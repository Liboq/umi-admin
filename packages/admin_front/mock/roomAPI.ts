const Room = [
  {
    id: 0,
    name: '101',
    type: '单人间',
    status: 0, //0:空闲 1：已预订 2：已入住
    price: 200,
  },
  {
    id: 1,
    type: '双人间',
    name: '102',
    status: 0, //0:空闲 1：已预订 2：已入住
    price: 400,
  },
  {
    id: 2,
    type: '豪华单人间',
    name: '103',
    status: 2, //0:空闲 1：已预订 2：已入住 3：退房
    price: 600,
  },
  {
    id: 3,
    type: '豪华双人间',
    name: '104',
    status: 1, //0:空闲 1：已预订 2：已入住
    price: 1000,
  },
  {
    id: 4,
    type: '钟点房',
    name: '105',
    status: 0, //0:空闲 1：已预订 2：已入住
    price: 100,
  },
];
export default {
  'GET /api/v1/queryRoomList': (req: any, res: any) => {
    let { name, type, status } = req.query;
    name = name || '';
    type = type || '';
    const data = Room.filter(
      (item) =>
        item.name.includes(name) &&
        item.type.includes(type) &&
        (status ? item.status === status : true),
    );
    res.json({
      success: true,
      data: { list: data },
      errorCode: 0,
    });
  },
  'POST /api/v1/room/': (req: any, res: any) => {
    Room.push({ ...req.body, status: 0 });
    res.json({
      success: true,
      errorCode: 0,
    });
  },
};
