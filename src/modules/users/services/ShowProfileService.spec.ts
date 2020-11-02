import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ShowProfileService from './ShowProfileService';

describe('UserProfile', () => {
  let fakeUsersRepository: FakeUsersRepository;

  let fakeHashProvider: FakeHashProvider;

  let createUserService: CreateUserService;

  let showProfileService: ShowProfileService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should verify if there is an user for the given id', async () => {
    const user = await createUserService.execute({
      name: 'John',
      email: 'john@email.com',
      password: '123456',
    });

    const spy = jest.spyOn(fakeUsersRepository, 'findById');

    await showProfileService.execute(user.id);

    expect(spy).toHaveBeenCalledWith(user.id);
  });

  it('should return an error if no user was found by the given id', async () => {
    await expect(
      showProfileService.execute('not an actually user id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should return the data from the user's given id", async () => {
    const user = await createUserService.execute({
      name: 'John',
      email: 'john@email.com',
      password: '123456',
    });

    const res = await showProfileService.execute(user.id);

    expect(res).toMatchObject(user);
  });
});
