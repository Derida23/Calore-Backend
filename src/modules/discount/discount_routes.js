import { get, add, update } from './discount_controller';
import validator from './discount_validator';
import AuthMiddleware from '../../middlewares/authentication';

const DiscountRoutes = (app, prefix) => {
  app.route(`${prefix}/discount`).get(AuthMiddleware, get);
  app.route(`${prefix}/discount/add`).post(AuthMiddleware, validator('discount'), add);
  app.route(`${prefix}/discount/update/:id`).patch(AuthMiddleware, validator('discount'), update);
};

export { DiscountRoutes };
