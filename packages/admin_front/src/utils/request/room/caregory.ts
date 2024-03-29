import request from '@/utils/request';

const RoomCategoryBaseUrl = '/api/room-category';
export const getRoomCategoryList = () => {
  return request(RoomCategoryBaseUrl);
};

export const createRoomCategory = (data:any) => {
  return request(RoomCategoryBaseUrl, { method: 'post', data });
};

export const patchRoomCategory = (id: number, data:any) => {
  return request(`${RoomCategoryBaseUrl}/${id}`, { method: 'patch', data });
};
export const getRoomCategoryInfo = (id: number) => {
  return request(`${RoomCategoryBaseUrl}/${id}`);
};
