import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMinistriesRepository from '../repositories/IMinistriesRepository';

import Ministry from '../infra/typeorm/entities/Ministry';

interface IRequest {
  name: string;
  local?: string;
  date?: Date;
  hour?: Date;
  description?: string;
}

@injectable()
class UpdateMinistriesService {
  constructor(
    @inject('MinistriesRepository')
    private ministriesRepository: IMinistriesRepository,
  ) {}

  public async execute({
    name,
    local,
    date,
    hour,
    description,
  }: IRequest): Promise<Ministry> {
    const ministry = await this.ministriesRepository.findByName(name);

    if (!ministry) {
      throw new AppError('User not found');
    }

    if (local) {
      ministry.local = local;
    }

    if (date) {
      ministry.date = date;
    }

    if (hour) {
      ministry.hour = hour;
    }

    if (description) {
      ministry.description = description;
    }

    return this.ministriesRepository.save(ministry);
  }
}

export default UpdateMinistriesService;
