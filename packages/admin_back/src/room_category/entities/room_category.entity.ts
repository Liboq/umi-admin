import { Room } from 'src/room/entities/room.entity';
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'room_category',
})
export class RoomCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '房间类型名称',
    length: 50,
  })
  name: string;

  @Column({
    comment: '房间类型描述',
    length: 50,
  })
  description: string;

  @Column({
    comment: '是否可用',
    default: true,
  })
  state: boolean;
}
