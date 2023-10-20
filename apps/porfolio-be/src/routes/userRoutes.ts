import { Router } from 'express';
import {
  LoginUser,
  LogoutUser,
  RegisterUser,
  getUsers,
} from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const userRouter = Router();

userRouter.post('/login', LoginUser);
userRouter.post('/register', RegisterUser);
userRouter.post('/logout', authMiddleware, LogoutUser);
userRouter.get('/', getUsers);

export default userRouter;
