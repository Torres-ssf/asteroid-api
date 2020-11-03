import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import ensuredAuthenticatedMiddleware from '../middlewares/ensuredAuthenticated';

const profileRoutes = Router();

const profileController = new ProfileController();

profileRoutes.get('/', ensuredAuthenticatedMiddleware, profileController.show);

export default profileRoutes;
