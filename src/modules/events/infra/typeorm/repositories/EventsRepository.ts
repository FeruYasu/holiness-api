import { getRepository, Repository } from 'typeorm';

import IEventsRepository from '@modules/events/repositories/IEventsRepository';

import Event from '../entities/Event';

interface IRequest {
  name: string;
  local: string;
  description: string;
  start_date: Date;
  end_date: Date;
}

class EventsRepository implements IEventsRepository {
  private ormRepository: Repository<Event>;

  constructor() {
    this.ormRepository = getRepository(Event);
  }

  public async create({
    name,
    description,
    local,
    start_date,
    end_date,
  }: IRequest): Promise<Event> {
    const event = this.ormRepository.create({
      name,
      description,
      local,
      start_date,
      end_date,
    });

    await this.ormRepository.save(event);

    return event;
  }

  public async save(event: Event): Promise<Event> {
    return this.ormRepository.save(event);
  }

  public async findById(id: string): Promise<Event | undefined> {
    return this.ormRepository.findOne(id, { relations: ['participants'] });
  }

  public async listAll(): Promise<Event[] | undefined> {
    const events = this.ormRepository.find({
      relations: ['ministries', 'participants'],
    });

    return events;
  }
}

export default EventsRepository;
