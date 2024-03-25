import request from '@/utils/request';

const RoleBaseUrl = '/api/role';
export const getRoleList = () => {
  return request(RoleBaseUrl);
};
export const createRole = (data) => {
  return request(RoleBaseUrl, { method: 'post', data });
};
