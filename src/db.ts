import { connect } from 'mongoose';

import log from './logger';
import migrate from './migrations/migrate';
import getErrorMessage from './utils/getErrorMessage';

const db = async (url: string, dbName: string) => {
  try {
    await connect(url, { dbName });
    log.info(`Connected to MongoDB database "${dbName}"`);
  } catch (error) {
    log.fatal(`Database connection failed: ${getErrorMessage(error)}`);
    process.exit(1);
  }

  // Backfill any lockups missed while offline. Runs in the background so it never
  // blocks startup; it has its own error handling and is safe to retry.
  void migrate();
};

export default db;
