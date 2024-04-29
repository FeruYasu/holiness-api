import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import Event from '@modules/events/infra/typeorm/entities/Event';
import Ministry from '@modules/ministries/infra/typeorm/entities/Ministry';

@Entity('announcements')
class Announcement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  image: string;

  @Column()
  video: string;

  @Column()
  link: string;

  @Column()
  user_id: string;

  @Column()
  event_id: string;

  @Column()
  ministry_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'event_id', referencedColumnName: 'id' })
  event: Event;

  @ManyToOne(() => Ministry)
  @JoinColumn({ name: 'ministry_id', referencedColumnName: 'id' })
  ministry: Ministry;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Announcement;
