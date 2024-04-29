import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ToogleEmojiOfTestimonialService from '@modules/testimonials/services/ToogleEmojiOfTestimonialService';
import RemoveEmojiOfTestimonialService from '@modules/testimonials/services/RemoveEmojiOfTestimonialService';

export default class TestimonialController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { emoji } = request.body;
    const { io } = request;

    const userId = request.user.id;

    const { id } = request.params;

    const toogleEmoji = container.resolve(ToogleEmojiOfTestimonialService);

    const testimonial = await toogleEmoji.execute({
      testimonialId: id,
      emoji,
      userId,
    });

    io.sockets.emit('emojiChange', { emoji, id, userId });

    return response.json(testimonial);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const userId = request.user.id;

    const { id } = request.params;

    const removeEmoji = container.resolve(RemoveEmojiOfTestimonialService);

    const testimonial = await removeEmoji.execute({
      testimonialId: id,
      userId,
    });

    return response.json(testimonial);
  }
}
