import log from '../logger';
import lockupUp from './add_lockup';

const migrate = async () => {
  try {
    await lockupUp();
  } catch (error) {
    log.error(`Migration failed message: ${error.message} `);
  }
};

export default migrate;
