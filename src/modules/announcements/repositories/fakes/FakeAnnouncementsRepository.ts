import { uuid } from 'uuidv4';

import IAnnouncementsRepository from '@modules/announcements/repositories/IAnnouncementsRepository';

import Announcement from '../../infra/typeorm/entities/Announcement';

interface IRequest {
  title: string;
  content: string;
  user_id: string;
  ministry_id: string;
  image?: string;
  video?: string;
  link?: string;
  event_id?: string;
}

class AnnouncementsRepository implements IAnnouncementsRepository {
  private announcements: Announcement[] = [];

  public async create({
    title,
    content,
    user_id,
    ministry_id,
    image,
    video,
    link,
    event_id,
  }: IRequest): Promise<Announcement> {
    const announcement = new Announcement();

    Object.assign(announcement, {
      id: uuid(),
      title,
      content,
      user_id,
      ministry_id,
      image,
      video,
      link,
      event_id,
    });

    this.announcements.push(announcement);

    return announcement;
  }

  public async save(announcement: Announcement): Promise<Announcement> {
    const findIndex = this.announcements.findIndex(
      findAnnouncement => findAnnouncement.id === announcement.id,
    );

    this.announcements[findIndex] = announcement;
    return announcement;
  }

  public async listAll(): Promise<Announcement[]> {
    return this.announcements;
  }
}

export default AnnouncementsRepository;
