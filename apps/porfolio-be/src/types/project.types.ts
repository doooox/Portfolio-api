import { ITech } from './technology.types';

export interface IProject {
  id: string;
  title: string;
  description: string;
  technologies: ITech[];
  photos: string[];
}
