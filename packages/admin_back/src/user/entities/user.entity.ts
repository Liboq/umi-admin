import { Role } from 'src/role/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '姓名',
    length: 50,
  })
  name: string;

  @Column({
    comment: '密码',
    length: 50,
  })
  password: string;

  @Column({
    comment: '头像',
    length: 1000,
    default: 'https://p26-passport.byteacctimg.com/img/user-avatar/312989b46037c16843b1eb44aea82fa2~180x180.awebp?',
  })
  avator: string;

  @Column({
    comment: '手机号',
    length: 50,
    default:""
  })
  mobile: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role_relation',
  })
  roles: Role[]; //角色

  @Column({
    comment: '是否可用',
    default: true,
  })
  state: boolean;
}
