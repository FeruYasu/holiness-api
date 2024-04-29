import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITestimonialsRepository from '../repositories/ITestimonialsRepository';

import Testimonial from '../infra/typeorm/entities/Testimonial';

interface IRequest {
  testimonialId: string;
  title?: string;
  content?: string;
  photo?: string;
  ministry_id?: string;
  emoji1?: string[];
  emoji2?: string[];
  emoji3?: string[];
  emoji4?: string[];
  emoji5?: string[];
  emoji6?: string[];
}

@injectable()
class UpdateTestimonialService {
  constructor(
    @inject('TestimonialsRepository')
    private testimonialsRepository: ITestimonialsRepository,
  ) {}

  public async execute({
    testimonialId,
    title,
    content,
    ministry_id,
  }: IRequest): Promise<Testimonial> {
    const testimonial = await this.testimonialsRepository.findById(
      testimonialId,
    );

    if (!testimonial) {
      throw new AppError('User not found');
    }

    if (title) {
      testimonial.title = title;
    }

    if (content) {
      testimonial.content = content;
    }

    if (ministry_id) {
      testimonial.ministry_id = ministry_id;
    }

    const updatedTestimonial = await this.testimonialsRepository.save(
      testimonial,
    );

    return updatedTestimonial;
  }
}

export default UpdateTestimonialService;
