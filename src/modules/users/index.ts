import './providers';
import { container } from 'tsyringe';

import IUsersRepository from './repositories/IUsersRepository';
import MongooseUsersRepository from './infra/mongoose/repositories/MongooseUsersRepository';

container.registerSingleton<IUsersRepository>(
  'IUsersRepository',
  MongooseUsersRepository,
);
