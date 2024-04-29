import { injectable, inject } from 'tsyringe';
import ISermonsRepository from '../repositories/ISermonsRepository';
import Sermon from '../infra/typeorm/entities/Sermon';

@injectable()
class ListSermonsService {
  constructor(
    @inject('SermonsRepository')
    private sermonsRepository: ISermonsRepository,
  ) {}

  public async execute(): Promise<Sermon[] | undefined> {
    const sermons = await this.sermonsRepository.listAll();

    return sermons;
  }
}

export default ListSermonsService;
