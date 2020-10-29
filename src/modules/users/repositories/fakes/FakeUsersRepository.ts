import { v4 } from 'uuid';
import User from '../../entities/IUser';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  async create(userData: ICreateUserDTO): Promise<User> {
    const { name, email, password } = userData;

    const user = {
      id: v4(),
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    };

    return user;
  }

  findById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}

export default FakeUsersRepository;
