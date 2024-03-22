import { Pie } from '@ant-design/charts';
import { useEffect, useState } from 'react';
const HotelPie = ({ data }: HotiePie) => {
  const [pieData, sePieData] = useState(data);
  const RoomStatusType = ['空闲', '预定', '已入住'];
  useEffect(() => {
    sePieData(data);
  }, [data]);
  const config = {
    data: [
      { type: RoomStatusType[0], value: pieData[0] },
      { type: RoomStatusType[1], value: pieData[1] },
      { type: RoomStatusType[2], value: pieData[2] },
    ],
    width: 300,
    angleField: 'value',
    colorField: 'type',
    paddingRight: 80,
    tooltip: {
      title: 'type',
      value: 'value',
    },
    label: {
      text: 'value',
      position: 'outside',
    },
    title: '状态',
    legend: {
      color: {
        position: 'right',
        rowPadding: 5,
      },
    },
  };
  return pieData && <Pie {...config} />;
};

export default HotelPie;
