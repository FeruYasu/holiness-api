import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeSermonsRepository from '@modules/sermons/repositories/fakes/FakeSermonsRepository';
import ListSermonsService from './ListSermonsService';

let fakeSermonsRepository: FakeSermonsRepository;
let listSermonsService: ListSermonsService;

let fakeUsersRepository: FakeUsersRepository;

describe('ListSermons', () => {
  beforeEach(() => {
    fakeSermonsRepository = new FakeSermonsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    listSermonsService = new ListSermonsService(fakeSermonsRepository);
  });
  it('should show all sermons', async () => {
    const preacher = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const sermon1 = await fakeSermonsRepository.create({
      title: '1 pregação',
      preacher_id: preacher.id,
      description: 'Pregação do teste',
      video_url: 'url_video.mp4',
    });

    const sermon2 = await fakeSermonsRepository.create({
      title: '2 pregação',
      preacher_id: preacher.id,
      description: 'Pregação do teste',
      video_url: 'url_video.mp4',
    });

    const sermonList = await listSermonsService.execute();

    await expect(sermonList).toEqual([sermon1, sermon2]);
  });
});
