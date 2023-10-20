import { Router } from 'express';
import projectRouter from './projectRouter';
import userRouter from './userRoutes';

const router = Router();

router.use('/projects', projectRouter);
router.use('/user', userRouter);

export default router;
