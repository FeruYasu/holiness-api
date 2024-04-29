import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeEventsRepository from '../repositories/fakes/FakeEventsRepository';
import AddPhotoToEventService from './AddPhotoToEventService';

let fakeEventsRepository: FakeEventsRepository;
let fakeStorageProvider: FakeStorageProvider;
let addEventPhoto: AddPhotoToEventService;

describe('CreateEvent', () => {
  beforeEach(() => {
    fakeEventsRepository = new FakeEventsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    addEventPhoto = new AddPhotoToEventService(
      fakeEventsRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to update event photo', async () => {
    const event = await fakeEventsRepository.create({
      name: 'Primeiro Evento',
      local: 'Igreja Holiness',
      description: 'Primiero evento Teste',
      start_date: new Date(),
      end_date: new Date(),
    });

    await addEventPhoto.execute({
      event_id: event.id,
      photoFilename: 'photo.jpg',
    });

    expect(event.photo).toBe('photo.jpg');
  });

  it('should not be able to update photo from nonexistent event', async () => {
    await expect(
      addEventPhoto.execute({
        event_id: 'nonexistent-event',
        photoFilename: 'photo.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old photo when update', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const event = await fakeEventsRepository.create({
      name: 'Primeiro Evento',
      local: 'Igreja Holiness',
      description: 'Primiero evento Teste',
      start_date: new Date(),
      end_date: new Date(),
    });

    await addEventPhoto.execute({
      event_id: event.id,
      photoFilename: 'photo.jpg',
    });

    await addEventPhoto.execute({
      event_id: event.id,
      photoFilename: 'photo2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('photo.jpg');

    expect(event.photo).toBe('photo2.jpg');
  });
});
