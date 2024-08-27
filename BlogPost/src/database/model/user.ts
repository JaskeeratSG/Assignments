import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserPermission } from './user-permission';
import { Blog } from './blog';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => UserPermission, userPermission => userPermission.user)
  userPermissions!: UserPermission[];

  @OneToMany(() => Blog, blog => blog.author)
  blogs!: Blog[];
}
