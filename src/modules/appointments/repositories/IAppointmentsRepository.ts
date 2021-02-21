// todo arquivo com I só tem responsabilidade de retornar uma interface
import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '../infra/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../infra/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../infra/dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  find(): Promise<Appointment[]>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
