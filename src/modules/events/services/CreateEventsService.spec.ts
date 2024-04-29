import FakeEventsRepository from '../repositories/fakes/FakeEventsRepository';
import CreateEventsService from './CreateEventsService';

let fakeEventsRepository: FakeEventsRepository;
let createEvent: CreateEventsService;

describe('CreateEvents', () => {
  beforeEach(() => {
    fakeEventsRepository = new FakeEventsRepository();

    createEvent = new CreateEventsService(fakeEventsRepository);
  });

  it('should be able to create a new Event', async () => {
    const event = await createEvent.execute({
      name: 'Primeiro Evento',
      local: 'Igreja Holiness',
      description: 'Primiero evento Teste',
      start_date: '21/08/20',
      start_hour: '19h30min',
      end_date: '21/08/20',
      end_hour: '22h00min',
    });

    expect(event).toHaveProperty('id');
  });
});
