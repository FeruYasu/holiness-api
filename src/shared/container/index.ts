import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IMinistrieRepository from '@modules/ministries/repositories/IMinistriesRepository';
import MinistriesRepository from '@modules/ministries/infra/typeorm/repositories/MinistriesRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import EventsRepository from '@modules/events/infra/typeorm/repositories/EventsRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import IAnnouncementsRepository from '@modules/announcements/repositories/IAnnouncementsRepository';
import AnnouncementsRepository from '@modules/announcements/infra/typeorm/repositories/AnnouncementsRepository';

import ISermonsRepository from '@modules/sermons/repositories/ISermonsRepository';
import SermonsRepository from '@modules/sermons/infra/typeorm/repositories/SermonsRepository';

import ITagsRepository from '@modules/tags/repositories/ITagsRepository';
import TagsRepository from '@modules/tags/infra/typeorm/repositories/TagsRepository';

import ICommentsRepository from '@modules/comments/repositories/ICommentsRepository';
import CommentsRepository from '@modules/comments/infra/typeorm/repositories/CommentsRepository';

import ITestimonialsRepository from '@modules/testimonials/repositories/ITestimonialsRepository';
import TestimonialsRepository from '@modules/testimonials/infra/typeorm/repositories/TestimonialsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IMinistrieRepository>(
  'MinistriesRepository',
  MinistriesRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<IAnnouncementsRepository>(
  'AnnouncementsRepository',
  AnnouncementsRepository,
);

container.registerSingleton<ISermonsRepository>(
  'SermonsRepository',
  SermonsRepository,
);

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);

container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository,
);

container.registerSingleton<ITestimonialsRepository>(
  'TestimonialsRepository',
  TestimonialsRepository,
);
