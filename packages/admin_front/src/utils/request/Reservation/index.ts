import request from '@/utils/request';

const ReservationBaseUrl = '/api/reservation';
export const queryReservation = (params: { roomId: number }) => {
  return request(ReservationBaseUrl + '/query', { params });
};

export const createReservation = (data: API.ReservationInfoVO) => {
  return request(ReservationBaseUrl, { method: 'post', data });
};

export const patchReservation = (id: number, data: API.ReservationInfoVO) => {
  return request(`${ReservationBaseUrl}/${id}`, { method: 'patch', data });
};
export const getReservationInfo = (id: number) => {
  return request(`${ReservationBaseUrl}/${id}`);
};
export const removeReservation = (id: number) => {
  return request(`${ReservationBaseUrl}/${id}`, { method: 'delete' });
};
