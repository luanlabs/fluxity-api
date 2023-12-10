import { Contract } from 'soroban-client';

import getAdmin from '../utils/soroban/getAdmin';
import getServer from '../utils/soroban/getServer';
import getStream from '../utils/soroban/stream/getStream';
import Stream from '../models/Stream';
import bigintValuesToNumbers from '../utils/soroban/stream/bigintValuesToNumbers';
import saveNewStream from './saveNewStream';
import log from '../logger';

const saveStreamWithdrawn = async (id: string) => {
  const server = getServer();
  const admin = await server.getAccount(getAdmin().publicKey());
  const contract = new Contract(String(process.env.CONTRACT_ID));
  const stream = await getStream(admin, contract, id);
  const streamDetails = bigintValuesToNumbers(stream);

  const updateStream = await Stream.findOneAndUpdate(
    { id },
    { withdrawn: streamDetails.withdrawn },
  );

  log.info({ message: 'Save withdrawn stream successful', value: updateStream });

  if (!updateStream) {
    await saveNewStream(id);
  }
};

export default saveStreamWithdrawn;
