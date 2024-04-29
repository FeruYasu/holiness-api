import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeCommentsRepository from '@modules/comments/repositories/fakes/FakeCommentsRepository';
import FakeTestimonialsRepository from '../repositories/fakes/FakeTestimonialsRepository';

import ListCommentsFromSingleTestimonialService from './ListCommentsFromSingleTestimonialService';

let fakeCommentsRepository: FakeCommentsRepository;
let fakeTestimonialsRepository: FakeTestimonialsRepository;

let fakeUsersRepository: FakeUsersRepository;
let listCommentsFromSingleTestimonial: ListCommentsFromSingleTestimonialService;

describe('List Comments from single testimonial', () => {
  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeTestimonialsRepository = new FakeTestimonialsRepository();

    listCommentsFromSingleTestimonial = new ListCommentsFromSingleTestimonialService(
      fakeTestimonialsRepository,
      fakeCommentsRepository,
    );
  });

  it('should be able to show all Comment from a single testimonial', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const comment = await fakeCommentsRepository.create({
      content: 'Comentário',
      user_id: user.id,
    });

    const comment2 = await fakeCommentsRepository.create({
      content: 'Comentário',
      user_id: user.id,
    });

    const testimonial = await fakeTestimonialsRepository.create({
      title: 'Primeiro aviso',
      content: 'Conteudo do primeiro aviso',
      user_id: user.id,
      ministry_id: 'ministry1',
    });

    testimonial.comments = [comment, comment2];

    const comments = await listCommentsFromSingleTestimonial.execute(
      testimonial.id,
    );

    expect(comments).toMatchObject([comment, comment2]);
  });
});
