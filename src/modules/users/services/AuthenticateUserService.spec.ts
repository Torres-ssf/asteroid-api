import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUser from './AuthenticateUserService';
import FakeTokenProvider from '../providers/TokenProvider/fakes/FakeTokenProvider';

describe('AuthenticateUser', () => {
  let authenticateUser: AuthenticateUser;

  let fakeUserRepository: FakeUserRepository;

  let fakeHashProvider: FakeHashProvider;

  let fakeTokenProvider: FakeTokenProvider;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTokenProvider = new FakeTokenProvider();

    authenticateUser = new AuthenticateUser(
      fakeUserRepository,
      fakeHashProvider,
      fakeTokenProvider,
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

  it('should compare the hashed password with given password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Paul',
      email: 'paul@email.com',
      password: '123456',
    });

    const spy = jest.spyOn(fakeHashProvider, 'compare');

    await authenticateUser.execute({
      email: 'paul@email.com',
      password: '123456',
    });

    expect(spy).toHaveBeenCalledWith('123456', user.password);
  });

  it('should generate an authentication token when right credentials are provided', async () => {
    const user = await fakeUserRepository.create({
      name: 'Paul',
      email: 'paul@email.com',
      password: '123456',
    });

    const spy = jest.spyOn(fakeTokenProvider, 'generate');

    await authenticateUser.execute({
      email: user.email,
      password: '123456',
    });

    expect(spy).toHaveBeenCalled();
  });

  it('should authenticate a user when right credentials are provided', async () => {
    await fakeUserRepository.create({
      name: 'Paul',
      email: 'paul@email.com',
      password: '123456',
    });

    const { user, token } = await authenticateUser.execute({
      email: 'paul@email.com',
      password: '123456',
    });

    expect(typeof token).toBe('string');

    expect(user).toMatchObject({
      name: 'Paul',
      email: 'paul@email.com',
      password: '123456',
    });
  });
});
