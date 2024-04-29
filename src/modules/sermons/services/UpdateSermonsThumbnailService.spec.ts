import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeSermonsRepository from '../repositories/fakes/FakeSermonsRepository';
import UpdateSermonsThumbnailService from './UpdateSermonsThumbnailService';

let fakeSermonRepository: FakeSermonsRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateSermonThumbnail: UpdateSermonsThumbnailService;

describe('CreateSermon', () => {
  beforeEach(() => {
    fakeSermonRepository = new FakeSermonsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateSermonThumbnail = new UpdateSermonsThumbnailService(
      fakeSermonRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to update sermon thumbnail', async () => {
    const sermon = await fakeSermonRepository.create({
      title: 'Primeira pregação',
      preacher_id: 'user',
      description: 'Pregação do teste',
      video_url: 'url_video.mp4',
    });

    await updateSermonThumbnail.execute({
      sermonId: sermon.id,
      thumbnailFileName: 'thumbnail.jpg',
    });

    await expect(sermon.thumbnail).toBe('thumbnail.jpg');
  });

  it('should not be able to update thumbnail from nonexistent sermon', async () => {
    await expect(
      updateSermonThumbnail.execute({
        sermonId: 'nonexistent-sermon',
        thumbnailFileName: 'thumbnail.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old thumbnail when update', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const sermon = await fakeSermonRepository.create({
      title: 'Primeira pregação',
      preacher_id: 'user',
      description: 'Pregação do teste',
      video_url: 'url_video.mp4',
    });

    await updateSermonThumbnail.execute({
      sermonId: sermon.id,
      thumbnailFileName: 'thumbnail.jpg',
    });

    await updateSermonThumbnail.execute({
      sermonId: sermon.id,
      thumbnailFileName: 'thumbnail2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('thumbnail.jpg');

    expect(sermon.thumbnail).toBe('thumbnail2.jpg');
  });
});
