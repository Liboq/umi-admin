import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Raw,
  Repository,
} from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { Room } from 'src/room/entities/room.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async createReservation(
    CreateReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const { roomId, checkInDate, checkOutDate } = CreateReservationDto;
    const room = await this.roomRepository.findOne({ where: { id: roomId } });

    if (!room) {
      throw new Error('客房不存在');
    }

    // 检查客房是否空闲
    const isRoomAvailable = await this.isRoomAvailable(
      room.id,
      checkInDate,
      checkOutDate,
    );
    if (!(isRoomAvailable.length === 0)) {
      throw new Error('客房在指定时间段内不可用');
    }
    room.status = 1;
    this.roomRepository.save(room);

    return this.reservationRepository.save({ ...CreateReservationDto, room });
  }
  async queryReservation(params) {
    const { roomId, pageSize, current, checkInDate, checkOutDate, ...reset } =
      params;
    const skip = (current - 1) * pageSize;
    const where: any = { room: { id: roomId } };
    for (const key in reset) {
      where[key] = Like(`%${reset[key]}%`);
    }
    if (checkInDate && checkOutDate) {
      where.startDate = MoreThanOrEqual(checkInDate);
      where.endDate = LessThanOrEqual(checkOutDate);
    } else if (checkInDate) {
      where.startDate = MoreThanOrEqual(checkInDate);
    } else if (checkOutDate) {
      where.endDate = LessThanOrEqual(checkOutDate);
    }
    const res = await this.reservationRepository.find({
      where,
      skip,
      take: pageSize,
    });
    return res;
  }

  async isRoomAvailable(roomId: number, checkInDate: Date, checkOutDate: Date) {
    // 查询该客房在指定时间段内的所有预定信息
    const reservations = await this.reservationRepository.find({
      where: {
        room: { id: roomId },
        checkInDate: Raw((alias) => `${alias} <= :checkInDate`, {
          checkInDate,
        }),
        checkOutDate: Raw((alias) => `${alias} >= :checkOutDate`, {
          checkOutDate,
        }),
      },
    });

    // 如果存在预定信息，则表示客房在该时间段内不可用
    return reservations;
  }

  async checkIn(reservationId: number) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ['room'],
    });
    if (!reservation) {
      throw new Error('预定信息不存在');
    }

    reservation.status = 2;
    reservation.room.status = 2; // 更新客房状态为已入住
    await this.reservationRepository.save(reservation);
    await this.roomRepository.save(reservation.room);

    return reservation;
  }
}
