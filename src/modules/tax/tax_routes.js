import { get, add, update } from './tax_controller';
import validator from './tax_validator';
import AuthMiddleware from '../../middlewares/authentication';

const TaxRoutes = (app, prefix) => {
  app.route(`${prefix}/tax`).get(AuthMiddleware, get);
  app.route(`${prefix}/tax/add`).post(AuthMiddleware, validator('tax'), add);
  app.route(`${prefix}/tax/update/:id`).patch(AuthMiddleware, validator('tax'), update);
};

export { TaxRoutes };
