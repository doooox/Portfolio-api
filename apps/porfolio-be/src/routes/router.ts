import { Router } from 'express';
import projectRouter from './projectRouter';
import userRouter from './userRoutes';
import techRouter from './techRouter';

const router = Router();

router.use('/projects', projectRouter);
router.use('/user', userRouter);
router.use('/tech', techRouter);

export default router;
