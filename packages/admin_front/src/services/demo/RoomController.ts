/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/v1/queryRoomList */
export async function queryRoomList(
  params: {
    // query
    /** keyword */
    keyword?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_RoomInfo__>('/api/v1/queryRoomList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/room */
export async function addRoom(
  body?: API.RoomInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_RoomInfo_>('/api/v1/room', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/room/${param0} */
export async function getRoomDetail(
  params: {
    // path
    /** RoomId */
    RoomId?: string;
  },
  options?: { [key: string]: any },
) {
  const { RoomId: param0 } = params;
  return request<API.Result_RoomInfo_>(`/api/v1/room/${param0}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/room/${param0} */
export async function modifyRoom(
  params: {
    // path
    /** RoomId */
    RoomId?: string;
  },
  body?: API.RoomInfoVO,
  options?: { [key: string]: any },
) {
  const { RoomId: param0 } = params;
  return request<API.Result_RoomInfo_>(`/api/v1/room/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/v1/room/${param0} */
export async function deleteRoom(
  params: {
    // path
    /** RoomId */
    RoomId?: string;
  },
  options?: { [key: string]: any },
) {
  const { RoomId: param0 } = params;
  return request<API.Result_string_>(`/api/v1/room/${param0}`, {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}
