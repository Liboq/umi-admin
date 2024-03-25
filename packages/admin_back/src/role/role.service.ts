import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}
  async create(createRoleDto) {
    const { name, desc, permissions: permissionIds } = createRoleDto;

    //查询传入数组permissionIds的全部permission实体
    const permissions = await this.permissionRepository.findBy({
      id: In(permissionIds),
    });

    if (!createRoleDto.id) {
      const existRole = await this.roleRepository.findOne({
        where: { name },
      });
      if (existRole) throw new HttpException('角色已存在', 0.4);
      return this.roleRepository.save({
        permissions,
        name,
        desc,
      });
    }

    return this.roleRepository.save({
      id: createRoleDto.id,
      permissions,
      name,
      desc,
    });
  }

  async findAll() {
    const res = await this.roleRepository.find({
      relations: ['permissions'],
    });
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
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
