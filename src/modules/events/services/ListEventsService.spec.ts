import FakeEventsRepository from '../repositories/fakes/FakeEventsRepository';
import ListEventsService from './ListEventsService';

let fakeEventsRepository: FakeEventsRepository;
let listEventService: ListEventsService;

describe('ListEvents', () => {
  beforeEach(() => {
    fakeEventsRepository = new FakeEventsRepository();

    listEventService = new ListEventsService(fakeEventsRepository);
  });

  it('should be able to list all events', async () => {
    const event = await fakeEventsRepository.create({
      name: 'Primeiro Evento',
      local: 'Igreja Holiness',
      description: 'Primeiro evento Teste',
      start_date: new Date(),
      end_date: new Date(),
    });

    const event2 = await fakeEventsRepository.create({
      name: 'Segundo Evento',
      local: 'Igreja Holiness',
      description: 'Segundo evento Teste',
      start_date: new Date(),
      end_date: new Date(),
    });

    const events = await listEventService.execute();

    await expect(events).toMatchObject([event, event2]);
  });
});
