import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICommentsRepository from '@modules/comments/repositories/ICommentsRepository';
import ITestimonialsRepository from '../repositories/ITestimonialsRepository';
import Testimonial from '../infra/typeorm/entities/Testimonial';

interface IRequest {
  testimonialId: string;
  commentId: string;
}

@injectable()
class UpdateTestimonialsService {
  constructor(
    @inject('TestimonialsRepository')
    private testimonialsRepository: ITestimonialsRepository,

    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}

  public async execute({
    testimonialId,
    commentId,
  }: IRequest): Promise<Testimonial | undefined> {
    const testimonial = await this.testimonialsRepository.findById(
      testimonialId,
    );

    const comment = await this.commentsRepository.findById(commentId);
    const comments = testimonial?.comments;

    if (testimonial && comment) {
      if (comments) {
        testimonial.comments = comments.concat(comment);
        this.testimonialsRepository.save(testimonial);
      } else {
        testimonial.comments = [comment];
        this.testimonialsRepository.save(testimonial);
      }
    } else {
      throw new AppError('Testimonial or Comment not found');
    }

    return testimonial;
  }
}

export default UpdateTestimonialsService;
