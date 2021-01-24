import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

@injectable()
class CreateAppointmentService {
  // quem chama o service agora diz o formato do appointment
  // Principio de inversão de dependenciSas
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute(): Promise<Appointment[]> {
    return this.appointmentsRepository.find();
  }
}

export default CreateAppointmentService;
