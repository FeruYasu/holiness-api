import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMinistrieRepository from '../repositories/IMinistriesRepository';
import Ministry from '../infra/typeorm/entities/Ministry';

interface IRequest {
  ministryId: string;
  membersIds: string[];
}

@injectable()
class AddMembersToMinistriesService {
  constructor(
    @inject('MinistriesRepository')
    private ministriesRepository: IMinistrieRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    ministryId,
    membersIds,
  }: IRequest): Promise<Ministry | undefined> {
    const ministry = await this.ministriesRepository.findById(ministryId);
    const users = await this.usersRepository.findByIds(membersIds);
    const members = ministry?.members;

    if (ministry && users) {
      if (members) {
        ministry.members = members.concat(users);
      } else {
        ministry.members = users;
      }
      this.ministriesRepository.save(ministry);
    } else {
      throw new AppError('User ID or Ministry not found');
    }

    return ministry;
  }
}

export default AddMembersToMinistriesService;
