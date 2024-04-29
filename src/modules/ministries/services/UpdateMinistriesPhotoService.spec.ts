import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeMinistriesRepository from '../repositories/fakes/FakeMinistriesRepository';
import UpdateMinistriesPhotoService from './UpdateMinistriesPhotoService';

let fakeMinistriesRepository: FakeMinistriesRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateMinistriesPhoto: UpdateMinistriesPhotoService;

describe('UpdateMinistriesPhotoService', () => {
  beforeEach(() => {
    fakeMinistriesRepository = new FakeMinistriesRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateMinistriesPhoto = new UpdateMinistriesPhotoService(
      fakeMinistriesRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to update ministry avatar', async () => {
    const ministry = await fakeMinistriesRepository.create({
      name: 'Ministerio',
    });

    await updateMinistriesPhoto.execute({
      ministryId: ministry.id,
      photoFileName: 'photo.jpg',
    });

    expect(ministry.photo).toBe('photo.jpg');
  });

  it('should not be able to update avatar from nonexistent user', async () => {
    await expect(
      updateMinistriesPhoto.execute({
        ministryId: 'non-existinguser',
        photoFileName: 'photo.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when update', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const ministry = await fakeMinistriesRepository.create({
      name: 'Ministerio',
    });

    await updateMinistriesPhoto.execute({
      ministryId: ministry.id,
      photoFileName: 'photo.jpg',
    });

    await updateMinistriesPhoto.execute({
      ministryId: ministry.id,
      photoFileName: 'photo2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('photo.jpg');

    expect(ministry.photo).toBe('photo2.jpg');
  });
});
