import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomCategoryService } from './room_category.service';
import { CreateRoomCategoryDto } from './dto/create-room_category.dto';
import { UpdateRoomCategoryDto } from './dto/update-room_category.dto';

@Controller('room-category')
export class RoomCategoryController {
  constructor(private readonly roomCategoryService: RoomCategoryService) {}

  @Post()
  create(@Body() createRoomCategoryDto: CreateRoomCategoryDto) {
    return this.roomCategoryService.create(createRoomCategoryDto);
  }

  @Get()
  findAll() {
    return this.roomCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomCategoryDto: UpdateRoomCategoryDto) {
    return this.roomCategoryService.update(+id, updateRoomCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomCategoryService.remove(+id);
  }
}
