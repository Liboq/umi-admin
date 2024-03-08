import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation(createReservationDto);
  }

  @Post('checkin')
  checkIn(@Body() { reservationId }) {
    return this.reservationService.checkIn(reservationId);
  }
  @Get("query")
  queryReservation(@Query() params) {
    return this.reservationService.queryReservation(params);
  }
}
