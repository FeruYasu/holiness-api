import { injectable, inject } from 'tsyringe';
import ITagsRepository from '../repositories/ITagsRepository';

import ICreateTagDTO from '../dtos/ICreateTagDTO';
import Tag from '../infra/typeorm/entities/Tag';

@injectable()
class CreateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute(data: ICreateTagDTO): Promise<Tag> {
    const tags = await this.tagsRepository.create(data);

    return tags;
  }
}

export default CreateTagService;
