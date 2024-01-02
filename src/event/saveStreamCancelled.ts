import Stream from '../models/Stream';
import getStream from '../utils/soroban/stream/getStream';

import saveNewStream from './saveNewStream';
import log from '../logger';
import getConfig from '../utils/soroban/getConfig';

const saveStreamCancelled = async (id: string, network: string) => {
  const { contract, admin } = await getConfig(network);
  const stream = await getStream(admin, contract, id);

  const updateStream = await Stream.findOneAndUpdate(
    { id, network },
    { is_cancelled: stream.is_cancelled },
  );

  log.info({ message: 'Save cancell stream successful', value: updateStream });

  if (!updateStream) {
    await saveNewStream(id, network);
  }
};

export default saveStreamCancelled;
