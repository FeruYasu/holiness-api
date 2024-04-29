import Comment from '../infra/typeorm/entities/Comment';
import ICreateServiceDTO from '../dtos/ICreateCommentDTO';

export default interface ICommentsRepository {
  create(data: ICreateServiceDTO): Promise<Comment>;
  save(data: ICreateServiceDTO): Promise<Comment>;
  findById(id: string): Promise<Comment | undefined>;
  findByIds(ids: string[]): Promise<Comment[] | undefined>;
}
