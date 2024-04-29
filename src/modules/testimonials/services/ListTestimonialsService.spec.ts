import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTestimonialsRepository from '@modules/testimonials/repositories/fakes/FakeTestimonialsRepository';
import FakeMinistriesRepository from '@modules/ministries/repositories/fakes/FakeMinistriesRepository';
import ListTestimonialsService from './ListTestimonialsService';

let fakeTestimonialsRepository: FakeTestimonialsRepository;
let listTestimonialsService: ListTestimonialsService;

let fakeUsersRepository: FakeUsersRepository;
let fakeMinistriesRepository: FakeMinistriesRepository;

describe('ListTestimonials', () => {
  beforeEach(() => {
    fakeTestimonialsRepository = new FakeTestimonialsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeMinistriesRepository = new FakeMinistriesRepository();

    listTestimonialsService = new ListTestimonialsService(
      fakeTestimonialsRepository,
    );
  });
  it('should show all testimonials', async () => {
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

    const testimonial1 = await fakeTestimonialsRepository.create({
      title: 'Primeiro aviso',
      content: 'Conteudo do primeiro aviso',
      user_id: user.id,
      ministry_id: ministry1.id,
    });

    const testimonial2 = await fakeTestimonialsRepository.create({
      title: 'Segundo aviso',
      content: 'Conteudo do primeiro aviso',
      user_id: user.id,
      ministry_id: ministry1.id,
    });

    const testimonialList = await listTestimonialsService.execute();

    await expect(testimonialList).toEqual([testimonial1, testimonial2]);
  });
});
