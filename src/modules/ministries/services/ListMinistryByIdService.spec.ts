import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMinistriesRepository from '@modules/ministries/repositories/fakes/FakeMinistriesRepository';

import ListMinistryByIdService from './ListMinistryByIdService';

let listMinistryByIdService: ListMinistryByIdService;

let fakeMinistriesRepository: FakeMinistriesRepository;
let fakeUsersRepository: FakeUsersRepository;

describe('ListDeliveryById', () => {
  beforeEach(() => {
    fakeMinistriesRepository = new FakeMinistriesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    listMinistryByIdService = new ListMinistryByIdService(
      fakeMinistriesRepository,
    );
  });

  it('should be able to list 1 courier by ID', async () => {
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

    await fakeMinistriesRepository.create({
      name: 'Ministry2',
      leaders: [leader],
    });

    const justOneMinistry = await listMinistryByIdService.execute(ministry1.id);

    expect(justOneMinistry).toEqual(ministry1);
  });
});
