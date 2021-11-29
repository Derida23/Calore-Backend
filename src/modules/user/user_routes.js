import { user, update } from './user_controller';
import validator from './user_validator';
import AuthMiddleware from '../../middlewares/authentication';

const UserRoutes = (app, prefix) => {
  app.route(`${prefix}/details`).get(AuthMiddleware, user);
  app.route(`${prefix}/update`).patch(AuthMiddleware, validator('update'), update);
};

export { UserRoutes };
