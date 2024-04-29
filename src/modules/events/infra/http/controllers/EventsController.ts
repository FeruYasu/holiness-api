import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateEventsService from '@modules/events/services/CreateEventsService';
import ListEventsService from '@modules/events/services/ListEventsService';
import { classToClass } from 'class-transformer';

import ShowEventByIdService from '@modules/events/services/ShowEventByIdService';

export default class EventsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listEvent = container.resolve(ListEventsService);

    const events = await listEvent.execute();

    return response.json(classToClass(events));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showEvent = container.resolve(ShowEventByIdService);

    const event = await showEvent.execute(id);

    return response.json(classToClass(event));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      local,
      start_date,
      start_hour,
      end_date,
      end_hour,
    } = request.body;

    const createEvent = container.resolve(CreateEventsService);

    const event = await createEvent.execute({
      name,
      description,
      local,
      start_date,
      start_hour,
      end_date,
      end_hour,
    });

    return response.json(event);
  }
}
