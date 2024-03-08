/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface PageInfo_RoomInfo_ {
    /** 
  1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<RoomInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_RoomInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_RoomInfo_;
  }

  interface Result_RoomInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: RoomInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  type RoomGenderEnum = 0 | 1 | 2;

  interface RoomInfo {
    id: number;
    name?: string;
    /** nick */
    typeId?: string;
    /** email */
    status?: RoomGenderEnum;
    price?: number;
    description?: string;
  }

  interface RoomInfoVO {
    name?: string;
    /** nick */
    status?: RoomGenderEnum;
    /** email */
    type?: string;
    price?: number;
    description?: string;
    typeId?: number;
  }
}
