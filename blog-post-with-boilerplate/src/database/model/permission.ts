import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserPermission } from './user-permission';

export enum PermissionType {
  READ = 'READ',
  WRITE = 'WRITE',
  BOTH = 'BOTH',
}

@Entity('Permission')
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: PermissionType })
  type!: PermissionType;

  @OneToMany(() => UserPermission, userPermission => userPermission.permission)
  userPermissions!: UserPermission[];
}
