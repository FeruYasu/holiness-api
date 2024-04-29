import FakeTestimonialsRepository from '../repositories/fakes/FakeTestimonialsRepository';
import UpdateTestimonialService from './UpdateTestimonialService';

let fakeTestimonialsRepository: FakeTestimonialsRepository;
let updateTestimonialService: UpdateTestimonialService;

describe('Update Testimonial', () => {
  beforeEach(() => {
    fakeTestimonialsRepository = new FakeTestimonialsRepository();

    updateTestimonialService = new UpdateTestimonialService(
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

    const updatedTestimonial = await updateTestimonialService.execute({
      testimonialId: testimonial.id,
      title: 'Primeiro testemunho',
      content: 'Conteudo do primeiro testemunho',
      ministry_id: 'ministry2.id',
    });

    await expect(updatedTestimonial.title).toBe('Primeiro testemunho');
    await expect(updatedTestimonial.content).toBe(
      'Conteudo do primeiro testemunho',
    );
    await expect(updatedTestimonial.ministry_id).toBe('ministry2.id');
  });
});
