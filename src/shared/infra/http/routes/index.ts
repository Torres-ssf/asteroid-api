import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import profileRoutes from '@modules/users/infra/http/routes/profile.routes';

const appRoutes = Router();

appRoutes.use('/users', usersRoutes);

appRoutes.use('/sessions', sessionsRoutes);

appRoutes.use('/profile', profileRoutes);

export default appRoutes;
