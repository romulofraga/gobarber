import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersListService from '@modules/appointments/services/ListProvidersListService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersListService);

    const providers = await listProviders.execute({
      user_id,
    });

    return response.json(providers);
  }
}
