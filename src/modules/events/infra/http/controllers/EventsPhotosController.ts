import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AddPhotoToEventService from '@modules/events/services/AddPhotoToEventService';

export default class EventsPhotosController {
  public async update(request: Request, response: Response): Promise<Response> {
    const addEventPhoto = container.resolve(AddPhotoToEventService);
    const { id } = request.params;

    const user = await addEventPhoto.execute({
      event_id: id,
      photoFilename: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}
