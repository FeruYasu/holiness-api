import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import ISermonsRepository from '../repositories/ISermonsRepository';
import Sermon from '../infra/typeorm/entities/Sermon';

interface IRequest {
  sermonId: string;
  thumbnailFileName: string;
}

@injectable()
class UpdateSermonsThumbnailService {
  constructor(
    @inject('SermonsRepository')
    private sermonsRepository: ISermonsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    sermonId,
    thumbnailFileName,
  }: IRequest): Promise<Sermon> {
    const sermon = await this.sermonsRepository.findById(sermonId);

    if (!sermon) {
      throw new AppError('Only authenticated sermons can change avatar', 401);
    }

    if (sermon.thumbnail) {
      await this.storageProvider.deleteFile(sermon.thumbnail);
    }

    const filename = await this.storageProvider.saveFile(thumbnailFileName);

    sermon.thumbnail = filename;

    await this.sermonsRepository.save(sermon);

    return sermon;
  }
}

export default UpdateSermonsThumbnailService;
