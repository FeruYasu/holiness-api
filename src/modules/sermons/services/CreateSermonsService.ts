import { injectable, inject } from 'tsyringe';
import ISermonsRepository from '../repositories/ISermonsRepository';

import ICreateSermonDTO from '../dtos/ICreateSermonDTO';
import Sermon from '../infra/typeorm/entities/Sermon';

@injectable()
class CreateSermonService {
  constructor(
    @inject('SermonsRepository')
    private sermonsRepository: ISermonsRepository,
  ) {}

  public async execute(data: ICreateSermonDTO): Promise<Sermon> {
    const sermons = await this.sermonsRepository.create(data);

    return sermons;
  }
}

export default CreateSermonService;
