import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import User from '../entities/IUser';
import IUsersRepository from '../repositories/IUsersRepository';

injectable();
class ShowProfileService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(userId: string): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('No user for the specified id');
    }

    return user;
  }
}

export default ShowProfileService;
