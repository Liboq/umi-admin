/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface PageInfo_ReservationInfo_ {
    /** 
    1 */
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<ReservationInfo>;
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_PageInfo_ReservationInfo__ {
    success?: boolean;
    errorMessage?: string;
    data?: PageInfo_ReservationInfo_;
  }

  interface Result_ReservationInfo_ {
    success?: boolean;
    errorMessage?: string;
    data?: ReservationInfo;
  }

  interface Result_string_ {
    success?: boolean;
    errorMessage?: string;
    data?: string;
  }

  type ReservationGenderEnum = 0 | 1 | 2;

  interface ReservationInfo {
    id: number;
    room: API.RoomInfo;
    customerName: string;
    checkInDate: Date;
    checkOutDate: Date;
    status: string;
  }

  interface ReservationInfoVO {
    roomId: number;
    customerName: string;
    checkInDate: Date;
    checkOutDate: Date;
  }
}
