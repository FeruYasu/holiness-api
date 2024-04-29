import { injectable, inject } from 'tsyringe';
import ICommentsRepository from '@modules/comments/repositories/ICommentsRepository';

import Comment from '@modules/comments/infra/typeorm/entities/Comment';
import ISermonsRepository from '../repositories/ISermonsRepository';

@injectable()
class ListCommentsFromSingleSermonService {
  constructor(
    @inject('SermonsRepository')
    private sermonsRepository: ISermonsRepository,

    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute(sermonId: string): Promise<Comment[] | undefined> {
    const sermon = await this.sermonsRepository.findById(sermonId);
    const commentsIds = sermon?.comments.map(comment => comment.id);
    let comments;

    if (commentsIds) {
      comments = await this.commentsRepository.findByIds(commentsIds);
    }

    return comments;
  }
}

export default ListCommentsFromSingleSermonService;
