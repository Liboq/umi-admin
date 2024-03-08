import { Injectable } from '@nestjs/common';
import { CreateRoomCategoryDto } from './dto/create-room_category.dto';
import { UpdateRoomCategoryDto } from './dto/update-room_category.dto';
import { RoomCategory } from './entities/room_category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomCategoryService {
  @InjectRepository(RoomCategory)
  private roomCategoryRepository: Repository<RoomCategory>;

  async create(createRoomDto) {
    const res = await this.roomCategoryRepository.save(createRoomDto);
    return res;
  }

  async findAll() {
    return this.roomCategoryRepository.find();
  }

  async findOne(id: number) {
    const res = await this.roomCategoryRepository.findOneBy({ id });

    return res;
  }

  async search(params) {
    const res = await this.roomCategoryRepository.find(params);
    return res;
  }

  async update(id: number, updateRoomCategoryDto) {
    const res = await this.roomCategoryRepository.update(id, updateRoomCategoryDto);

    return res;
  }

  async remove(id: number) {
    const res = await this.roomCategoryRepository.update(id,{state:false})
    return res
  }
}
