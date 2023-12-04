import { Contract } from 'soroban-client';

import Stream from '../models/Stream';
import getAdmin from '../utils/soroban/getAdmin';
import getServer from '../utils/soroban/getServer';
import getStream from '../utils/soroban/stream/getStream';

import saveNewStream from './saveNewStream';

const saveStreamCancelled = async (id: string) => {
  const server = getServer();
  const admin = await server.getAccount(getAdmin().publicKey());
  const contract = new Contract(String(process.env.CONTRACT_ID));
  const stream = await getStream(admin, contract, id);

  const updateStream = await Stream.findOneAndUpdate({ id }, { is_cancelled: stream.is_cancelled });

  if (!updateStream) {
    await saveNewStream(id);
  }
};

export default saveStreamCancelled;
