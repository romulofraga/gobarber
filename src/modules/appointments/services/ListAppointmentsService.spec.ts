import 'reflect-metadata';
import CreateApointmentService from '@modules/appointments/services/CreateAppointmentService';
import ListAppointmentsServce from '@modules/appointments/services/ListAppointmentsServce';
import FakeApointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';

let fakeAppointmentRepository: FakeApointmentRepository;
let createAppointment: CreateApointmentService;
let listAppointments: ListAppointmentsServce;

describe('ListsAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeApointmentRepository();
    createAppointment = new CreateApointmentService(fakeAppointmentRepository);
    listAppointments = new ListAppointmentsServce(fakeAppointmentRepository);
  });

  it('should be able to list all appointments', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2021, 4, 10, 15),
      provider_id: '123456',
      user_id: 'user',
    });

    const appointment2 = await createAppointment.execute({
      date: new Date(2021, 4, 10, 16),
      user_id: 'user',
      provider_id: '123456',
    });

    const allApointments = await listAppointments.execute();

    expect(allApointments).toStrictEqual([appointment, appointment2]);
  });
});
