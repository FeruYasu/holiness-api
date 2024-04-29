import { injectable, inject } from 'tsyringe';

import IEventsRepository from '../repositories/IEventsRepository';
import Event from '../infra/typeorm/entities/Event';

@injectable()
class ListEventsService {
  constructor(
    @inject('EventsRepository')
    public eventsRepository: IEventsRepository,
  ) {}

  public async execute(): Promise<Event[] | undefined> {
    const events = this.eventsRepository.listAll();

    return events;
  }
}

export default ListEventsService;
