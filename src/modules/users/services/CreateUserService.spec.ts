import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '../../../shared/errors/AppError';

describe('CreateUser', () => {
  let fakeUsersRepository: FakeUsersRepository;

  let createUserService: CreateUserService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    createUserService = new CreateUserService(fakeUsersRepository);
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
        name: 'Paul',
        email: 'paul@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
