import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import MinistriesController from '../controllers/MinistriesController';
import MinistriesLeadersController from '../controllers/MinistriesLeadersControllers';
import MinistriesMembersController from '../controllers/MinistriesMembersController';
import MinistriesPhotoController from '../controllers/MinistriesPhotoController';

const ministriesRouter = Router();

const ministriesController = new MinistriesController();
const ministriesLeadersController = new MinistriesLeadersController();
const ministriesMembersController = new MinistriesMembersController();
const ministriesPhotoController = new MinistriesPhotoController();

const upload = multer(uploadConfig.multer);

ministriesRouter.get('/', ministriesController.index);
ministriesRouter.get('/:id', ministriesController.show);

ministriesRouter.post('/', ministriesController.create);
ministriesRouter.put('/', ministriesController.update);

ministriesRouter.put(
  '/photo/:id',
  upload.single('photo'),
  ministriesPhotoController.update,
);

ministriesRouter.put('/leaders/:id', ministriesLeadersController.update);

ministriesRouter.post('/members/:id', ministriesMembersController.create);
ministriesRouter.delete('/members/:id', ministriesMembersController.destroy);

export default ministriesRouter;
