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

import uploadConfig from '@config/upload';

import { Exclude, Expose } from 'class-transformer';
import User from '@modules/users/infra/typeorm/entities/User';
import Tag from '@modules/tags/infra/typeorm/entities/Tag';
import Comment from '@modules/comments/infra/typeorm/entities/Comment';

@Entity('sermons')
class Sermon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  preacher_id: string;

  @Column()
  description: string;

  @Column()
  video_url: string;

  @Column()
  @Exclude()
  thumbnail: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'preacher_id', referencedColumnName: 'id' })
  preacher: User;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @CreateDateColumn()
  @Exclude()
  updated_at: Date;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'sermons_tags',
    joinColumns: [{ name: 'sermon_id' }],
    inverseJoinColumns: [{ name: 'tag_id' }],
  })
  tags: Tag[];

  @ManyToMany(() => Comment)
  @JoinTable({
    name: 'sermons_comments',
    joinColumns: [{ name: 'sermon_id' }],
    inverseJoinColumns: [{ name: 'comment_id' }],
  })
  comments: Comment[];

  @Expose({ name: 'photoUrl' })
  getPhotoUrl(): string | null {
    if (!this.thumbnail) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.thumbnail}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.thumbnail}`;
      default:
        return null;
    }
  }
}

export default Sermon;
