import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';
import ShowCommentByIdService from './ListCommentsByIdService';

let fakeCommentsRepository: FakeCommentsRepository;

let fakeUsersRepository: FakeUsersRepository;
let showCommentByIdService: ShowCommentByIdService;

describe('List Comments', () => {
  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    showCommentByIdService = new ShowCommentByIdService(fakeCommentsRepository);
  });

  it('should be able to show all Comment from ids', async () => {
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

    const comments = await showCommentByIdService.execute([
      comment.id,
      comment2.id,
    ]);

    expect(comments).toMatchObject([comment, comment2]);
  });
});
