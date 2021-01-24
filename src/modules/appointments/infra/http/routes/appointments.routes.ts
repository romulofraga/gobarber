import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// lista todos os agendamentos do repositorio
appointmentsRouter.get('/', appointmentsController.list);

// Criação de agendamentos com id e data
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
