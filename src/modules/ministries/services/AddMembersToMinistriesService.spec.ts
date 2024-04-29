import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMinistriesRepository from '../repositories/fakes/FakeMinistriesRepository';
import AddMembersToMinistriesService from './AddMembersToMinistriesService';

let fakeMinistriesRepository: FakeMinistriesRepository;
let addMembersToMinistriesService: AddMembersToMinistriesService;

let fakeUsersRepository: FakeUsersRepository;

describe('Add Ministries Members', () => {
  beforeEach(() => {
    fakeMinistriesRepository = new FakeMinistriesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    addMembersToMinistriesService = new AddMembersToMinistriesService(
      fakeMinistriesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to add members to a specific ministry', async () => {
    const leader = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const ministry = await fakeMinistriesRepository.create({
      name: 'Karis',
      leaders: [leader],
    });

    const member1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const member2 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const updatedMinistryMembers = await addMembersToMinistriesService.execute({
      ministryId: ministry.id,
      membersIds: [member1.id, member2.id],
    });

    await expect(updatedMinistryMembers?.members).toMatchObject([
      member1,
      member2,
    ]);
  });
});
