import { Router } from 'express';
import {
  createProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
} from '../controllers/projectController';
import upload from '../middleware/uploadMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';

const projectRouter = Router();

projectRouter.get('/', getAllProjects);
projectRouter.get('/:id', getSingleProject);
projectRouter.post(
  '/create',
  authMiddleware,
  upload.array('photos'),
  createProject
);
projectRouter.delete('/delete/:id', authMiddleware, deleteProject);

export default projectRouter;
