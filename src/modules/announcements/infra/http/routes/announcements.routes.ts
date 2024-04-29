import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AnnouncementsController from '../controllers/AnnouncementsController';

const announcementsRouter = Router();

const announcementsController = new AnnouncementsController();

announcementsRouter.use(ensureAuthentication);
announcementsRouter.post('/', announcementsController.create);
announcementsRouter.get('/', announcementsController.index);

export default announcementsRouter;
