import { get, add, update } from './uom_controller';
import validator from './uom_validator';
import AuthMiddleware from '../../middlewares/authentication';

const UomRoutes = (app, prefix) => {
  app.route(`${prefix}/uom`).get(AuthMiddleware, get);
  app.route(`${prefix}/uom/add`).post(AuthMiddleware, validator('uom'), add);
  app.route(`${prefix}/uom/update/:id`).patch(AuthMiddleware, validator('uom'), update);
};

export { UomRoutes };
