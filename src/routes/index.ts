import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

/**
 * O que for pra '/appointments' é direcionado para appointmentsRouter
 */

routes.use('/appointments', appointmentsRouter);

export default routes;
