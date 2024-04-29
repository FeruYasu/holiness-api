import Ministry from '@modules/ministries/infra/typeorm/entities/Ministry';
import User from '@modules/users/infra/typeorm/entities/User';
import Comment from '@modules/comments/infra/typeorm/entities/Comment';

import { Expose } from 'class-transformer';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import uploadConfig from '@config/upload';

@Entity('testimonials')
class Testimonial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  photo: string;

  @Column()
  user_id: string;

  @Column()
  ministry_id: string;

  @Column()
  approved: boolean;

  @Column('simple-array')
  emoji1: string[];

  @Column('simple-array')
  emoji2: string[];

  @Column('simple-array')
  emoji3: string[];

  @Column('simple-array')
  emoji4: string[];

  @Column('simple-array')
  emoji5: string[];

  @Column('simple-array')
  emoji6: string[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Ministry)
  @JoinColumn({ name: 'ministry_id', referencedColumnName: 'id' })
  ministry: Ministry;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Comment)
  @JoinTable({
    name: 'testimonials_comments',
    joinColumns: [{ name: 'testimonial_id' }],
    inverseJoinColumns: [{ name: 'comment_id' }],
  })
  comments: Comment[];

  @Expose({ name: 'photo_url' })
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

export default Testimonial;
