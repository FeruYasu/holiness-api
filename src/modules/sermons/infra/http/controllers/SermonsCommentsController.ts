import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdateSermonsCommentsService from '@modules/sermons/services/UpdateSermonsCommentsService';
import ListCommentsFromSingleSermonService from '@modules/sermons/services/ListCommentsFromSingleSermonService';

import { classToClass } from 'class-transformer';

export default class SermonsCommentsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { sermonId, commentId } = request.body;

    const updateSermonComments = container.resolve(
      UpdateSermonsCommentsService,
    );

    const sermon = await updateSermonComments.execute({
      sermonId,
      commentId,
    });

    return response.json(classToClass(sermon));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { sermonId } = request.params;

    const listCommentsFromSingleSermon = container.resolve(
      ListCommentsFromSingleSermonService,
    );

    const comments = await listCommentsFromSingleSermon.execute(sermonId);

    return response.json(classToClass(comments));
  }
}
