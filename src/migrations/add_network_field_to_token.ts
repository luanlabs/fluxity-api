import log from '../logger';
import Token from '../models/Token';

async function tokenUp() {
  const update = await Token.updateMany({ network: undefined }, { $set: { network: 'testnet' } });
  if (update.modifiedCount != 0) {
    log.info({ message: 'Migration token applied successfully' });
  }
}

export default tokenUp;
