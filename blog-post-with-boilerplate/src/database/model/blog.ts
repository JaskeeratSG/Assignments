import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user';

@Entity('Blog')
export class Blog {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column('text')
  content!: string;

  @ManyToOne(() => User, user => user.blogs)
  author!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
