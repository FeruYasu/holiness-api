import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMinistriesRepository from '@modules/ministries/repositories/fakes/FakeMinistriesRepository';
import CreateAnnouncementService from './CreateAnnouncementService';
import FakeAnnouncementRepository from '../repositories/fakes/FakeAnnouncementsRepository';

let createAnnouncementService: CreateAnnouncementService;
let fakeAnnouncementsRepository: FakeAnnouncementRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeMinistriesRepository: FakeMinistriesRepository;

describe('CreateAnnouncement', () => {
  beforeEach(() => {
    fakeAnnouncementsRepository = new FakeAnnouncementRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeMinistriesRepository = new FakeMinistriesRepository();

    createAnnouncementService = new CreateAnnouncementService(
      fakeAnnouncementsRepository,
    );
  });
  it('should be able to create an announcement', async () => {
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

    const announcement = await createAnnouncementService.execute({
      title: 'Primeiro aviso',
      content: 'Conteudo do primeiro aviso',
      user_id: user.id,
      ministry_id: ministry1.id,
    });

    await expect(announcement).toHaveProperty('id');
  });
});
