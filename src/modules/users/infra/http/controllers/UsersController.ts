import { Request, Response } from 'express';

import MongooseUserRepository from '@modules/users/infra/mongoose/repositories/MongooseUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const usersRepository = new MongooseUserRepository();

    const createUserService = new CreateUserService(usersRepository);

    const user = await createUserService.execute({ name, email, password });

    return response.send(user);
  }
}

export default UsersController;
