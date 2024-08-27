import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user';
import { Permission } from './permission';

@Entity('UserPermission')
export class UserPermission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  permissionId!: number;

  @ManyToOne(() => User, user => user.userPermissions)
  user!: User;

  @ManyToOne(() => Permission, permission => permission.userPermissions)
  permission!: Permission;
}
