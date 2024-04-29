import Sermon from '../infra/typeorm/entities/Sermon';
import ICreateSermonDTO from '../dtos/ICreateSermonDTO';

export default interface IMinistrieRepository {
  create(data: ICreateSermonDTO): Promise<Sermon>;
  save(data: ICreateSermonDTO): Promise<Sermon>;
  findById(id: string): Promise<Sermon | undefined>;
  listAll(): Promise<Sermon[] | undefined>;
  filterByTag(tag: string): Promise<Sermon[] | undefined>;
}
