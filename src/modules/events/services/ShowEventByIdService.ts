import { injectable, inject } from 'tsyringe';
import IEventsRepository from '../repositories/IEventsRepository';
import Event from '../infra/typeorm/entities/Event';

@injectable()
class ShowEventByIdService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(eventId: string): Promise<Event | undefined> {
    const event = this.eventsRepository.findById(eventId);

    return event;
  }
}

export default ShowEventByIdService;
