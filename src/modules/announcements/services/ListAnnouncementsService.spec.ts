import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAnnouncementsRepository from '@modules/announcements/repositories/fakes/FakeAnnouncementsRepository';
import FakeMinistriesRepository from '@modules/ministries/repositories/fakes/FakeMinistriesRepository';
import ListAnnouncementsService from './ListAnnouncementsService';

let fakeAnnouncementsRepository: FakeAnnouncementsRepository;
let listAnnouncementsService: ListAnnouncementsService;

let fakeUsersRepository: FakeUsersRepository;
let fakeMinistriesRepository: FakeMinistriesRepository;

describe('ListAnnouncements', () => {
  beforeEach(() => {
    fakeAnnouncementsRepository = new FakeAnnouncementsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeMinistriesRepository = new FakeMinistriesRepository();

    listAnnouncementsService = new ListAnnouncementsService(
      fakeAnnouncementsRepository,
    );
  });
  it('should show all announcements', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const ministry1 = await fakeMinistriesRepository.create({
      name: 'Ministry1',
      leaders: [user],
    });

    const announcement1 = await fakeAnnouncementsRepository.create({
      title: 'Primeiro aviso',
      content: 'Conteudo do primeiro aviso',
      user_id: user.id,
      ministry_id: ministry1.id,
    });

    const announcement2 = await fakeAnnouncementsRepository.create({
      title: 'Segundo aviso',
      content: 'Conteudo do primeiro aviso',
      user_id: user.id,
      ministry_id: ministry1.id,
    });

    const announcementList = await listAnnouncementsService.execute();

    await expect(announcementList).toEqual([announcement1, announcement2]);
  });
});
