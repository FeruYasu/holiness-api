import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(data: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByIds(ids: string[]): Promise<User[] | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
