import { uuid } from 'uuidv4';

import IEventRepository from '@modules/events/repositories/IEventsRepository';

import Event from '../../infra/typeorm/entities/Event';

interface IRequest {
  name: string;
  local: string;
  description: string;
  start_date: Date;
  end_date: Date;
}

class EventRepository implements IEventRepository {
  private events: Event[] = [];

  public async create({
    name,
    description,
    local,
    start_date,
    end_date,
  }: IRequest): Promise<Event> {
    const event = new Event();

    Object.assign(event, {
      id: uuid(),
      name,
      description,
      local,
      start_date,
      end_date,
    });

    this.events.push(event);

    return event;
  }

  public async save(event: Event): Promise<Event> {
    const findIndex = this.events.findIndex(
      findEvent => findEvent.id === event.id,
    );

    this.events[findIndex] = event;
    return event;
  }

  public async findById(id: string): Promise<Event | undefined> {
    const event = this.events.find(e => e.id === id);

    return event;
  }

  public async listAll(): Promise<Event[] | undefined> {
    const { events } = this;

    return events;
  }
}

export default EventRepository;
