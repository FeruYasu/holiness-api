import { injectable, inject } from 'tsyringe';

import Comment from '@modules/comments/infra/typeorm/entities/Comment';
import ICommentsRepository from '../repositories/ICommentsRepository';

interface IRequest {
  content: string;
  user_id: string;
  reply_of?: string;
}

@injectable()
class CreateCommentsService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute({
    content,
    user_id,
    reply_of,
  }: IRequest): Promise<Comment | undefined> {
    let comment;

    if (!reply_of) {
      comment = await this.commentsRepository.create({
        content,
        user_id,
      });
    } else {
      comment = await this.commentsRepository.findById(reply_of);

      const replies = comment?.replies;

      const reply = await this.commentsRepository.create({
        content,
        user_id,
      });

      if (comment) {
        if (replies) {
          comment.replies = replies.concat(reply);
        } else {
          comment.replies = [reply];
        }
        this.commentsRepository.save(comment);
      }
    }

    return comment;
  }
}

export default CreateCommentsService;
