import { uuid } from 'uuidv4';

import ITestimonialsRepository from '@modules/testimonials/repositories/ITestimonialsRepository';

import Testimonial from '../../infra/typeorm/entities/Testimonial';
import ICreateTestimonialDTO from '../../dtos/ICreateTestimonialDTO';

class TestimonialsRepository implements ITestimonialsRepository {
  private testimonials: Testimonial[] = [];

  public async create({
    title,
    content,
    user_id,
    ministry_id,
    photo,
  }: ICreateTestimonialDTO): Promise<Testimonial> {
    const testimonial = new Testimonial();

    Object.assign(testimonial, {
      id: uuid(),
      title,
      content,
      user_id,
      ministry_id,
      photo,
    });

    this.testimonials.push(testimonial);

    return testimonial;
  }

  public async save(testimonial: Testimonial): Promise<Testimonial> {
    const findIndex = this.testimonials.findIndex(
      findTestimonial => findTestimonial.id === testimonial.id,
    );

    this.testimonials[findIndex] = testimonial;
    return testimonial;
  }

  public async listAll(): Promise<Testimonial[]> {
    return this.testimonials;
  }

  public async findById(id: string): Promise<Testimonial | undefined> {
    const findTestimonial = this.testimonials.find(
      testimonial => testimonial.id === id,
    );

    return findTestimonial;
  }
}

export default TestimonialsRepository;
