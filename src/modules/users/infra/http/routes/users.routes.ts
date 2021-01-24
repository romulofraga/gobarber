import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersControllers';

const usersRouter = Router();
const usersController = new UsersController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersController.createUser);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersController.updateAvatar,
);

export default usersRouter;
