import { v4 } from 'uuid';
import mongoose from 'mongoose';

import User from '@modules/users/entities/IUser';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import AppError from '@shared/errors/AppError';
import { MongooseUserType } from '../entities/MongooseUser';

class MongooseUsersRepository implements IUsersRepository {
  private UsersRepository;

  constructor() {
    this.UsersRepository = mongoose.model<MongooseUserType>('Users');
  }

  async create(userData: ICreateUserDTO): Promise<User> {
    const { name, email, password } = userData;

    const user = new this.UsersRepository({
      id: v4(),
      name,
      email,
      password,
    });

    await user.save();

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const userExist = await this.UsersRepository.findOne({ id });

    if (userExist) {
      return userExist;
    }

    return undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.UsersRepository.findOne({ email });

    if (user) {
      return user;
    }

    return undefined;
  }
}

export default MongooseUsersRepository;
