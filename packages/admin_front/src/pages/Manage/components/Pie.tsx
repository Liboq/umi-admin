import { Pie } from '@ant-design/charts';
import React from 'react';
const HotelPie: React.FC = () => {
  const config = {
    data: [
      { type: '分类一', value: 27 },
      { type: '分类二', value: 25 },
      { type: '分类三', value: 18 },
      { type: '分类四', value: 15 },
      { type: '分类五', value: 10 },
      { type: '其他', value: 5 },
    ],
    width:300,
    angleField: 'value',
    colorField: 'type',
    paddingRight: 80,
    label: {
      text: 'value',
      position: 'outside',
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
};

export default HotelPie;
