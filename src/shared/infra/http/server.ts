import express from 'express';

import appRoutes from './routes';
import '@config/database';

const app = express();

app.use(express.json());

app.use(appRoutes);

app.get('/', (req, res) => res.send('Hello World'));

app.listen(3333, () => {
  console.log('🚀 Server launched at 3333');
});
