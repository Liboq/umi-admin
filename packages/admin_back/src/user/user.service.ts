import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { md5 } from 'src/utils';
import { Role } from 'src/role/entities/role.entity';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  private logger = new Logger();

  async create(createUserDto) {
    const res = await this.userRepository.save(createUserDto);
    return res;
  }

  async findAll() {
    return this.userRepository.find({
      where: { state: true },
      relations: ['roles'],
      select: ['name', 'avator', 'id', 'mobile'],
    });
  }

  async findOne(id: number) {
    const res = await this.userRepository.findOne({
      where: { id, state: true },
      select: ['name', 'avator', 'id', 'mobile'],
    });

    return res;
  }

  async search(params) {
    const res = await this.userRepository.find(params);
    return res;
  }

  async update(id: number, updateUserDto) {
    const res = await this.userRepository.update(id, updateUserDto);

    return res;
  }

  async remove(id: number) {
    const res = await this.userRepository.update(id, { state: false });
    return res;
  }
  async login(user) {
    const foundUser = await this.userRepository.findOne({
      where: { state: true, name: user.name },
      relations: ['roles', 'roles.permissions'],
    });
    if (!foundUser) {
      throw new UnauthorizedException('用户名不存在');
    }
    if (foundUser.password !== md5(user.password)) {
      throw new UnauthorizedException('密码错误');
    }
    return foundUser;
  }
  async register(user) {
    const foundUser = await this.userRepository.findOneBy({
      name: user.name,
    });

    /**
     * 校验用户是否已存在
     */
    if (foundUser) {
      throw new HttpException('用户已存在', 400);
    }

    const newUser = new User();
    newUser.name = user.name;
    newUser.password = md5(user.password);

    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (e) {
      this.logger.error(e, UserService);
      return '注册失败';
    }
  }
  async updateUserRoles(createRoleDto) {
    console.log(createRoleDto);

    const {id} = createRoleDto;

    const user = await this.findOne(id);
    if (!user) {
      throw new UnauthorizedException('用户名不存在');
    }
    console.log(user);

    //查询传入数组permissionIds的全部permission实体
    const roles = await this.roleRepository.findBy({
      id: In(createRoleDto.roles),
    });
    user.roles = roles;
    if (roles.length <= 0) {
      throw new Error('roles not found');
    }

    return this.userRepository.save(user);
  }
  async findPermissionNames(token: string, userInfo) {
    const user = await this.userRepository.findOne({
      where: { name: userInfo.name },
      relations: ['roles', 'roles.permissions'],
    });
    if (user) {
      const permissions = user.roles.flatMap((role) => role.permissions);
      const permissionNames = permissions.map((item) => item.name);
      return [...new Set(permissionNames)];
    } else {
      return [];
    }
  }
}
