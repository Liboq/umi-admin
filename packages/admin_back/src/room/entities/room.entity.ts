import { Reservation } from '../../reservation/entities/reservation.entity';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'room',
})
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '房间名',
    length: 50,
  })
  name: string;

  //0:空闲 1：已预订 2：已入住 3：退房
  @Column({
    comment: '状态',
    default: 0,
  })
  status: number;

  @Column({
    comment: '价格',
  })
  price: number;

  @Column({
    comment: '类型',
  })
  typeId: number;

  @Column({
    comment: '描述',
    length: 50,
  })
  description: string;

  @OneToMany(() => Reservation, (reservation) => reservation.room)
  reservations: Reservation[];
  
  @Column({
    comment: '是否存在',
    default: true,
  })
  state: boolean;
}
