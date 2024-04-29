import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMinistriesRepository from '../repositories/fakes/FakeMinistriesRepository';
import UpdateMinistryLeadersService from './UpdateMinistriesLeadersService';

let fakeMinistriesRepository: FakeMinistriesRepository;
let updateMinistryLeadersService: UpdateMinistryLeadersService;

let fakeUsersRepository: FakeUsersRepository;

describe('Update Ministries Leaders', () => {
  beforeEach(() => {
    fakeMinistriesRepository = new FakeMinistriesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    updateMinistryLeadersService = new UpdateMinistryLeadersService(
      fakeMinistriesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to update the leader of a specific ministry', async () => {
    const leader = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const leader2 = await fakeUsersRepository.create({
      name: 'John Doe2',
      email: 'oi2@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const ministry = await fakeMinistriesRepository.create({
      name: 'Karis',
      leaders: [leader],
    });

    const updatedMinistryLeaders = await updateMinistryLeadersService.execute({
      ministryId: ministry.id,
      leadersIds: [leader.id, leader2.id],
    });

    await expect(updatedMinistryLeaders?.leaders).toMatchObject([
      leader,
      leader2,
    ]);
  });
});
