import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Event from '../infra/typeorm/entities/Event';

import IEventsRepository from '../repositories/IEventsRepository';

interface IRequest {
  eventId: string;
  usersIds: string[];
}

@injectable()
class AddParticipantsToEventService {
  constructor(
    @inject('EventsRepository')
    public eventsRepository: IEventsRepository,

    @inject('UsersRepository')
    public usersRepository: IUsersRepository,
  ) {}

  public async execute({
    eventId,
    usersIds,
  }: IRequest): Promise<Event | undefined> {
    const event = await this.eventsRepository.findById(eventId);
    const users = await this.usersRepository.findByIds(usersIds);

    const participants = event?.participants;

    if (event && users) {
      if (participants) {
        event.participants = participants.concat(users);
      } else {
        event.participants = users;
      }

      this.eventsRepository.save(event);
    } else {
      throw new AppError('Users IDs or Event not found');
    }

    return event;
  }
}

export default AddParticipantsToEventService;
