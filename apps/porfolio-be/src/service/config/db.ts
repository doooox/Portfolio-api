/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

export const connectDB = async () => {
  const dbName = process.env.NX_MONGO_URI;
  try {
    await mongoose.connect(dbName, {
      useUnifiedTopology: true,
    } as any);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
