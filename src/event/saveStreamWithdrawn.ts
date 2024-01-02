import getStream from '../utils/soroban/stream/getStream';
import Stream from '../models/Stream';
import bigintValuesToNumbers from '../utils/soroban/stream/bigintValuesToNumbers';
import saveNewStream from './saveNewStream';
import log from '../logger';
import getConfig from '../utils/soroban/getConfig';

const saveStreamWithdrawn = async (id: string, network: string) => {
  const { contract, admin } = await getConfig(network);
  const stream = await getStream(admin, contract, id);
  const streamDetails = bigintValuesToNumbers(stream);

  const updateStream = await Stream.findOneAndUpdate(
    { id },
    { withdrawn: streamDetails.withdrawn },
  );

  log.info({ message: 'Save withdrawn stream successful', value: updateStream });

  if (!updateStream) {
    await saveNewStream(id, network);
  }
};

export default saveStreamWithdrawn;
