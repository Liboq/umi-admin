//role.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    length: 20,
  })
  name: string;

  @Column({
    length: 20,
  })
  desc: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permission_relation',
  })
  permissions: Permission[];
}
