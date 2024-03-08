// 预定
import { Room } from 'src/room/entities/room.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length:50
  })
  customerName: string;

  @Column()
  checkInDate: Date;

  @Column()
  checkOutDate: Date;

  @Column({
    default: 1,
  })
  status: number;


  @ManyToOne(() => Room, (room) => room.reservations)
  room: Room;
}
