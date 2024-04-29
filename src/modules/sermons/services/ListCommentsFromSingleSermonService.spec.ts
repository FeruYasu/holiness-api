import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeCommentsRepository from '@modules/comments/repositories/fakes/FakeCommentsRepository';
import FakeSermonsRepository from '../repositories/fakes/FakeSermonsRepository';

import ListCommentsFromSingleSermonService from './ListCommentsFromSingleSermonService';

let fakeCommentsRepository: FakeCommentsRepository;
let fakeSermonsRepository: FakeSermonsRepository;

let fakeUsersRepository: FakeUsersRepository;
let listCommentsFromSingleSermon: ListCommentsFromSingleSermonService;

describe('List Comments from single sermon', () => {
  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeSermonsRepository = new FakeSermonsRepository();

    listCommentsFromSingleSermon = new ListCommentsFromSingleSermonService(
      fakeSermonsRepository,
      fakeCommentsRepository,
    );
  });

  it('should be able to show all Comment from a single sermon', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const comment = await fakeCommentsRepository.create({
      content: 'Comentário',
      user_id: user.id,
    });

    const comment2 = await fakeCommentsRepository.create({
      content: 'Comentário',
      user_id: user.id,
    });

    const sermon = await fakeSermonsRepository.create({
      title: 'Primeira pregação',
      preacher_id: user.id,
      description: 'Pregação do teste',
      video_url: 'url_video.mp4',
    });

    sermon.comments = [comment, comment2];

    const comments = await listCommentsFromSingleSermon.execute(sermon.id);

    expect(comments).toMatchObject([comment, comment2]);
  });
});
