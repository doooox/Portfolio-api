import mongoose, { Schema } from 'mongoose';
import { IProject } from '../types/project.types';

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Technology',
      },
    ],
    photos: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Project', projectSchema);
