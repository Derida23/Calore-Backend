import { register, login } from './auth_controller';
import validator from './auth_validator';

const AuthRoutes = (app, prefix) => {
  app.route(`${prefix}/register`).post(validator('register'), register);
  app.route(`${prefix}/login`).post(validator('login'), login);
};

export { AuthRoutes };
