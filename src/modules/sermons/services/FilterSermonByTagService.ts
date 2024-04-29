import { injectable, inject } from 'tsyringe';
import ISermonsRepository from '../repositories/ISermonsRepository';
import Sermon from '../infra/typeorm/entities/Sermon';

@injectable()
class FilterSermonsService {
  constructor(
    @inject('SermonsRepository')
    private sermonsRepository: ISermonsRepository,
  ) {}

  public async execute(tag: string): Promise<Sermon[] | undefined> {
    const sermons = await this.sermonsRepository.filterByTag(tag);

    return sermons;
  }
}

export default FilterSermonsService;
