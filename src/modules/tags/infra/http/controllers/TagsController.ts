import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateTagsService from '@modules/tags/services/CreateTagService';
import ListTagsService from '@modules/tags/services/ListTagsService';

export default class TagsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTags = container.resolve(ListTagsService);

    const tags = await listTags.execute();

    return response.json(tags);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createTag = container.resolve(CreateTagsService);

    const tag = await createTag.execute({
      name,
    });

    return response.json(tag);
  }
}
