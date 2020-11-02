import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';

const appRoutes = Router();

appRoutes.use('/users', usersRoutes);

export default appRoutes;
