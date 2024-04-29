import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateAnnouncementService from '@modules/announcements/services/CreateAnnouncementService';
import ListAnnouncementService from '@modules/announcements/services/ListAnnouncementsService';
import { classToClass } from 'class-transformer';

export default class AnnouncementController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      title,
      content,
      image,
      video,
      link,
      event_id,
      ministry_id,
    } = request.body;

    const user_id = request.user.id;

    const createAnnouncement = container.resolve(CreateAnnouncementService);

    const ministry = await createAnnouncement.execute({
      title,
      content,
      user_id,
      ministry_id,
      image,
      video,
      link,
      event_id,
    });

    return response.json(ministry);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAnnouncements = container.resolve(ListAnnouncementService);

    const announcements = await listAnnouncements.execute();

    return response.json(classToClass(announcements));
  }
}
