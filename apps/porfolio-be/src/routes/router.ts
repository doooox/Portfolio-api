import { Router } from 'express';
import projectRouter from './projectRouter';

const router = Router();

router.use('/projects', projectRouter);

export default router;
