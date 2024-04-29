import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeMinistriesRepository from '../repositories/fakes/FakeMinistriesRepository';
import CreateMinistriesService from './CreateMinistriesService';

let fakeMinistriesRepository: FakeMinistriesRepository;
let createMinistry: CreateMinistriesService;

let fakeUsersRepository: FakeUsersRepository;

describe('CreateMinistries', () => {
  beforeEach(() => {
    fakeMinistriesRepository = new FakeMinistriesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createMinistry = new CreateMinistriesService(
      fakeMinistriesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create a new Ministry', async () => {
    const leader = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const ministry = await createMinistry.execute({
      name: 'Karis',
      leadersIds: [leader.id],
    });

    expect(ministry).toHaveProperty('id');
  });

  it('should not be able to create a new Minitry with same name', async () => {
    const leader = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    await createMinistry.execute({
      name: 'Karis',
      leadersIds: [leader.id],
    });

    expect(
      createMinistry.execute({
        name: 'Karis',
        leadersIds: [leader.id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
