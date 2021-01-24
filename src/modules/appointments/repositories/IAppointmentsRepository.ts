// todo arquivo com I só tem responsabilidade de retornar uma interface
import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '../infra/dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  find(): Promise<Appointment[]>;
}
