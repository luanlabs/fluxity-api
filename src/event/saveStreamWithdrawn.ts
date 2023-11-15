import { Contract } from 'soroban-client';

import getAdmin from '../utils/soroban/getAdmin';
import getServer from '../utils/soroban/getServer';
import getStream from '../utils/soroban/stream/getStream';
import Stream from '../models/Stream';
import bigintValuesToNumbers from '../utils/soroban/stream/bigintValuesToNumbers';
import saveNewStream from './saveNewStream';

const saveStreamWithdrawn = async (id: string) => {
  try {
    const server = getServer();
    const admin = await server.getAccount(getAdmin().publicKey());
    const contract = new Contract(String(process.env.CONTRACT_ID));
    const stream = await getStream(admin, contract, id);
    const streamDetails = bigintValuesToNumbers(stream);

    const updateStream = await Stream.findOneAndUpdate(
      { _id: id },
      { withdrawn: streamDetails.withdrawn },
    );

    if (!updateStream) {
      await saveNewStream(id);
    }
  } catch (e) {}
};

export default saveStreamWithdrawn;
