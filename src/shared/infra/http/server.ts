import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express, { json, Request, Response, NextFunction } from 'express';

import '@config/database';
import '@shared/container';

import AppError from '@shared/errors/AppError';

import appRoutes from './routes';

const app = express();

app.use(json());

app.use(appRoutes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(3333, () => {
  console.log('🚀 Server launched at 3333');
});
