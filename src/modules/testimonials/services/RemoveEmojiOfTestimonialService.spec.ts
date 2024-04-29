import FakeTestimonialsRepository from '../repositories/fakes/FakeTestimonialsRepository';
import RemoveEmojiOfTestimonialService from './RemoveEmojiOfTestimonialService';

let fakeTestimonialsRepository: FakeTestimonialsRepository;
let removeEmojiOfTestimonialService: RemoveEmojiOfTestimonialService;

describe('Remove Testimonial emoji', () => {
  beforeEach(() => {
    fakeTestimonialsRepository = new FakeTestimonialsRepository();

    removeEmojiOfTestimonialService = new RemoveEmojiOfTestimonialService(
      fakeTestimonialsRepository,
    );
  });

  it('should be able to remove an emoji from Testimonial', async () => {
    const testimonial = await fakeTestimonialsRepository.create({
      title: 'Primeiro aviso',
      content: 'Conteudo do primeiro aviso',
      user_id: 'user.id',
      ministry_id: 'ministry1.id',
    });

    testimonial.emoji1 = ['user.id'];

    const updatedTestimonial = await removeEmojiOfTestimonialService.execute({
      testimonialId: testimonial.id,
      userId: 'user.id',
    });

    await expect(updatedTestimonial.emoji1).toMatchObject([]);
  });
});
