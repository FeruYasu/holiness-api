import { uuid } from 'uuidv4';

import ISermonsRepository from '@modules/sermons/repositories/ISermonsRepository';
import ICreateSermonDTO from '@modules/sermons/dtos/ICreateSermonDTO';

import Sermon from '../../infra/typeorm/entities/Sermon';

class SermonsRepository implements ISermonsRepository {
  private sermons: Sermon[] = [];

  public async create({
    title,
    description,
    preacher_id,
    video_url,
  }: ICreateSermonDTO): Promise<Sermon> {
    const sermon = new Sermon();

    Object.assign(sermon, {
      id: uuid(),
      title,
      description,
      preacher_id,
      video_url,
    });

    this.sermons.push(sermon);

    return sermon;
  }

  public async save(sermon: Sermon): Promise<Sermon> {
    const findIndex = await this.sermons.findIndex(
      findSermon => findSermon.id === sermon.id,
    );

    this.sermons[findIndex] = sermon;
    return sermon;
  }

  public async listAll(): Promise<Sermon[] | undefined> {
    const sermonsList = await this.sermons;

    return sermonsList;
  }

  public async findById(id: string): Promise<Sermon | undefined> {
    const foundSermon = await this.sermons.find(sermon => sermon.id === id);

    return foundSermon;
  }

  public async filterByTag(tag: string): Promise<Sermon[] | undefined> {
    const filtered = this.sermons.filter(findSermon =>
      findSermon.tags?.map(t => {
        if (t.name.includes(tag)) {
          return true;
        }
        return false;
      }),
    );

    return filtered;
  }
}

export default SermonsRepository;
