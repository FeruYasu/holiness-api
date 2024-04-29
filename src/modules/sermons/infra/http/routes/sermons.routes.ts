import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import SermonsController from '../controllers/SermonsController';
import SermonsThumbnailController from '../controllers/SermonsThumbnailController';
import SermonsCommentsController from '../controllers/SermonsCommentsController';

const upload = multer(uploadConfig.multer);

const sermonsRouter = Router();

const sermonsController = new SermonsController();
const sermonsThumbnailController = new SermonsThumbnailController();
const sermonsCommentsController = new SermonsCommentsController();

sermonsRouter.post('/', sermonsController.create);
sermonsRouter.get('/', sermonsController.index);

sermonsRouter.put(
  '/thumbnail/:id',
  upload.single('thumbnail'),
  sermonsThumbnailController.update,
);

sermonsRouter.put('/comments', sermonsCommentsController.update);
sermonsRouter.get('/comments/:sermonId', sermonsCommentsController.index);

export default sermonsRouter;
