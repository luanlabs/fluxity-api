import { Networks } from '../constant/network';
import log from '../logger';
import Stream from '../models/Stream';
import getLatestStreamId from '../utils/soroban/stream/getLatestStreamId';
import removeDuplicateStreams from './removeDuplicateStreams';

async function streamUp() {
  const latestStreamId = await getLatestStreamId(Networks.Testnet);
  let isMigration = false;
  for (let i = 0; i < latestStreamId; i++) {
    const streams = await Stream.find({ id: i, network: Networks.Testnet });

    if (streams.length > 1) {
      removeDuplicateStreams(streams);
      isMigration = true;
    }
  }

  if (isMigration) {
    log.info({ message: 'Migration stream applied successfully' });
  }
}

export default streamUp;
