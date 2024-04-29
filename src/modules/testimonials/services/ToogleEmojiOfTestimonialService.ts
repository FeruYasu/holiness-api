import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Testimonial from '../infra/typeorm/entities/Testimonial';
import ITestimonialsRepository from '../repositories/ITestimonialsRepository';

interface IRequest {
  testimonialId: string;
  emoji: number;
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
class ToogleEmojiOfTestimonialService {
  constructor(
    @inject('TestimonialsRepository')
    private testimonialsRepository: ITestimonialsRepository,
  ) {}

  public async execute({
    testimonialId,
    emoji,
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

    const newKey = `emoji${emoji}` as EmojiKeys;
    if (testimonial[newKey]) {
      testimonial[newKey].push(userId);
    }

    const updateTestimonial = await this.testimonialsRepository.save(
      testimonial,
    );

    return updateTestimonial;
  }
}

export default ToogleEmojiOfTestimonialService;
