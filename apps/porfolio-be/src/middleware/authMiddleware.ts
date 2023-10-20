import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import { JwtPayload } from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const payload = jwt.verify(token, process.env.NX_JWT_SECRET) as JwtPayload;
    req.user = {
      id: payload.id as string,
      email: payload.email as string,
      username: payload.username as string,
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
