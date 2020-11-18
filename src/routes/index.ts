import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

/**
 * O que for pra '/appointments' é direcionado para appointmentsRouter
 */

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
