import log from '../logger';
import tokenUp from './add_network_field_to_token';
import streamUp from './add_network_field_to_stream';

const migrate = async () => {
  try {
    await tokenUp();
    await streamUp();
    log.info({ message: 'Migration applied successfully' });
  } catch (error) {
    log.error({ message: 'Migration failed:', error });
  }
};

export default migrate;
