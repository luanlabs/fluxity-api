import mongoose from 'mongoose';
const MONGO_URI = 'mongodb://localhost:27017/Fluxity';

const db = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

export default db;
