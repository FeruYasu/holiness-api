import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IMinistrieRepository from '../repositories/IMinistriesRepository';
import Ministry from '../infra/typeorm/entities/Ministry';

interface IRequest {
  ministryId: string;
  membersIds: string[];
}

@injectable()
class DeleteMembersOfMinistriesService {
  constructor(
    @inject('MinistriesRepository')
    private ministriesRepository: IMinistrieRepository,
  ) {}

  public async execute({
    ministryId,
    membersIds,
  }: IRequest): Promise<Ministry | undefined> {
    const ministry = await this.ministriesRepository.findById(ministryId);

    if (ministry) {
      membersIds.forEach(memberId => {
        const membercheck = ministry.members.findIndex(
          member => member.id === memberId,
        );
        if (membercheck !== -1) {
          ministry.members.splice(membercheck, 1);
        }
      });
      this.ministriesRepository.save(ministry);
    } else {
      throw new AppError('User ID or Ministry not found');
    }

    return ministry;
  }
}

export default DeleteMembersOfMinistriesService;
