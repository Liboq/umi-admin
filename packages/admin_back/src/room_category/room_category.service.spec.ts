import { Test, TestingModule } from '@nestjs/testing';
import { RoomCategoryService } from './room_category.service';

describe('RoomCategoryService', () => {
  let service: RoomCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomCategoryService],
    }).compile();

    service = module.get<RoomCategoryService>(RoomCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
