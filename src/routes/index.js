import { prefix } from '../helpers/version_control';
import { AuthRoutes } from '../modules/auth/auth_routes';

const MainRoutes = (app) => {
  // Test the connection api
  app.route(`${prefix}/hello`).get((req, res) => {
    res.send({
      message: 'Hello World',
    });
  });

  // authentication routes
  // AuthRoutes(app, prefix);
};

export default MainRoutes;
