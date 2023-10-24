import express from 'express';
import cors from 'cors';
import { corsOptions } from '../utils/static';
import router from '../routes/router';
import * as db from '../service/config/db';

export const createApp = () => {
  db.connectDB();
  const app = express();
  app.use('/assets/images', express.static(filePath));
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api', router);
  return app;
};
