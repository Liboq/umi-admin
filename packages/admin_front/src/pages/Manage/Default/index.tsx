import { getAllRoom } from '@/utils/request/room';
import { useEffect, useState } from 'react';
import HotelPie from '../components/Pie';
import './index.less';
const Default = () => {
  const [roomData, setRoomData] = useState<number[]>([]);
  const getAllRooms = async () => {
    const res = await getAllRoom();
    const data: DataType = { 0: 0, 1: 0, 2: 0 };
    if (res.status === 200) {
      res.data.forEach((item: { status: RoomStatusType }) => {
        data[item.status]++;
      });
      const r = Object.values(data);
      setRoomData([...r]);
    }
  };
  useEffect(() => {
    getAllRooms();
  }, []);
  return (
    <>
      <div className="manage-default-content">
        <div className="manage-default-content-form">
          <HotelPie data={roomData} />
        </div>
      </div>
    </>
  );
};
export default Default;
