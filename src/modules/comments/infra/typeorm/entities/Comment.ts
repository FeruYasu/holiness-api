import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToMany(() => Comment)
  @JoinTable({
    name: 'comments_replies',
    joinColumns: [{ name: 'comment_id' }],
    inverseJoinColumns: [{ name: 'reply_id' }],
  })
  replies: Comment[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Comment;
