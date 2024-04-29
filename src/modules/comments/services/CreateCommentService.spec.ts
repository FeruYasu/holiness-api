import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';
import CreateCommentsService from './CreateCommentsService';

let fakeCommentsRepository: FakeCommentsRepository;
let createComment: CreateCommentsService;

let fakeUsersRepository: FakeUsersRepository;

describe('CreateComments', () => {
  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createComment = new CreateCommentsService(fakeCommentsRepository);
  });

  it('should be able to create a new Comment', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const comment = await createComment.execute({
      content: 'Comentário',
      user_id: user.id,
    });

    expect(comment).toHaveProperty('id');
  });
});
