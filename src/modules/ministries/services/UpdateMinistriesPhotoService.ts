import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import IMinistriesRepository from '../repositories/IMinistriesRepository';
import Ministry from '../infra/typeorm/entities/Ministry';

interface IRequest {
  ministryId: string;
  photoFileName: string;
}

@injectable()
class UpdateMinistriesPhotoService {
  constructor(
    @inject('MinistriesRepository')
    private ministriesRepository: IMinistriesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    ministryId,
    photoFileName,
  }: IRequest): Promise<Ministry> {
    const ministry = await this.ministriesRepository.findById(ministryId);

    if (!ministry) {
      throw new AppError('Only authenticated ministrys can change avatar', 401);
    }

    if (ministry.photo) {
      await this.storageProvider.deleteFile(ministry.photo);
    }

    const filename = await this.storageProvider.saveFile(photoFileName);

    ministry.photo = filename;

    await this.ministriesRepository.save(ministry);

    return ministry;
  }
}

export default UpdateMinistriesPhotoService;
