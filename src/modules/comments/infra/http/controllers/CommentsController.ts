import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateCommentService from '@modules/comments/services/CreateCommentsService';

export default class CommentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { content, reply_of } = request.body;

    const user_id = request.user.id;

    const createComment = container.resolve(CreateCommentService);

    const comment = await createComment.execute({
      content,
      user_id,
      reply_of,
    });

    return response.json(comment);
  }
}
