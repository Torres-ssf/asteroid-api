import { Router } from 'express';
import { Segments, celebrate, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }),
  }),
  usersController.create,
);

export default usersRoutes;
