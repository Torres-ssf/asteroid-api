import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../entities/IUser';
import IUsersRepository from '../repositories/IUsersRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError('Wrong user/password combination');
    }

    const passwordMatch = await this.hashProvider.compare(
      password,
      userExists.password,
    );

    if (!passwordMatch) {
      throw new AppError('Wrong user/password combination');
    }

    throw new AppError('not finish implemented yet');
  }
}

export default AuthenticateUserService;
