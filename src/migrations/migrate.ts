import log from '../logger';

const migrate = async () => {
  try {
    return;
  } catch (error) {
    log.error({ message: 'Migration failed:', error });
  }
};

export default migrate;
