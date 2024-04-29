import { getRepository, Repository } from 'typeorm';

import ITagsRepository from '@modules/tags/repositories/ITagsRepository';

import ICreateTagDTO from '@modules/tags/dtos/ICreateTagDTO';

import Tag from '../entities/Tag';

class TagsRepository implements ITagsRepository {
  private ormRepository: Repository<Tag>;

  constructor() {
    this.ormRepository = getRepository(Tag);
  }

  public async create({ name }: ICreateTagDTO): Promise<Tag> {
    const tag = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(tag);

    return tag;
  }

  public async save(tag: Tag): Promise<Tag> {
    return this.ormRepository.save(tag);
  }

  public async findByIds(ids: string[]): Promise<Tag[] | undefined> {
    const tags = this.ormRepository.findByIds(ids);

    return tags;
  }

  public async listAll(): Promise<Tag[] | undefined> {
    const tags = this.ormRepository.find();

    return tags;
  }
}

export default TagsRepository;
