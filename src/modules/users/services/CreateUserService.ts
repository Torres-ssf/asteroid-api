import AppError from '../../../shared/errors/AppError';
import User from '../entities/IUser';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private userRepository: IUsersRepository;

  constructor(userRepository: IUsersRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }: IRequest): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email address already taken');
    }

    const user = this.userRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}

export default CreateUserService;
