import { Request, Response } from 'express';
import Technology from '../models/TechnologyModel';
import { responseMessage } from '../utils/helpers';

export const getAllTech = async (req: Request, res: Response) => {
  const tech = await Technology.find();

  if (!tech) return responseMessage(404, res, 'No technologies found');

  return res.status(200).json(tech);
};

export const addTech = async (req: Request, res: Response) => {
  const { name } = req.body;

  const techData = {
    name,
  };

  const tech = await Technology.create(techData);
  return res.status(201).json(tech);
};
