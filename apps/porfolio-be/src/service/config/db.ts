import mongooses from 'mongoose';

export const connectDB = async () => {
  const dbName =
    'mongodb+srv://dtopic12:dtopic12@myWebsite.2ts2qui.mongodb.net/?retryWrites=true&w=majority';

  try {
    await mongooses.connect(dbName);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
