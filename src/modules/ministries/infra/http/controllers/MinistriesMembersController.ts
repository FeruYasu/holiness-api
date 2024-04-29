import { container } from 'tsyringe';
import AddMembersToMinistriesService from '@modules/ministries/services/AddMembersToMinistriesService';
import DeleteMembersToMinistriesService from '@modules/ministries/services/DeleteMembersOfMinistriesService';

import { Request, Response } from 'express';

export default class MinistriesMembersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { membersIds } = request.body;
    const { id } = request.params;

    const addMembers = container.resolve(AddMembersToMinistriesService);

    const ministry = await addMembers.execute({
      ministryId: id,
      membersIds,
    });

    return response.json(ministry);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { membersIds } = request.body;
    const { id } = request.params;

    const deleteMembers = container.resolve(DeleteMembersToMinistriesService);

    const ministry = await deleteMembers.execute({
      ministryId: id,
      membersIds,
    });

    return response.json(ministry);
  }
}
