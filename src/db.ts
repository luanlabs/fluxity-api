import { connect } from 'mongoose';

const db = async (url: string, dbName: string) => {
  try {
    await connect(url, { dbName });
  } catch (error) {
    console.log("databse didn't connect");
    process.exit(1);
  }
};

export default db;
