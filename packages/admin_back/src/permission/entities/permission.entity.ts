//permission.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    length: 50,
  })
  name: string;
  @Column({
    default: 0,
  })
  parentId: number;

  @Column({
    length: 100,
    nullable: true,
  })
  desc: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
