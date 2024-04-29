import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTagsRepository from '@modules/tags/repositories/fakes/FakeTagsRepository';
import FakeSermonsRepository from '../repositories/fakes/FakeSermonsRepository';
import FilterSermonsByTag from './FilterSermonByTagService';

let fakeSermonsRepository: FakeSermonsRepository;
let fakeTagsRepository: FakeTagsRepository;
let fakeUsersRepository: FakeUsersRepository;

let filterSermonsByTag: FilterSermonsByTag;

describe('Filter sermon by Tag', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeTagsRepository = new FakeTagsRepository();
    fakeSermonsRepository = new FakeSermonsRepository();

    filterSermonsByTag = new FilterSermonsByTag(fakeSermonsRepository);
  });

  it('should be able to show all Comment from a single sermon', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const tag = await fakeTagsRepository.create({
      name: 'Tag1',
    });

    const sermon = await fakeSermonsRepository.create({
      title: 'Primeira pregação',
      preacher_id: user.id,
      description: 'Pregação do teste',
      video_url: 'url_video.mp4',
    });

    await fakeSermonsRepository.create({
      title: 'Segunda pregação',
      preacher_id: user.id,
      description: 'Pregação do teste',
      video_url: 'url_video.mp4',
    });

    const sermon3 = await fakeSermonsRepository.create({
      title: 'Terceira pregação',
      preacher_id: user.id,
      description: 'Pregação do teste',
      video_url: 'url_video.mp4',
    });

    sermon.tags = [tag];
    sermon3.tags = [tag];

    const sermons = await filterSermonsByTag.execute('Tag1');

    expect(sermons).toMatchObject([sermon, sermon3]);
  });
});
