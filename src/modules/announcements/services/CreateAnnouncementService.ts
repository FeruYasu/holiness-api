import { injectable, inject } from 'tsyringe';
import IAnnouncementsRepository from '../repositories/IAnnouncementsRepository';

import ICreateAnnouncementDTO from '../dtos/ICreateAnnouncementDTO';
import Announcement from '../infra/typeorm/entities/Announcement';

@injectable()
class CreateAnnouncementService {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementRepository: IAnnouncementsRepository,
  ) {}

  public async execute(data: ICreateAnnouncementDTO): Promise<Announcement> {
    const announcement = await this.announcementRepository.create(data);

    return announcement;
  }
}

export default CreateAnnouncementService;
