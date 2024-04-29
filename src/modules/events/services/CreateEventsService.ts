import { injectable, inject } from 'tsyringe';

import Event from '../infra/typeorm/entities/Event';

import IEventsRepository from '../repositories/IEventsRepository';
import ICreateEventDTO from '../dtos/ICreateEventDTO';

@injectable()
class CreateEventsService {
  constructor(
    @inject('EventsRepository')
    public eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    name,
    description,
    local,
    start_date,
    start_hour,
    end_date,
    end_hour,
  }: ICreateEventDTO): Promise<Event> {
    const [startDateDay, startDateMonth, startDateYear] = start_date.split('/');
    const [startHour, startMin] = start_hour.split(/h|min/);

    const startDate = new Date(
      Number(startDateYear),
      Number(startDateMonth) - 1,
      Number(startDateDay),
      Number(startHour),
      Number(startMin),
    );

    const [endDateDay, endDateMonth, endDateYear] = end_date.split('/');
    const [endHour, endMin] = end_hour.split(/h|min/);

    const endDate = new Date(
      Number(endDateYear),
      Number(endDateMonth) - 1,
      Number(endDateDay),
      Number(endHour),
      Number(endMin),
    );

    const events = await this.eventsRepository.create({
      name,
      description,
      local,
      start_date: startDate,
      end_date: endDate,
    });

    return events;
  }
}

export default CreateEventsService;
