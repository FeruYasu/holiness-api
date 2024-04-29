import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CommentsController from '../controllers/CommentsController';

const commentsRouter = Router();

const commentsController = new CommentsController();

commentsRouter.use(ensureAuthentication);
commentsRouter.post('/', commentsController.create);

export default commentsRouter;
