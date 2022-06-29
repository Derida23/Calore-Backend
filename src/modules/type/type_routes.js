import { get, add, update } from './type_controller';
import validator from './type_validator';
import AuthMiddleware from '../../middlewares/authentication';

const TypeRoutes = (app, prefix) => {
  app.route(`${prefix}/type`).get(AuthMiddleware, get);
  app.route(`${prefix}/type/add`).post(AuthMiddleware, validator('type'), add);
  app.route(`${prefix}/type/update/:id`).patch(AuthMiddleware, validator('type'), update);
};

export { TypeRoutes };
