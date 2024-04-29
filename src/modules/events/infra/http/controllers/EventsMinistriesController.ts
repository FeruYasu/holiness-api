import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AddMinistriesToEventService from '@modules/events/services/AddMinistriesToEventService';

export default class EventsMinistriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { eventId, ministriesIds } = request.body;

    const addMinistries = container.resolve(AddMinistriesToEventService);

    const event = await addMinistries.execute({
      eventId,
      ministriesIds,
    });

    return response.json(event);
  }
}
