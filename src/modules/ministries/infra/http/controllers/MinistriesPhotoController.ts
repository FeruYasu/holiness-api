import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateMinistriesPhotoService from '@modules/ministries/services/UpdateMinistriesPhotoService';

export default class MinistriesPhotoController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateMinistryPhoto = container.resolve(UpdateMinistriesPhotoService);

    const { id } = request.params;

    const ministry = await updateMinistryPhoto.execute({
      ministryId: id,
      photoFileName: request.file.filename,
    });

    return response.json(classToClass(ministry));
  }
}
