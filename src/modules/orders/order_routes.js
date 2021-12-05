import { get, getDetail, add, update } from './order_controller';
import validator from './order_validator';
import AuthMiddleware from '../../middlewares/authentication';

const OrderRoutes = (app, prefix) => {
  app.route(`${prefix}/order`).get(AuthMiddleware, get);
  app.route(`${prefix}/order/detail/:id`).get(AuthMiddleware, getDetail);
  app.route(`${prefix}/order/add`).post(AuthMiddleware, validator('order'), add);
  app.route(`${prefix}/order/update/:id`).patch(AuthMiddleware, validator('order'), update);
};

export { OrderRoutes };
