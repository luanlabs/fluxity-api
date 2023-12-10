import { connect } from 'mongoose';
import log from './logger';

const db = async (url: string, dbName: string) => {
  try {
    await connect(url, { dbName });
  } catch (error) {
    log.fatal({ message: "databse didn't connect" });
    process.exit(1);
  }
};

export default db;
