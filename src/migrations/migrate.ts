import log from '../logger';
import lockupUp from './add_lockup';
import getErrorMessage from '../utils/getErrorMessage';

const migrate = async () => {
  try {
    await lockupUp();
  } catch (error) {
    log.error(`Migration failed: ${getErrorMessage(error)}`);
  }
};

export default migrate;
