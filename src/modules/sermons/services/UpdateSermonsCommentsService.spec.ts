import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeCommentsRepository from '@modules/comments/repositories/fakes/FakeCommentsRepository';
import FakeSermonsRepository from '../repositories/fakes/FakeSermonsRepository';
import UpdateSermonsCommentsService from './UpdateSermonsCommentsService';

let fakeSermonsRepository: FakeSermonsRepository;
let fakeCommentsRepository: FakeCommentsRepository;

let fakeUsersRepository: FakeUsersRepository;
let updateSermonsComments: UpdateSermonsCommentsService;

describe('CreateSermons', () => {
  beforeEach(() => {
    fakeSermonsRepository = new FakeSermonsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCommentsRepository = new FakeCommentsRepository();

    updateSermonsComments = new UpdateSermonsCommentsService(
      fakeSermonsRepository,
      fakeCommentsRepository,
    );
  });

  it('should be able to add Comments to Sermon', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const sermon = await fakeSermonsRepository.create({
      title: 'Primeira pregação',
      preacher_id: user.id,
      description: 'Pregação do teste',
      video_url: 'url_video.mp4',
    });

    const comment = await fakeCommentsRepository.create({
      content: 'Comment 1',
      user_id: user.id,
    });

    await updateSermonsComments.execute({
      sermonId: sermon.id,
      commentId: comment.id,
    });

    await expect(sermon.comments).toEqual([comment]);
  });
});
