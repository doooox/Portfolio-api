import mongoose, { Schema } from 'mongoose';
import { ITech } from '../types/technology.types';

const techSchema = new Schema<ITech>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Technology', techSchema);
