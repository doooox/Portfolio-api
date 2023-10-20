import { Router } from 'express';
import {
  createProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
} from '../controllers/projectController';
import upload from '../middleware/uploadMiddleware';

const projectRouter = Router();

projectRouter.get('/', getAllProjects);
projectRouter.get('/:id', getSingleProject);
projectRouter.post('/create', upload.array('photos'), createProject);
projectRouter.delete('/delete/:id', deleteProject);

export default projectRouter;
