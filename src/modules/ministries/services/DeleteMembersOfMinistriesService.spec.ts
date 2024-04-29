import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeMinistriesRepository from '../repositories/fakes/FakeMinistriesRepository';
import DeleteMembersOfMinistriesService from './DeleteMembersOfMinistriesService';

let fakeMinistriesRepository: FakeMinistriesRepository;
let deleteMembersOfMinistriesService: DeleteMembersOfMinistriesService;

let fakeUsersRepository: FakeUsersRepository;

describe('Delete Ministries Members', () => {
  beforeEach(() => {
    fakeMinistriesRepository = new FakeMinistriesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    deleteMembersOfMinistriesService = new DeleteMembersOfMinistriesService(
      fakeMinistriesRepository,
    );
  });

  it('should be able to delete members from a specific ministry', async () => {
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
      name: 'Member1',
      email: 'oi1@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const member2 = await fakeUsersRepository.create({
      name: 'Member2',
      email: 'oi2@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    ministry.members = [member1, member2];

    const updatedMinistryMembers = await deleteMembersOfMinistriesService.execute(
      {
        ministryId: ministry.id,
        membersIds: [member1.id],
      },
    );

    await expect(updatedMinistryMembers?.members).toMatchObject([member2]);
  });
});
