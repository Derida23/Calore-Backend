import { prefix } from '../helpers/version_control';
import { AuthRoutes } from '../modules/auth/auth_routes';
import { TaxRoutes } from '../modules/tax/tax_routes';
import { UserRoutes } from '../modules/user/user_routes';
import { DiscountRoutes } from '../modules/discount/discount_routes';
import { UomRoutes } from '../modules/uom/uom_routes';
import { CategoryRoutes } from '../modules/categories/category_routes';
import { AddressRoutes } from '../modules/address/address_routes';
import { ProductRoutes } from '../modules/products/product_routes';

const MainRoutes = (app) => {
  // Test the connection api
  app.route(`${prefix}/hello`).get((req, res) => {
    res.send({
      message: 'Hello World',
    });
  });

  // authentication routes
  AuthRoutes(app, prefix);

  // user routes
  UserRoutes(app, prefix);

  // tax routes
  TaxRoutes(app, prefix);

  // discount routes
  DiscountRoutes(app, prefix);

  // uom routes
  UomRoutes(app, prefix);

  // category routes
  CategoryRoutes(app, prefix);

  // address routes
  AddressRoutes(app, prefix);

  // product routes
  ProductRoutes(app, prefix);
};

export default MainRoutes;
