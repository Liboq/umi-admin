import request from '@/utils/request';

const RoomBaseUrl = '/api/room';
export const getRoomList = (params: API.RoomInfoVO) => {
  return request(RoomBaseUrl + '/query', { params });
};

export const createRoom = (data: API.RoomInfoVO) => {
  return request(RoomBaseUrl, { method: 'post', data });
};

export const patchRoom = (id: number, data: API.RoomInfoVO) => {
  return request(`${RoomBaseUrl}/${id}`, { method: 'patch', data });
};
export const getRoomInfo = (id: number) => {
  return request(`${RoomBaseUrl}/${id}`);
};
export const removeRoom = (id: number) => {
  return request(`${RoomBaseUrl}/${id}`, { method: 'delete' });
};
