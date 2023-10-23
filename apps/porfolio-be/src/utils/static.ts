import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: 'https://dusantopic.onrender.com',
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
};
