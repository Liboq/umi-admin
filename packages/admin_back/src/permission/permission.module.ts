import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { UserModule } from 'src/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { PermissionGuard } from './permission.guard';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [PermissionController],
  providers: [
    PermissionService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
  imports: [UserModule, TypeOrmModule.forFeature([Permission,User])],
})
export class PermissionModule {}
