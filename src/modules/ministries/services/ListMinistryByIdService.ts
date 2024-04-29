import { injectable, inject } from 'tsyringe';
import IMinistriesRepository from '../repositories/IMinistriesRepository';
import Ministry from '../infra/typeorm/entities/Ministry';

@injectable()
class ListCourierByIdService {
  constructor(
    @inject('MinistriesRepository')
    private ministriesRepository: IMinistriesRepository,
  ) {}

  public async execute(id: string): Promise<Ministry | undefined> {
    const ministry = await this.ministriesRepository.findById(id);

    return ministry;
  }
}

export default ListCourierByIdService;
