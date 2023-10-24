import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: 'https://dusantopic.onrender.com',
  preflightContinue: true,
  optionsSuccessStatus: 200,
};
