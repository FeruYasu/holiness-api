import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AddPhotoToTestimonialService from '@modules/testimonials/services/AddPhotoToTestimonialService';

export default class TestimonialsPhotosController {
  public async update(request: Request, response: Response): Promise<Response> {
    const addTestimonialPhoto = container.resolve(AddPhotoToTestimonialService);
    const { id } = request.params;

    const user = await addTestimonialPhoto.execute({
      testimonial_id: id,
      photoFilename: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}
