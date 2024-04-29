import FakeTagsRepository from '@modules/tags/repositories/fakes/FakeTagsRepository';
import ListTagsService from './ListTagsService';

let fakeTagsRepository: FakeTagsRepository;
let listTagsService: ListTagsService;

describe('ListTags', () => {
  beforeEach(() => {
    fakeTagsRepository = new FakeTagsRepository();

    listTagsService = new ListTagsService(fakeTagsRepository);
  });
  it('should list all tags', async () => {
    const tag1 = await fakeTagsRepository.create({
      name: 'Tag1',
    });

    const tag2 = await fakeTagsRepository.create({
      name: 'Tag2',
    });

    const tagList = await listTagsService.execute();

    await expect(tagList).toEqual([tag1, tag2]);
  });
});
