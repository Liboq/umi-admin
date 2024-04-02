import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { RoomModule } from './room/room.module';
import { Room } from './room/entities/room.entity';
import { RoomCategoryModule } from './room_category/room_category.module';
import { RoomCategory } from './room_category/entities/room_category.entity';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './glob/exceptionFillter.service';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { Role } from './role/entities/role.entity';
import { Permission } from './permission/entities/permission.entity';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/entities/reservation.entity';
import { EventGateway } from './events/events.gateway';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'pikachu',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '150.158.213.45',
      port: 3306,
      username: 'root',
      password: 'Lbq17607384217',
      database: 'umiadmin',
      synchronize: true,
      logging: true,
      entities: [User, Room, RoomCategory, Role, Permission, Reservation],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
        timezone: 'Asia/Shanghai', // 设置时区为中国
      },
    }),
    RoomModule,
    RoomCategoryModule,
    RoleModule,
    PermissionModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    EventGateway
  ],
})
export class AppModule {}
