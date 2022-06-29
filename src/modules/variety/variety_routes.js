import { get, add, update } from './variety_controller';
import validator from './variety_validator';
import AuthMiddleware from '../../middlewares/authentication';

const VarietyRoutes = (app, prefix) => {
  app.route(`${prefix}/variety`).get(AuthMiddleware, get);
  app.route(`${prefix}/variety/add`).post(AuthMiddleware, validator('variety'), add);
  app.route(`${prefix}/variety/update/:id`).patch(AuthMiddleware, validator('variety'), update);
};

export { VarietyRoutes };
