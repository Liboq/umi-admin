import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Room } from 'src/room/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation,Room])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
