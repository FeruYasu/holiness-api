import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeTestimonialsRepository from '../repositories/fakes/FakeTestimonialsRepository';
import AddPhotoToTestimonialService from './AddPhotoToTestimonialService';

let fakeTestimonialsRepository: FakeTestimonialsRepository;
let fakeStorageProvider: FakeStorageProvider;
let addTestimonialPhoto: AddPhotoToTestimonialService;

describe('CreateTestimonial', () => {
  beforeEach(() => {
    fakeTestimonialsRepository = new FakeTestimonialsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    addTestimonialPhoto = new AddPhotoToTestimonialService(
      fakeTestimonialsRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to update testimonial photo', async () => {
    const testimonial = await fakeTestimonialsRepository.create({
      title: 'Primeiro aviso',
      content: 'Conteudo do primeiro aviso',
      user_id: 'user.id',
      ministry_id: 'ministry.id',
    });

    await addTestimonialPhoto.execute({
      testimonial_id: testimonial.id,
      photoFilename: 'photo.jpg',
    });

    expect(testimonial.photo).toBe('photo.jpg');
  });

  it('should not be able to update photo from nonexistent testimonial', async () => {
    await expect(
      addTestimonialPhoto.execute({
        testimonial_id: 'nonexistent-testimonial',
        photoFilename: 'photo.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old photo when update', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const testimonial = await fakeTestimonialsRepository.create({
      title: 'Primeiro aviso',
      content: 'Conteudo do primeiro aviso',
      user_id: 'user.id',
      ministry_id: 'ministry.id',
    });

    await addTestimonialPhoto.execute({
      testimonial_id: testimonial.id,
      photoFilename: 'photo.jpg',
    });

    await addTestimonialPhoto.execute({
      testimonial_id: testimonial.id,
      photoFilename: 'photo2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('photo.jpg');

    expect(testimonial.photo).toBe('photo2.jpg');
  });
});
