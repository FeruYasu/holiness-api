import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeCommentsRepository from '@modules/comments/repositories/fakes/FakeCommentsRepository';
import FakeTestimonialsRepository from '../repositories/fakes/FakeTestimonialsRepository';
import UpdateTestimonialsCommentsService from './UpdateTestimonialsCommentsService';

let fakeTestimonialsRepository: FakeTestimonialsRepository;
let fakeCommentsRepository: FakeCommentsRepository;

let fakeUsersRepository: FakeUsersRepository;
let updateTestimonialsComments: UpdateTestimonialsCommentsService;

describe('CreateTestimonials', () => {
  beforeEach(() => {
    fakeTestimonialsRepository = new FakeTestimonialsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCommentsRepository = new FakeCommentsRepository();

    updateTestimonialsComments = new UpdateTestimonialsCommentsService(
      fakeTestimonialsRepository,
      fakeCommentsRepository,
    );
  });

  it('should be able to add Comments to Testimonial', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const testimonial = await fakeTestimonialsRepository.create({
      title: 'Primeiro aviso',
      content: 'Conteudo do primeiro aviso',
      user_id: user.id,
      ministry_id: 'ministry1',
    });

    const comment = await fakeCommentsRepository.create({
      content: 'Comment 1',
      user_id: user.id,
    });

    await updateTestimonialsComments.execute({
      testimonialId: testimonial.id,
      commentId: comment.id,
    });

    await expect(testimonial.comments).toEqual([comment]);
  });
});
