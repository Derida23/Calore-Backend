import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import MainRoutes from './routes/index';
import { port, appUrl } from './config/env';

const app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

dotenv.config({ silent: true });

// Define all routes
MainRoutes(app);

app.listen(port, () => {
  console.log(`\n This server is running on ${appUrl}:${port}`);
});
