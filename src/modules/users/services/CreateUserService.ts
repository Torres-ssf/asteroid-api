import AppError from '@shared/errors/AppError';
import User from '../entities/IUser';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private userRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(userRepository: IUsersRepository, hashProvider: IHashProvider) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  async execute({ name, email, password }: IRequest): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email address already taken');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
