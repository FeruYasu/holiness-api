import { injectable, inject } from 'tsyringe';
import ITestimonialsRepository from '../repositories/ITestimonialsRepository';

import Testimonial from '../infra/typeorm/entities/Testimonial';

@injectable()
class ListTestimonialService {
  constructor(
    @inject('TestimonialsRepository')
    private testimonialRepository: ITestimonialsRepository,
  ) {}

  public async execute(): Promise<Testimonial[]> {
    const testimonials = await this.testimonialRepository.listAll();

    return testimonials;
  }
}

export default ListTestimonialService;
