import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMinistriesRepository from '@modules/ministries/repositories/fakes/FakeMinistriesRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import CreateTestimonialService from './CreateTestimonialService';
import FakeTestimonialRepository from '../repositories/fakes/FakeTestimonialsRepository';

let createTestimonialService: CreateTestimonialService;
let fakeTestimonialsRepository: FakeTestimonialRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeMinistriesRepository: FakeMinistriesRepository;
let fakeStorageProvider: FakeStorageProvider;

describe('CreateTestimonial', () => {
  beforeEach(() => {
    fakeTestimonialsRepository = new FakeTestimonialRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeMinistriesRepository = new FakeMinistriesRepository();
    fakeStorageProvider = new FakeStorageProvider();

    createTestimonialService = new CreateTestimonialService(
      fakeTestimonialsRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to create an testimonial', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const ministry1 = await fakeMinistriesRepository.create({
      name: 'Ministry1',
      leaders: [user],
    });

    const testimonial = await createTestimonialService.execute({
      title: 'Primeiro aviso',
      content: 'Conteudo do primeiro aviso',
      user_id: user.id,
      ministry_id: ministry1.id,
    });

    await expect(testimonial).toHaveProperty('id');
  });
});
