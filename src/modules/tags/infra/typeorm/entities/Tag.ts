import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('tags')
class Tag {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column()
  name: string;
}

export default Tag;
