import { container } from 'tsyringe';
import UpdateMinistriesLeadersService from '@modules/ministries/services/UpdateMinistriesLeadersService';
import { Request, Response } from 'express';

export default class MinistriesLeadersController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { leadersIds } = request.body;
    const { id } = request.params;

    const UpdateMinistriy = container.resolve(UpdateMinistriesLeadersService);

    const ministry = await UpdateMinistriy.execute({
      ministryId: id,
      leadersIds,
    });

    return response.json(ministry);
  }
}
