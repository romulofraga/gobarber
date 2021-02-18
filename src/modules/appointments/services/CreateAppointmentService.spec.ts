import 'reflect-metadata';
import CreateApointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeApointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import AppError from '@shared/errors/AppError';

let fakeAppointmentRepository: FakeApointmentRepository;
let createAppointment: CreateApointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeApointmentRepository();
    createAppointment = new CreateApointmentService(fakeAppointmentRepository);
  });

  it('should be able to create a new apointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two apointments on the same time', async () => {
    const appointmentDate = new Date(2020, 0, 1, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
