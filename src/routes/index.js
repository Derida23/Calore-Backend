import { prefix } from '../helpers/version_control';
import { AuthRoutes } from '../modules/auth/auth_routes';
import { TaxRoutes } from '../modules/tax/tax_routes';
import { UserRoutes } from '../modules/user/user_routes';

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
};

export default MainRoutes;
