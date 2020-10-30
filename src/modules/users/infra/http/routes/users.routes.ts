import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.post('/', usersController.create);

usersRoutes.get('/', (req, res) => {
  return res.send('hello there');
});

export default usersRoutes;
