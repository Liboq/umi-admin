import { HttpException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}
  async create(createPermissionDto) {
    const name = createPermissionDto.name;
    const existPermission = await this.permissionRepository.findOne({
      where: { name },
    });

    if (existPermission) throw new HttpException('权限字段已存在', 400);
    return await this.permissionRepository.save(createPermissionDto);
  }

  async findAll() {
    const res = await this.permissionRepository.find();
    const data = res.map((entity) => ({
      ...entity,
      updateTime: entity.updateTime.toLocaleString('zh-CN', {
        hour12: false,
        timeZone: 'Asia/Shanghai',
      }),
      createTime: entity.updateTime.toLocaleString('zh-CN', {
        hour12: false,
        timeZone: 'Asia/Shanghai',
      }),
    }));
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
