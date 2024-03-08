import request from '@/utils/request';

const UserBaseUrl = '/api/user';
export const getUserList = () => {
  return request(UserBaseUrl);
};

export const createUser = (data: API.UserInfoVO) => {
  return request(UserBaseUrl, { method: 'post', data });
};

export const patchUser = (id: number, data: API.UserInfoVO) => {
  return request(`${UserBaseUrl}/${id}`, { method: 'patch', data });
};
export const getUserInfo = (id: number) => {
  return request(`${UserBaseUrl}/${id}`);
};
export const login = (data: API.UserLoginVO) => {
  return request(UserBaseUrl + '/login', { method: 'post', data });
};
export const register = (data: API.UserInfo) => {
  return request(UserBaseUrl + 'register', { method: 'post', data });
};
