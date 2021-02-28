// todo arquivo com I só tem responsabilidade de retornar uma interface
import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '../infra/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../infra/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../infra/dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(data: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO,
  ): Promise<Appointment[]>;
  find(): Promise<Appointment[]>;
}
