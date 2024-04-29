import { inject, injectable } from 'tsyringe';
import Comment from '@modules/comments/infra/typeorm/entities/Comment';

import ICommentsRepository from '../repositories/ICommentsRepository';

@injectable()
class ListCommentByIdService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute(ids: string[]): Promise<Comment[] | undefined> {
    const comment = await this.commentsRepository.findByIds(ids);

    return comment;
  }
}

export default ListCommentByIdService;
