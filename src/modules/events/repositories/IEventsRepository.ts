import Event from '../infra/typeorm/entities/Event';

interface IRequest {
  name: string;
  local: string;
  description: string;
  start_date: Date;
  end_date: Date;
}

export default interface IMinistrieRepository {
  save(data: IRequest): Promise<Event>;
  findById(id: string): Promise<Event | undefined>;
  listAll(): Promise<Event[] | undefined>;
  create(data: IRequest): Promise<Event>;
}
