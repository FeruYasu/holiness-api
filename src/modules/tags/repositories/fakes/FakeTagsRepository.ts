import { uuid } from 'uuidv4';

import ITagsRepository from '@modules/tags/repositories/ITagsRepository';
import ICreateTagDTO from '@modules/tags/dtos/ICreateTagDTO';

import Tag from '../../infra/typeorm/entities/Tag';

class TagsRepository implements ITagsRepository {
  private tags: Tag[] = [];

  public async create({ name }: ICreateTagDTO): Promise<Tag> {
    const tag = new Tag();

    Object.assign(tag, { id: uuid(), name });

    this.tags.push(tag);

    return tag;
  }

  public async save(tag: Tag): Promise<Tag> {
    const findIndex = this.tags.findIndex(findTag => findTag.id === tag.id);

    this.tags[findIndex] = tag;
    return tag;
  }

  public async listAll(): Promise<Tag[] | undefined> {
    const tagsList = await this.tags;

    return tagsList;
  }

  public async findByIds(ids: string[]): Promise<Tag[] | undefined> {
    const findTags = await this.tags.filter(tag => {
      return ids.includes(tag.id);
    });

    return findTags;
  }
}

export default TagsRepository;
