import AppError from '@shared/errors/AppError';
import Event from '@modules/events/infra/typeorm/entities/Event';

import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IEventsRepository from '../repositories/IEventsRepository';

interface IRequest {
  event_id: string;
  photoFilename: string;
}

@injectable()
class UpdateEventAvatarService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ event_id, photoFilename }: IRequest): Promise<Event> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Only authenticated events can change photo', 401);
    }

    if (event.photo) {
      await this.storageProvider.deleteFile(event.photo);
    }

    const filename = await this.storageProvider.saveFile(photoFilename);

    event.photo = filename;

    await this.eventsRepository.save(event);

    return event;
  }
}

export default UpdateEventAvatarService;
