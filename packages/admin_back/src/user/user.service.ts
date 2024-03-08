import { HttpException, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { md5 } from 'src/utils';

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  async create(createUserDto) {
    const res = await this.userRepository.save(createUserDto);
    return res;
  }

  async findAll() {
    return this.userRepository.find({
      where: { state: true },
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
      where: { state: true, name: user.name }
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
      throw new HttpException('用户已存在', 200);
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
