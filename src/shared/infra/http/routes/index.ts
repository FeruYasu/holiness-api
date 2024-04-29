import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import ministriesRouter from '@modules/ministries/infra/http/routes/ministries.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import eventsRouter from '@modules/events/infra/http/routes/events.routes';
import announcementsRouter from '@modules/announcements/infra/http/routes/announcements.routes';
import sermonsRouter from '@modules/sermons/infra/http/routes/sermons.routes';
import tagsRouter from '@modules/tags/infra/http/routes/tags.routes';
import commentsRouter from '@modules/comments/infra/http/routes/comments.routes';
import testimonialsRouter from '@modules/testimonials/infra/http/routes/testimonials.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/ministries', ministriesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/events', eventsRouter);
routes.use('/announcements', announcementsRouter);
routes.use('/sermons', sermonsRouter);
routes.use('/tags', tagsRouter);
routes.use('/comments', commentsRouter);
routes.use('/testimonials', testimonialsRouter);

export default routes;
