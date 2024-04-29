import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeSermonsRepository from '../repositories/fakes/FakeSermonsRepository';
import CreateSermonsService from './CreateSermonsService';

let fakeSermonsRepository: FakeSermonsRepository;
let createSermon: CreateSermonsService;

let fakeUsersRepository: FakeUsersRepository;

describe('CreateSermons', () => {
  beforeEach(() => {
    fakeSermonsRepository = new FakeSermonsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createSermon = new CreateSermonsService(fakeSermonsRepository);
  });

  it('should be able to create a new Sermon', async () => {
    const leader = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const sermon = await createSermon.execute({
      title: 'Primeira pregação',
      preacher_id: leader.id,
      description: 'Pregação do teste',
      video_url: 'url_video.mp4',
    });

    await expect(sermon).toHaveProperty('id');
  });
});
