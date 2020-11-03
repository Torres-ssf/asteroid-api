import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

interface IUserCredentials {
  name: string;
  email: string;
  password: string;
}

describe('CreateUser', () => {
  let fakeUsersRepository: FakeUsersRepository;

  let fakeHashProvider: FakeHashProvider;

  let createUserService: CreateUserService;

  let userCredentials: IUserCredentials;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    userCredentials = {
      name: 'Paul',
      email: 'paul@email.com',
      password: '123456',
    };
  });

  it('should create a new user', async () => {
    const res = await createUserService.execute(userCredentials);

    expect(res).toMatchObject(userCredentials);
  });

  it('should not create a new user with an email already in use', async () => {
    await createUserService.execute(userCredentials);

    await expect(
      createUserService.execute(userCredentials),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should use password to generate a hashed password', async () => {
    const spy = jest.spyOn(fakeHashProvider, 'generateHash');

    await createUserService.execute(userCredentials);

    expect(spy).toHaveBeenCalledWith(userCredentials.password);
  });

  it('should create the new user with a hashed password', async () => {
    const spy = jest.spyOn(fakeHashProvider, 'generateHash');

    const res = await createUserService.execute(userCredentials);

    expect(spy).toHaveReturnedWith(fakeHashProvider.generateHash(res.password));
  });
});
