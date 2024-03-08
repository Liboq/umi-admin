import { Module } from '@nestjs/common';
import { RoomCategoryService } from './room_category.service';
import { RoomCategoryController } from './room_category.controller';
import { RoomCategory } from './entities/room_category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoomCategory])],
  controllers: [RoomCategoryController],
  providers: [RoomCategoryService],
})
export class RoomCategoryModule {}
