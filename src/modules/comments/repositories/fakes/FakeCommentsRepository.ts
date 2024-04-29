import { uuid } from 'uuidv4';

import ICommentsRepository from '@modules/comments/repositories/ICommentsRepository';

import Comment from '../../infra/typeorm/entities/Comment';

interface IRequest {
  content: string;
  user_id: string;
}

class CommentsRepository implements ICommentsRepository {
  private comments: Comment[] = [];

  public async create({ content, user_id }: IRequest): Promise<Comment> {
    const comment = new Comment();

    Object.assign(comment, {
      id: uuid(),
      content,
      user_id,
    });

    this.comments.push(comment);

    return comment;
  }

  public async save(comment: Comment): Promise<Comment> {
    const findIndex = this.comments.findIndex(
      findComment => findComment.id === comment.id,
    );

    this.comments[findIndex] = comment;
    return comment;
  }

  public async findById(id: string): Promise<Comment | undefined> {
    const findComment = await this.comments.find(comment => comment.id === id);

    return findComment;
  }

  public async findByIds(ids: string[]): Promise<Comment[] | undefined> {
    const findMinistries = await this.comments.filter(comment => {
      return ids.includes(comment.id);
    });

    return findMinistries;
  }
}

export default CommentsRepository;
