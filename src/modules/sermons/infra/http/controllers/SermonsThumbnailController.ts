import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateSermonsPhotoService from '@modules/sermons/services/UpdateSermonsThumbnailService';

export default class SermonsPhotoController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateSermonPhoto = container.resolve(UpdateSermonsPhotoService);

    const { id } = request.params;

    const sermon = await updateSermonPhoto.execute({
      sermonId: id,
      thumbnailFileName: request.file.filename,
    });

    return response.json(classToClass(sermon));
  }
}
