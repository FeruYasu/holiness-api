import Testimonial from '../infra/typeorm/entities/Testimonial';
import ICreateAnnouncementDTO from '../dtos/ICreateTestimonialDTO';

export default interface ITestimonialsRepository {
  create(data: ICreateAnnouncementDTO): Promise<Testimonial>;
  save(data: Testimonial): Promise<Testimonial>;
  findById(id: string): Promise<Testimonial | undefined>;
  listAll(): Promise<Testimonial[]>;
}
