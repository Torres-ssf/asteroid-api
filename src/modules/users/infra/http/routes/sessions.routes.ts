import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import SessionsControler from '../controllers/SessionsController';

const sessionsRoutes = Router();

const sessionsControler = new SessionsControler();

sessionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  sessionsControler.create,
);

export default sessionsRoutes;
