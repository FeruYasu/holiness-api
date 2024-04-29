import { injectable, inject } from 'tsyringe';
import ICommentsRepository from '@modules/comments/repositories/ICommentsRepository';

import Comment from '@modules/comments/infra/typeorm/entities/Comment';
import ITestimonialsRepository from '../repositories/ITestimonialsRepository';

@injectable()
class ListCommentsFromSingleTestimonialService {
  constructor(
    @inject('TestimonialsRepository')
    private testimonialsRepository: ITestimonialsRepository,

    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute(testimonialId: string): Promise<Comment[] | undefined> {
    const testimonial = await this.testimonialsRepository.findById(
      testimonialId,
    );

    const commentsIds = testimonial?.comments.map(comment => comment.id);
    let comments;

    if (commentsIds) {
      comments = await this.commentsRepository.findByIds(commentsIds);
    }

    return comments;
  }
}

export default ListCommentsFromSingleTestimonialService;
