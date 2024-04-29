import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMinistriesRepository from '../repositories/fakes/FakeMinistriesRepository';
import UpdateMinistriesService from './UpdateMinistriesService';

let fakeMinistriesRepository: FakeMinistriesRepository;
let updateMinistries: UpdateMinistriesService;

let fakeUsersRepository: FakeUsersRepository;

describe('UpdateMinistries', () => {
  beforeEach(() => {
    fakeMinistriesRepository = new FakeMinistriesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    updateMinistries = new UpdateMinistriesService(fakeMinistriesRepository);
  });

  it('should be able to update the Ministry', async () => {
    const leader = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    await fakeMinistriesRepository.create({
      name: 'Karis',
      leaders: [leader],
    });

    const updatedMinistry = await updateMinistries.execute({
      name: 'Karis',
      local: 'Igreja Holiness',
    });

    expect(updatedMinistry.local).toBe('Igreja Holiness');
  });
});
