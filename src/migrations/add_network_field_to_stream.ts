import log from '../logger';
import Stream from '../models/Stream';

async function streamUp() {
  const update = await Stream.updateMany({ network: undefined }, { $set: { network: 'testnet' } });
  if (update.modifiedCount != 0) {
    log.info({ message: 'Migration stream applied successfully' });
  }
}

export default streamUp;
