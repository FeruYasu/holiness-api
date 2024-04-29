import FakeEventsRepository from '../repositories/fakes/FakeEventsRepository';
import ShowEventByIdService from './ShowEventByIdService';

let fakeEventsRepository: FakeEventsRepository;
let showEventByIdService: ShowEventByIdService;

describe('ShowEvent', () => {
  beforeEach(() => {
    fakeEventsRepository = new FakeEventsRepository();
    showEventByIdService = new ShowEventByIdService(fakeEventsRepository);
  });

  it('should get 1 specific event by ID', async () => {
    await fakeEventsRepository.create({
      name: 'Primeiro Evento',
      local: 'Igreja Holiness',
      description: 'Primiero evento Teste',
      start_date: new Date(),
      end_date: new Date(),
    });

    const event2 = await fakeEventsRepository.create({
      name: '2 Evento',
      local: 'Igreja Holiness',
      description: 'Primiero evento Teste',
      start_date: new Date(),
      end_date: new Date(),
    });

    const event = await showEventByIdService.execute(event2.id);

    await expect(event).toBe(event2);
  });
});
