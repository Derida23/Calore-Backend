require('dotenv-flow').config();

module.exports = {
  port: process.env.APP_PORT,
  appUrl: process.env.APP_MAIN_URL,
  dialect: process.env.DB_DRIVER,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  jwtSecret: process.env.JWT_SECRET,
};
