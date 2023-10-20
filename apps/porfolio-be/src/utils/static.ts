import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: process.env.NX_FE_URL || '*',
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
};
