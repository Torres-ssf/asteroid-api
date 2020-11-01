import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

const appRoutes = Router();

appRoutes.use('/users', usersRoutes);

appRoutes.use('/sessions', sessionsRoutes);

export default appRoutes;
