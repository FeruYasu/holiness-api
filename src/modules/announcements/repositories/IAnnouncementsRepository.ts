import Announcement from '../infra/typeorm/entities/Announcement';

interface IRequest {
  title: string;
  content: string;
  user_id: string;
  image?: string;
  video?: string;
  link?: string;
  event_id?: string;
}

export default interface IAnnouncementsRepository {
  save(data: Announcement): Promise<Announcement>;
  create(data: IRequest): Promise<Announcement>;
  listAll(): Promise<Announcement[]>;
}
