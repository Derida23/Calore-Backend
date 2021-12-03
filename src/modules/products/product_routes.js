import { get, add, update } from './product_controller';
import validator from './product_validator';
import AuthMiddleware from '../../middlewares/authentication';
import { upload } from './product_repository';

const ProductRoutes = (app, prefix) => {
  app.route(`${prefix}/product`).get(AuthMiddleware, get);
  app.route(`${prefix}/product/add`).post(AuthMiddleware, validator('product'), upload, add);
  app.route(`${prefix}/product/update/:id`).patch(AuthMiddleware, validator('product'), update);
};

export { ProductRoutes };
