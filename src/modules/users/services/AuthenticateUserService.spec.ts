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

  it('should not be able to authenticate with wrong password', async () => {
    const userPassword = '123456';

    const user = await fakeUserRepository.create({
      name: 'Paul',
      email: 'paul@email.com',
      password: userPassword,
    });

    await expect(
      authenticateUser.execute({
        email: user.email,
        password: '121212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('HashProvider compare method should be called with the given password', async () => {
  //   const user = await fakeUserRepository.create({
  //     name: 'Paul',
  //     email: 'paul@email.com',
  //     password: '123456',
  //   });

  //   console.log(user);

  //   const spy = jest.spyOn(fakeHashProvider, 'compare');

  //   await authenticateUser.execute({
  //     email: 'paul@email.com',
  //     password: '123456',
  //   });

  //   expect(spy).toHaveBeenCalledWith(123456);
  // });
});
