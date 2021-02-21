import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ListAppointmentService from '@modules/appointments/services/ListAppointmentsServce';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    /**
     * Sem injeção de dependência:
     // intstancio o repositorio para aplicar dentro do service pelo principio de inversao de dependencia
     const appointmentsRepository = new AppointmentsRepository();
     // quem usa o service tem a responsabilidade de informar o formato
     const createAppointment = new CreateAppointmentService(
       appointmentsRepository,
     );
     *
     */

    /**
     * carrega o service ->
     * olha no constructor se precisa de alguma dependencia ->
     * vai no container e vê se tem alguma dependencia cadastrada com isso ->
     * então retorna uma instância da classe AppointmentsRepository
     * */
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
      user_id,
    });

    return response.json(appointment);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const appointments = container.resolve(ListAppointmentService);

    const allAppointments = await appointments.execute();

    return response.json(allAppointments);
  }
}
