import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ITagsRepository from '@modules/tags/repositories/ITagsRepository';
import ISermonsRepository from '../repositories/ISermonsRepository';
import Sermon from '../infra/typeorm/entities/Sermon';

interface IRequest {
  sermonId: string;
  tagsIds: string[];
}

@injectable()
class UpdateSermonsTagsService {
  constructor(
    @inject('SermonsRepository')
    private sermonsRepository: ISermonsRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    sermonId,
    tagsIds,
  }: IRequest): Promise<Sermon | undefined> {
    const sermon = await this.sermonsRepository.findById(sermonId);

    const tags = await this.tagsRepository.findByIds(tagsIds);

    if (sermon && tags) {
      sermon.tags = tags;
      this.sermonsRepository.save(sermon);
    } else {
      throw new AppError('User ID or Sermon not found');
    }

    return sermon;
  }
}

export default UpdateSermonsTagsService;
