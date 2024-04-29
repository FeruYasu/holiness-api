import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICommentsRepository from '@modules/comments/repositories/ICommentsRepository';
import ISermonsRepository from '../repositories/ISermonsRepository';
import Sermon from '../infra/typeorm/entities/Sermon';

interface IRequest {
  sermonId: string;
  commentId: string;
}

@injectable()
class UpdateSermonsService {
  constructor(
    @inject('SermonsRepository')
    private sermonsRepository: ISermonsRepository,

    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute({
    sermonId,
    commentId,
  }: IRequest): Promise<Sermon | undefined> {
    const sermon = await this.sermonsRepository.findById(sermonId);
    const comment = await this.commentsRepository.findById(commentId);
    const comments = sermon?.comments;

    if (sermon && comment) {
      if (comments) {
        sermon.comments = comments.concat(comment);
        this.sermonsRepository.save(sermon);
      } else {
        sermon.comments = [comment];
        this.sermonsRepository.save(sermon);
      }
    } else {
      throw new AppError('Sermon or Comment not found');
    }

    return sermon;
  }
}

export default UpdateSermonsService;
