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
class DeleteParticipantsFromEvent {
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

    if (event) {
      usersIds.forEach(userId => {
        const userCheck = event.participants.findIndex(
          participant => participant.id === userId,
        );
        if (userCheck !== -1) {
          event.participants.splice(userCheck, 1);
        }
      });
      this.eventsRepository.save(event);
    } else {
      throw new AppError('Users IDs or Event not found');
    }

    return event;
  }
}

export default DeleteParticipantsFromEvent;
