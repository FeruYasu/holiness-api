import uploadConfig from '@config/upload';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import Ministry from '@modules/ministries/infra/typeorm/entities/Ministry';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  local: string;

  @Column()
  description: string;

  @Column()
  photo: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @CreateDateColumn()
  @Exclude()
  updated_at: Date;

  @ManyToMany(() => Ministry)
  @JoinTable({
    name: 'events_ministries',
    joinColumns: [{ name: 'event_id' }],
    inverseJoinColumns: [{ name: 'ministry_id' }],
  })
  ministries: Ministry[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'events_participants',
    joinColumns: [{ name: 'event_id' }],
    inverseJoinColumns: [{ name: 'user_id' }],
  })
  participants: User[];

  @Expose({ name: 'photoUrl' })
  getPhotoUrl(): string | null {
    if (!this.photo) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.photo}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.photo}`;
      default:
        return null;
    }
  }
}

export default Event;
