import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeTagsRepository from '@modules/tags/repositories/fakes/FakeTagsRepository';
import FakeSermonsRepository from '../repositories/fakes/FakeSermonsRepository';
import UpdateSermonsTagsService from './UpdateSermonsTagsService';

let fakeSermonsRepository: FakeSermonsRepository;
let fakeTagsRepository: FakeTagsRepository;

let fakeUsersRepository: FakeUsersRepository;
let updateSermonsTags: UpdateSermonsTagsService;

describe('CreateSermons', () => {
  beforeEach(() => {
    fakeSermonsRepository = new FakeSermonsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeTagsRepository = new FakeTagsRepository();

    updateSermonsTags = new UpdateSermonsTagsService(
      fakeSermonsRepository,
      fakeTagsRepository,
    );
  });

  it('should be able to add Tags to Sermon', async () => {
    const leader = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const sermon = await fakeSermonsRepository.create({
      title: 'Primeira pregação',
      preacher_id: leader.id,
      description: 'Pregação do teste',
      video_url: 'url_video.mp4',
    });

    const tag = await fakeTagsRepository.create({
      name: 'Tag1',
    });

    await updateSermonsTags.execute({
      sermonId: sermon.id,
      tagsIds: [tag.id],
    });

    await expect(sermon.tags).toEqual([tag]);
  });
});
