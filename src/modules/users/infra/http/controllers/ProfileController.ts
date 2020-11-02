import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    console.log(userId, 'to aqui');

    const showProfileService = container.resolve(ShowProfileService);

    const res = await showProfileService.execute(userId);

    return response.status(200).json(res);
  }
}

export default ProfileController;
