import { connect } from 'mongoose';
import log from './logger';
import migrate from './migrations/migrate';

const db = async (url: string, dbName: string) => {
  try {
    migrate();
    await connect(url, { dbName });
  } catch (error) {
    log.fatal("databse didn't connect");
    process.exit(1);
  }
};

export default db;
