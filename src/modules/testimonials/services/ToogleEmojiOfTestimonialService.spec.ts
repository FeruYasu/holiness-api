import FakeTestimonialsRepository from '../repositories/fakes/FakeTestimonialsRepository';
import ToogleEmojiOfTestimonialService from './ToogleEmojiOfTestimonialService';

let fakeTestimonialsRepository: FakeTestimonialsRepository;
let toogleEmojiOfTestimonialService: ToogleEmojiOfTestimonialService;

describe('Toogle Testimonial emoji', () => {
  beforeEach(() => {
    fakeTestimonialsRepository = new FakeTestimonialsRepository();

    toogleEmojiOfTestimonialService = new ToogleEmojiOfTestimonialService(
      fakeTestimonialsRepository,
    );
  });

  it('should be able to update an Testimonial', async () => {
    const testimonial = await fakeTestimonialsRepository.create({
      title: 'Primeiro aviso',
      content: 'Conteudo do primeiro aviso',
      user_id: 'user.id',
      ministry_id: 'ministry1.id',
    });

    testimonial.emoji1 = [];

    await toogleEmojiOfTestimonialService.execute({
      testimonialId: testimonial.id,
      emoji: 1,
      userId: 'user1.id',
    });

    const updatedTestimonial = await toogleEmojiOfTestimonialService.execute({
      testimonialId: testimonial.id,
      emoji: 1,
      userId: 'user2.id',
    });

    await expect(updatedTestimonial.emoji1).toMatchObject([
      'user1.id',
      'user2.id',
    ]);
  });
});
