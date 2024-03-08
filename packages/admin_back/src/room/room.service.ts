import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Like, Repository } from 'typeorm';
import { RoomCategory } from 'src/room_category/entities/room_category.entity';

@Injectable()
export class RoomService {
  @InjectRepository(Room)
  private roomRepository: Repository<Room>;

  async create(createRoomDto) {
    const res = await this.roomRepository.save(createRoomDto);
    return res;
  }

  async find(params) {
    const { pageSize, current, ...reset } = params;
    const skip = (current - 1) * pageSize;
    const where: any = {};
    for (const key in reset) {
      where[key] = Like(`%${reset[key]}%`);
    }
    const res = await this.roomRepository.find({
      where,
      skip,
      take: pageSize,
    });
    return res;
  }

  async findOne(id: number) {
    const res = await this.roomRepository.findOneBy({ id });

    return res;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const res = await this.roomRepository.update(id, updateRoomDto);

    return res;
  }

  async remove(id: number) {
    const res = await this.roomRepository.update(id, { state: false });
    return res;
  }
}
