import { injectable, inject } from 'tsyringe';

import IMinistrieRepository from '@modules/ministries/repositories/IMinistriesRepository';
import Event from '../infra/typeorm/entities/Event';

import IEventsRepository from '../repositories/IEventsRepository';

interface IRequest {
  eventId: string;
  ministriesIds: string[];
}

@injectable()
class AddMinistriesToEventService {
  constructor(
    @inject('EventsRepository')
    public eventsRepository: IEventsRepository,

    @inject('MinistriesRepository')
    public ministriesRepository: IMinistrieRepository,
  ) {}

  public async execute({
    eventId,
    ministriesIds,
  }: IRequest): Promise<Event | undefined> {
    const event = await this.eventsRepository.findById(eventId);
    const ministries = await this.ministriesRepository.findByIds(ministriesIds);

    if (event && ministries) {
      event.ministries = ministries;

      this.eventsRepository.save(event);
    }

    return event;
  }
}

export default AddMinistriesToEventService;
