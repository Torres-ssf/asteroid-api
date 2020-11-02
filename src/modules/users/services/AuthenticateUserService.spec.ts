import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUser from './AuthenticateUserService';
import FakeTokenProvider from '../providers/TokenProvider/fakes/FakeTokenProvider';

interface IUserCredentials {
  name: string;
  email: string;
  password: string;
}

describe('AuthenticateUser', () => {
  let authenticateUser: AuthenticateUser;

  let fakeUserRepository: FakeUserRepository;

  let fakeHashProvider: FakeHashProvider;

  let fakeTokenProvider: FakeTokenProvider;

  let userCredentials: IUserCredentials;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTokenProvider = new FakeTokenProvider();

    authenticateUser = new AuthenticateUser(
      fakeUserRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );

    userCredentials = {
      name: 'Paul',
      email: 'paul@email.com',
      password: '123456',
    };
  });

  it('should not be able to authenticate with unregistered email', async () => {
    await expect(
      authenticateUser.execute({
        email: 'unknown@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = await fakeUserRepository.create(userCredentials);

    await expect(
      authenticateUser.execute({
        email: user.email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should compare the hashed password with given password', async () => {
    const user = await fakeUserRepository.create(userCredentials);

    const spy = jest.spyOn(fakeHashProvider, 'compare');

    await authenticateUser.execute({
      email: userCredentials.email,
      password: userCredentials.password,
    });

    expect(spy).toHaveBeenCalledWith(userCredentials.password, user.password);
  });

  it('should generate an authentication token when right credentials are provided', async () => {
    await fakeUserRepository.create(userCredentials);

    const spy = jest.spyOn(fakeTokenProvider, 'generate');

    await authenticateUser.execute({
      email: userCredentials.email,
      password: userCredentials.password,
    });

    expect(spy).toHaveBeenCalled();
  });

  it('should return the token that was genereted by the TokenProvider', async () => {
    await fakeUserRepository.create(userCredentials);

    const spy = jest.spyOn(fakeTokenProvider, 'generate');

    const res = await authenticateUser.execute({
      email: userCredentials.email,
      password: userCredentials.password,
    });

    expect(spy).toHaveReturnedWith(res.token);
  });

  it('should authenticate and return user data and the authentication token', async () => {
    await fakeUserRepository.create(userCredentials);

    const { user, token } = await authenticateUser.execute({
      email: userCredentials.email,
      password: userCredentials.password,
    });

    expect(typeof token).toBe('string');

    expect(user).toMatchObject(userCredentials);
  });
});
