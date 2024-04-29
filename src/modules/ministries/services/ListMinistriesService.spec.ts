import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMinistriesRepository from '@modules/ministries/repositories/fakes/FakeMinistriesRepository';
import ListMinistriesService from './ListMinistriesService';

let fakeMinistriesRepository: FakeMinistriesRepository;
let listMinistriesService: ListMinistriesService;

let fakeUsersRepository: FakeUsersRepository;

describe('ListMinistries', () => {
  beforeEach(() => {
    fakeMinistriesRepository = new FakeMinistriesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    listMinistriesService = new ListMinistriesService(fakeMinistriesRepository);
  });
  it('should show all ministries', async () => {
    const leader = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const ministry1 = await fakeMinistriesRepository.create({
      name: 'Ministry1',
      leaders: [leader],
    });

    const ministry2 = await fakeMinistriesRepository.create({
      name: 'Ministry2',
      leaders: [leader],
    });

    const ministryList = await listMinistriesService.execute();

    await expect(ministryList).toEqual([ministry1, ministry2]);
  });
});
