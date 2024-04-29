import AppError from '@shared/errors/AppError';
import Testimonial from '@modules/testimonials/infra/typeorm/entities/Testimonial';

import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ITestimonialsRepository from '../repositories/ITestimonialsRepository';

interface IRequest {
  testimonial_id: string;
  photoFilename: string;
}

@injectable()
class UpdateTestimonialAvatarService {
  constructor(
    @inject('TestimonialsRepository')
    private testimonialsRepository: ITestimonialsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    testimonial_id,
    photoFilename,
  }: IRequest): Promise<Testimonial> {
    const testimonial = await this.testimonialsRepository.findById(
      testimonial_id,
    );

    if (!testimonial) {
      throw new AppError(
        'Only authenticated testimonials can change photo',
        401,
      );
    }

    if (testimonial.photo) {
      await this.storageProvider.deleteFile(testimonial.photo);
    }

    const filename = await this.storageProvider.saveFile(photoFilename);

    testimonial.photo = filename;

    await this.testimonialsRepository.save(testimonial);

    return testimonial;
  }
}

export default UpdateTestimonialAvatarService;
