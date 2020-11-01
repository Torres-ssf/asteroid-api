import { Router } from 'express';
import SessionsControler from '../controllers/SessionsController';

const sessionsRoutes = Router();

const sessionsControler = new SessionsControler();

sessionsRoutes.post('/', sessionsControler.create);

export default sessionsRoutes;
