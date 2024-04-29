import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import uploadConfig from '@config/upload';

import { Expose } from 'class-transformer';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('ministries')
class Ministry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  local: string;

  @Column()
  date: Date;

  @Column()
  hour: Date;

  @Column()
  photo: string;

  @Column()
  description: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'ministries_leaders',
    joinColumns: [{ name: 'ministry_id' }],
    inverseJoinColumns: [{ name: 'user_id' }],
  })
  leaders: User[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'ministries_members',
    joinColumns: [{ name: 'ministry_id' }],
    inverseJoinColumns: [{ name: 'user_id' }],
  })
  members: User[];

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

export default Ministry;
