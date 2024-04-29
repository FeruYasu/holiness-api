import FakeMinistriesRepository from '@modules/ministries/repositories/fakes/FakeMinistriesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeEventsRepository from '../repositories/fakes/FakeEventsRepository';
import AddMinistriesToEventService from './AddMinistriesToEventService';

let fakeEventsRepository: FakeEventsRepository;
let fakeMinistriesRepository: FakeMinistriesRepository;
let fakeUsersRepository: FakeUsersRepository;

let addMinistriesToEvent: AddMinistriesToEventService;

describe('Add Ministries to Event', () => {
  beforeEach(() => {
    fakeEventsRepository = new FakeEventsRepository();

    fakeMinistriesRepository = new FakeMinistriesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    addMinistriesToEvent = new AddMinistriesToEventService(
      fakeEventsRepository,
      fakeMinistriesRepository,
    );
  });

  it('should be able to add ministries to specific event', async () => {
    const event = await fakeEventsRepository.create({
      name: 'Primeiro Evento',
      local: 'Igreja Holiness',
      description: 'Primiero evento Teste',
      start_date: new Date(),
      end_date: new Date(),
    });

    const leader = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const ministry1 = await fakeMinistriesRepository.create({
      name: 'Ministry 1',
      leaders: [leader],
    });

    const ministry2 = await fakeMinistriesRepository.create({
      name: 'Ministry 2',
      leaders: [leader],
    });

    const ministriesIds = [ministry1.id, ministry2.id];

    const updatedEvent = await addMinistriesToEvent.execute({
      eventId: event.id,
      ministriesIds,
    });

    await expect(updatedEvent?.ministries).toMatchObject([
      ministry1,
      ministry2,
    ]);
  });
});
