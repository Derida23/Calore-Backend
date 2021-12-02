import { province, district, regency } from './address_controller';

const AddressRoutes = (app, prefix) => {
  app.route(`${prefix}/province`).get(province);
  app.route(`${prefix}/district`).get(district);
  app.route(`${prefix}/regency`).get(regency);
};

export { AddressRoutes };
