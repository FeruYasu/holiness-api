import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Ministry from '@modules/ministries/infra/typeorm/entities/Ministry';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMinistriesRepository from '../repositories/IMinistriesRepository';

interface IRequest {
  name: string;
  local?: string;
  date?: Date;
  hour?: Date;
  leadersIds: string[];
  membersIds?: string[];
}

@injectable()
class CreateMinistriesService {
  constructor(
    @inject('MinistriesRepository')
    private ministriesRepository: IMinistriesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    leadersIds,
    local,
    date,
    hour,
  }: IRequest): Promise<Ministry> {
    const checkMinistriesExists = await this.ministriesRepository.findByName(
      name,
    );

    if (checkMinistriesExists) {
      throw new AppError('Ministries already used.');
    }

    const leaders = await this.usersRepository.findByIds(leadersIds);

    const ministries = await this.ministriesRepository.create({
      name,
      local,
      date,
      hour,
      leaders,
    });

    return ministries;
  }
}

export default CreateMinistriesService;
