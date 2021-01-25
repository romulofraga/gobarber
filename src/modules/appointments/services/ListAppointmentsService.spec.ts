import 'reflect-metadata';
import CreateApointmentService from '@modules/appointments/services/CreateAppointmentService';
import ListAppointmentsServce from '@modules/appointments/services/ListAppointmentsServce';
import FakeApointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';

describe('ListsApponintments', () => {
  it('should be able to list all appointments', async () => {
    const fakeAppointmentRepository = new FakeApointmentRepository();
    const createAppointment = new CreateApointmentService(
      fakeAppointmentRepository,
    );
    const listAppointments = new ListAppointmentsServce(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(2020, 0, 1, 1),
      provider_id: '123456',
    });

    const appointment2 = await createAppointment.execute({
      date: new Date(2020, 0, 1, 2),
      provider_id: '123456',
    });

    const allApointments = await listAppointments.execute();

    expect(allApointments).toStrictEqual([appointment, appointment2]);
  });
});
