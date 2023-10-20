import mongoose from 'mongoose';

export const connectDB = async () => {
  const dbName = process.env.NX_MONGO_URI;
  try {
    await mongoose.connect(dbName);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
