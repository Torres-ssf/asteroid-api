import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  let fakeUsersRepository: FakeUsersRepository;

  let fakeHashProvider: FakeHashProvider;

  let createUserService: CreateUserService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Paul',
      email: 'paul@email.com',
      password: '123456',
    });

    expect(user).toMatchObject({
      name: 'Paul',
      email: 'paul@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('created_at');
    expect(user).toHaveProperty('updated_at');
  });

  it('should not create a new user with an email already in use', async () => {
    await createUserService.execute({
      name: 'Paul',
      email: 'paul@email.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'Another Paul',
        email: 'paul@email.com',
        password: 'another password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should call generateHash to hash the user password', async () => {
    const spy = jest.spyOn(fakeHashProvider, 'generateHash');

    const userPassword = '123123123';

    await createUserService.execute({
      name: 'Paul',
      email: 'paul@email.com',
      password: userPassword,
    });

    expect(spy).toHaveBeenCalledWith(userPassword);
  });
});
