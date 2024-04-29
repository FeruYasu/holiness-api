import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeEventsRepository from '../repositories/fakes/FakeEventsRepository';

import AddParticipantsToEventService from './AddParticipantsToEventService';

let fakeEventsRepository: FakeEventsRepository;
let fakeUsersRepository: FakeUsersRepository;

let addParticipantsToEvent: AddParticipantsToEventService;

describe('Add Participants to Event', () => {
  beforeEach(() => {
    fakeEventsRepository = new FakeEventsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    addParticipantsToEvent = new AddParticipantsToEventService(
      fakeEventsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to add participants to specific event', async () => {
    const event = await fakeEventsRepository.create({
      name: 'Primeiro Evento',
      local: 'Igreja Holiness',
      description: 'Primiero evento Teste',
      start_date: new Date(),
      end_date: new Date(),
    });

    const participant1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const participant2 = await fakeUsersRepository.create({
      name: 'John Doe 2',
      email: 'oi2@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const usersIds = [participant1.id, participant2.id];

    await addParticipantsToEvent.execute({
      eventId: event.id,
      usersIds,
    });

    const participant3 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'oi@oi.com.br',
      password: '123123',
      birthdate: new Date(),
    });

    const updatedParticipants = await addParticipantsToEvent.execute({
      eventId: event.id,
      usersIds: [participant3.id],
    });

    await expect(updatedParticipants?.participants).toMatchObject([
      participant1,
      participant2,
      participant3,
    ]);
  });
});
