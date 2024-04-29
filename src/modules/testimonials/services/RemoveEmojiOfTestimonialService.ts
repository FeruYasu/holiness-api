import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Testimonial from '../infra/typeorm/entities/Testimonial';
import ITestimonialsRepository from '../repositories/ITestimonialsRepository';

interface IRequest {
  testimonialId: string;
  userId: string;
}

type EmojiKeys =
  | 'emoji1'
  | 'emoji2'
  | 'emoji3'
  | 'emoji4'
  | 'emoji5'
  | 'emoji6';

@injectable()
class RemoveEmojiOfTestimonialService {
  constructor(
    @inject('TestimonialsRepository')
    private testimonialsRepository: ITestimonialsRepository,
  ) {}

  public async execute({
    testimonialId,
    userId,
  }: IRequest): Promise<Testimonial> {
    const testimonial = await this.testimonialsRepository.findById(
      testimonialId,
    );

    if (!testimonial) {
      throw new AppError('Testimonial not found');
    }

    for (let key = 1; key <= 6; key += 1) {
      const emojiKey = `emoji${key}` as EmojiKeys;

      const index = testimonial[emojiKey]?.findIndex(value => value === userId);
      if (index !== -1 && testimonial[emojiKey]) {
        testimonial[emojiKey].splice(index, 1);
      }
    }

    const updatedTestimonial = await this.testimonialsRepository.save(
      testimonial,
    );

    return updatedTestimonial;
  }
}

export default RemoveEmojiOfTestimonialService;
