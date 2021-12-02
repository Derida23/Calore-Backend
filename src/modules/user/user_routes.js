import { user, update, updateAdmin } from './user_controller';
import validator from './user_validator';
import AuthMiddleware from '../../middlewares/authentication';

const UserRoutes = (app, prefix) => {
  app.route(`${prefix}/profile`).get(AuthMiddleware, user);
  app.route(`${prefix}/profile`).patch(AuthMiddleware, validator('update'), update);
  app.route(`${prefix}/admin/profile/:id`).patch(AuthMiddleware, validator('update'), updateAdmin);
};

export { UserRoutes };
