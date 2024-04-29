import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateMinistriesService from '@modules/ministries/services/CreateMinistriesService';
import UpdateMinistriesService from '@modules/ministries/services/UpdateMinistriesService';
import ListMinistriesService from '@modules/ministries/services/ListMinistriesService';
import ListMinistryByIdService from '@modules/ministries/services/ListMinistryByIdService';

import { classToClass } from 'class-transformer';

export default class MinistriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listMinistries = container.resolve(ListMinistriesService);

    const allMinistries = await listMinistries.execute();

    return response.json(classToClass(allMinistries));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listMinistryById = container.resolve(ListMinistryByIdService);

    const ministry = await listMinistryById.execute(id);

    return response.json(classToClass(ministry));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, leadersIds } = request.body;

    const createMinistry = container.resolve(CreateMinistriesService);

    const ministry = await createMinistry.execute({ name, leadersIds });

    return response.json(ministry);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, local, date, hour, description } = request.body;

    const UpdateMinistriy = container.resolve(UpdateMinistriesService);

    const ministry = await UpdateMinistriy.execute({
      name,
      local,
      date,
      hour,
      description,
    });

    return response.json(ministry);
  }
}
