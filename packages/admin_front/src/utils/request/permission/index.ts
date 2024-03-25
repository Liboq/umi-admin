import request from '@/utils/request';

const PermissionBaseUrl = '/api/permission';
export const getPermissionList = () => {
  return request(PermissionBaseUrl);
};