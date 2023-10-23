import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: '*',
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
};
