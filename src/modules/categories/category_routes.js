import { get, add, update } from './category_controller';
import validator from './category_validator';
import AuthMiddleware from '../../middlewares/authentication';

const CategoryRoutes = (app, prefix) => {
  app.route(`${prefix}/category`).get(AuthMiddleware, get);
  app.route(`${prefix}/category/add`).post(AuthMiddleware, validator('category'), add);
  app.route(`${prefix}/category/update/:id`).patch(AuthMiddleware, validator('category'), update);
};

export { CategoryRoutes };
