import { Router } from 'express';
import { addTech, getAllTech } from '../controllers/techController';

const techRouter = Router();

techRouter.get('/', getAllTech);
techRouter.post('/add', addTech);

export default techRouter;
