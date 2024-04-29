import { injectable, inject } from 'tsyringe';

import ITagsRepository from '../repositories/ITagsRepository';
import Tags from '../infra/typeorm/entities/Tag';

@injectable()
class ListTagsService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute(): Promise<Tags[] | undefined> {
    const TagsList = this.tagsRepository.listAll();

    return TagsList;
  }
}

export default ListTagsService;
