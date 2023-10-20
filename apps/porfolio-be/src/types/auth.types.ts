/* eslint-disable @typescript-eslint/no-namespace */
import { Request as ExpressRequest } from 'express';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string | JwtPayload;
        email: string | JwtPayload;
        username: string | JwtPayload;
      };
    }
  }
}
