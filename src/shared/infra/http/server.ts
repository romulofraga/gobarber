import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from 'config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes/index';

import '@shared/infra/typeorm/index';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      error: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.log(err);

  return response.status(500).json({
    error: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('server is running on port 3333');
});
