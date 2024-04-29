import { Repository, getRepository } from 'typeorm';
import IAnnouncementRepository from '@modules/announcements/repositories/IAnnouncementsRepository';
import Announcement from '../entities/Announcement';
import ICreateAnnouncementDTO from '../../../dtos/ICreateAnnouncementDTO';

class AnnouncementsRepository implements IAnnouncementRepository {
  private ormRepository: Repository<Announcement>;

  constructor() {
    this.ormRepository = getRepository(Announcement);
  }

  public async save(announcement: Announcement): Promise<Announcement> {
    return this.ormRepository.save(announcement);
  }

  public async create({
    title,
    content,
    user_id,
    ministry_id,
    image,
    video,
    link,
    event_id,
  }: ICreateAnnouncementDTO): Promise<Announcement> {
    const announcement = this.ormRepository.create({
      title,
      content,
      user_id,
      ministry_id,
      image,
      video,
      link,
      event_id,
    });

    await this.ormRepository.save(announcement);

    return announcement;
  }

  public async listAll(): Promise<Announcement[]> {
    const announcements = await this.ormRepository.find({
      relations: ['user', 'ministry'],
    });

    return announcements;
  }
}

export default AnnouncementsRepository;
