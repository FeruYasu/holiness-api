import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdateTestimonialsCommentsService from '@modules/testimonials/services/UpdateTestimonialsCommentsService';
import ListCommentsFromSingleTestimonialService from '@modules/testimonials/services/ListCommentsFromSingleTestimonialService';

import { classToClass } from 'class-transformer';

export default class TestimonialsCommentsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { testimonialId, commentId } = request.body;
    const { io } = request;

    const updateTestimonialComments = container.resolve(
      UpdateTestimonialsCommentsService,
    );

    const testimonial = await updateTestimonialComments.execute({
      testimonialId,
      commentId,
    });

    io.sockets.emit('newTestimonialComment');

    return response.json(classToClass(testimonial));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { testimonialId } = request.params;

    const listCommentsFromSingleTestimonial = container.resolve(
      ListCommentsFromSingleTestimonialService,
    );

    const comments = await listCommentsFromSingleTestimonial.execute(
      testimonialId,
    );

    return response.json(classToClass(comments));
  }
}
