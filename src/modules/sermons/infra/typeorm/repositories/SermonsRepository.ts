import { getRepository, Repository } from 'typeorm';

import ISermonsRepository from '@modules/sermons/repositories/ISermonsRepository';

import ICreateSermonDTO from '@modules/sermons/dtos/ICreateSermonDTO';

import Sermon from '../entities/Sermon';

class SermonsRepository implements ISermonsRepository {
  private ormRepository: Repository<Sermon>;

  constructor() {
    this.ormRepository = getRepository(Sermon);
  }

  public async create({
    title,
    description,
    preacher_id,
    video_url,
  }: ICreateSermonDTO): Promise<Sermon> {
    const sermon = this.ormRepository.create({
      title,
      description,
      preacher_id,
      video_url,
    });

    await this.ormRepository.save(sermon);

    return sermon;
  }

  public async save(sermon: Sermon): Promise<Sermon> {
    return this.ormRepository.save(sermon);
  }

  public async findById(id: string): Promise<Sermon | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
  }

  public async listAll(): Promise<Sermon[] | undefined> {
    const sermons = await this.ormRepository.find({
      relations: ['preacher', 'tags', 'comments'],
    });

    // const sermons = await this.ormRepository
    //   .createQueryBuilder('sermons')
    //   .innerJoinAndSelect('sermons.comments', 'comments')
    //   .leftJoinAndSelect('comments.replies', 'replies')
    //   .getMany();

    return sermons;
  }

  public async filterByTag(tag: string): Promise<Sermon[] | undefined> {
    const sermons = await this.ormRepository
      .createQueryBuilder('qb')
      .innerJoinAndSelect('qb.tags', 'tags')
      .where('tags.name = :name', { name: tag })
      .leftJoinAndSelect('qb.preacher', 'preacher')
      .getMany();

    return sermons;
  }
}

export default SermonsRepository;
