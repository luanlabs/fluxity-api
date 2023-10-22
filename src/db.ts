import mongoose from 'mongoose';

const db = async (url: string, name: string) => {
  try {
    await mongoose.connect(url, { dbName: name });
  } catch (error) {
    console.log("databse didn't connect");
    process.exit(1);
  }
};

export default db;
