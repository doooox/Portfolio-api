import { Request, Response } from 'express';
import Project from '../models/ProjectModel';
import { responseMessage } from '../utils/helpers';

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort([['createdAt', 'descending']]);

    if (!projects) return res.status(400).json({ message: 'No project found' });

    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching projects', error });
  }
};

export const getSingleProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id).populate('technologies');

    if (!project) return res.status(400).json({ message: 'No project found' });

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching project', error });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const { title, description, technologies } = req.body;
  const url = req.protocol + '://' + req.get('host');

  try {
    const photos = (req.files as Express.Multer.File[]).map(
      (file: Express.Multer.File) => url + '/assets/images/' + file.filename
    );

    if (!photos) responseMessage(400, res, 'No photos');

    const projectData = {
      title,
      description,
      technologies,
      photos,
    };

    const project = await Project.create(projectData);

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating project', error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: 'Project id is required' });

  try {
    const deleteProject = await Project.findByIdAndDelete(id);

    if (!deleteProject)
      return res.status(404).json({ message: 'No project found' });

    return res.status(200).json({ message: 'Project successfully deleted!' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting project', error });
  }
};
