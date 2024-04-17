import log from '../logger';
import tokenUp from './add_important_feild_to_token';
import lockupUp from './add_lockup';

const migrate = async () => {
  try {
    await tokenUp();
    await lockupUp();
  } catch (error) {
    log.error({ message: 'Migration failed:', error });
  }
};

export default migrate;
