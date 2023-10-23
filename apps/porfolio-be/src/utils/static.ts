import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: process.env.NX_FE_URL || 'https://dusantopic.onrender.com',
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
};
