import FakeTagsRepository from '../repositories/fakes/FakeTagsRepository';
import CreateTagsService from './CreateTagService';

let fakeTagsRepository: FakeTagsRepository;
let createTag: CreateTagsService;

describe('CreateTags', () => {
  beforeEach(() => {
    fakeTagsRepository = new FakeTagsRepository();

    createTag = new CreateTagsService(fakeTagsRepository);
  });

  it('should be able to create a new Tag', async () => {
    const tag = await createTag.execute({
      name: 'Família',
    });

    expect(tag).toHaveProperty('id');
  });
});
