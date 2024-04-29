import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

import TestimonialsController from '../controllers/TestimonialsController';
import TestimonialsPhotosController from '../controllers/TestimonialsPhotosController';
import EmojisController from '../controllers/EmojisController';
import TestimonialsCommentsController from '../controllers/TestimonialsCommentsController';

const upload = multer(uploadConfig.multer);

const testimonialsRouter = Router();

const testimonialsController = new TestimonialsController();
const testimonialsCommentsController = new TestimonialsCommentsController();
const testimonialsPhotosController = new TestimonialsPhotosController();
const emojisController = new EmojisController();

testimonialsRouter.use(ensureAuthentication);
testimonialsRouter.post('/', testimonialsController.create);

testimonialsRouter.patch(
  '/photo/:id',
  upload.single('photo'),
  testimonialsPhotosController.update,
);

testimonialsRouter.put('/emoji/:id', emojisController.update);
testimonialsRouter.delete('/emoji/:id', emojisController.destroy);

testimonialsRouter.put('/comments', testimonialsCommentsController.update);

testimonialsRouter.get(
  '/comments/:testimonialId',
  testimonialsCommentsController.index,
);

testimonialsRouter.get('/', testimonialsController.index);
testimonialsRouter.put('/:id', testimonialsController.update);

export default testimonialsRouter;
