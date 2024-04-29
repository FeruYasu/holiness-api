import { injectable, inject } from 'tsyringe';

import IMinistriesRepository from '../repositories/IMinistriesRepository';
import Ministries from '../infra/typeorm/entities/Ministry';

@injectable()
class ListMinistriesService {
  constructor(
    @inject('MinistriesRepository')
    private ministriesRepository: IMinistriesRepository,
  ) {}

  public async execute(): Promise<Ministries[] | undefined> {
    const MinistriesList = this.ministriesRepository.listAll();

    return MinistriesList;
  }
}

export default ListMinistriesService;
