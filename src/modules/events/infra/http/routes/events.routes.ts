import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import EnsureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import EventsController from '../controllers/EventsController';
import EventsMinistriesController from '../controllers/EventsMinistriesController';
import EventsParticipantsController from '../controllers/EventsParticipantsController';
import EventsPhotosController from '../controllers/EventsPhotosController';

const eventsRouter = Router();
const upload = multer(uploadConfig.multer);

const eventsController = new EventsController();
const eventsMinistriesController = new EventsMinistriesController();
const eventsParticipantsController = new EventsParticipantsController();
const eventsPhotosController = new EventsPhotosController();

eventsRouter.use(EnsureAuthentication);
eventsRouter.post('/', eventsController.create);
eventsRouter.get('/', eventsController.index);
eventsRouter.get('/:id', eventsController.show);

eventsRouter.patch(
  '/photo/:id',
  upload.single('photo'),
  eventsPhotosController.update,
);

eventsRouter.post('/ministries', eventsMinistriesController.create);

eventsRouter.post('/participants', eventsParticipantsController.create);
eventsRouter.delete('/participants', eventsParticipantsController.destroy);

export default eventsRouter;
