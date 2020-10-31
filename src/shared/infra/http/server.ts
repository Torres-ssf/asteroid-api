import 'reflect-metadata';

import express from 'express';

import '@config/database';
import '@shared/container';

import appRoutes from './routes';

const app = express();

app.use(express.json());

app.use(appRoutes);

app.get('/', (req, res) => res.send('Hello World'));

app.listen(3333, () => {
  console.log('🚀 Server launched at 3333');
});
