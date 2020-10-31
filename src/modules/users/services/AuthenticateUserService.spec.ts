import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUser from './AuthenticateUserService';

describe('AuthenticateUser', () => {
  let authenticateUser: AuthenticateUser;

  let fakeUserRepository: FakeUserRepository;

  let fakeHashProvider: FakeHashProvider;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUser(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should not be able to authenticate with unregistered email', async () => {
    await expect(
      authenticateUser.execute({
        email: 'not-registered-user@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
