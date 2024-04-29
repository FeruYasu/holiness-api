import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeEventsRepository from '../repositories/fakes/FakeEventsRepository';

import AddParticipantsToEventService from './AddParticipantsToEventService';
import DeleteParticipantsFromEvent from './DeleteParticipantsFromEvent';

let fakeEventsRepository: FakeEventsRepository;
let fakeUsersRepository: FakeUsersRepository;

let addParticipantsToEvent: AddParticipantsToEventService;
let deleteParticipantsFromEvent: DeleteParticipantsFromEvent;

describe('Delete Participant from event', () => {
  beforeEach(() => {
    fakeEventsRepository = new FakeEventsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    addParticipantsToEvent = new AddParticipantsToEventService(
      fakeEventsRepository,
      fakeUsersRepository,
    );

    deleteParticipantsFromEvent = new DeleteParticipantsFromEvent(
      fakeEventsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to delete from single event', async () => {
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

    const event = await fakeEventsRepository.create({
      name: 'Primeiro Evento',
      local: 'Igreja Holiness',
      description: 'Primeiro evento Teste',
      start_date: new Date(),
      end_date: new Date(),
    });

    const usersIds = [participant1.id, participant2.id];

    await addParticipantsToEvent.execute({
      eventId: event.id,
      usersIds,
    });

    const updatedEvent = await deleteParticipantsFromEvent.execute({
      eventId: event.id,
      usersIds: [participant1.id],
    });

    await expect(updatedEvent?.participants).toMatchObject([participant2]);
  });
});
