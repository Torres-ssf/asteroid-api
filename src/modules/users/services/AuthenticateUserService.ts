import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import User from '../entities/IUser';
import IUsersRepository from '../repositories/IUsersRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ITokenProvider from '../providers/TokenProvider/models/ITokenProvider';

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

  private tokenProvider: ITokenProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('HashProvider')
    hashProvider: IHashProvider,
    @inject('TokenProvider')
    tokenProvider: ITokenProvider,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
    this.tokenProvider = tokenProvider;
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Wrong user/password combination');
    }

    const passwordMatch = await this.hashProvider.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError('Wrong user/password combination');
    }

    const { secret, expiration } = authConfig;

    const token = this.tokenProvider.generate({
      payload: { userId: user.id },
      secret,
      expiresIn: expiration,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
