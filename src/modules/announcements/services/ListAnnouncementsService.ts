import { injectable, inject } from 'tsyringe';
import IAnnouncementsRepository from '../repositories/IAnnouncementsRepository';

import Announcement from '../infra/typeorm/entities/Announcement';

@injectable()
class ListAnnouncementService {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementRepository: IAnnouncementsRepository,
  ) {}

  public async execute(): Promise<Announcement[]> {
    const announcements = await this.announcementRepository.listAll();

    return announcements;
  }
}

export default ListAnnouncementService;
