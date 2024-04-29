import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateTestimonialService from '@modules/testimonials/services/CreateTestimonialService';
import ListTestimonialsService from '@modules/testimonials/services/ListTestimonialsService';
import UpdateTestimonialService from '@modules/testimonials/services/UpdateTestimonialService';

import { classToClass } from 'class-transformer';

export default class TestimonialController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, content, photo, ministry_id } = request.body;
    const { io } = request;

    const user_id = request.user.id;

    const createTestimonial = container.resolve(CreateTestimonialService);

    const ministry = await createTestimonial.execute({
      title,
      content,
      user_id,
      ministry_id,
      photo,
    });

    io.sockets.emit('newTestimonial');

    return response.json(ministry);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listTestimonials = container.resolve(ListTestimonialsService);

    const testimonials = await listTestimonials.execute();

    return response.json(classToClass(testimonials));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, content, ministry_id } = request.body;
    const { id } = request.params;

    const updateTestimonial = container.resolve(UpdateTestimonialService);

    const testimonial = await updateTestimonial.execute({
      testimonialId: id,
      title,
      content,
      ministry_id,
    });

    return response.json(testimonial);
  }
}
