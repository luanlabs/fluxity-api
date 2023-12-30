import { Contract } from 'stellar-sdk';

import Token from '../models/Token';
import Stream from '../models/Stream';
import saveToken from '../utils/token/saveToken';
import getAdmin from '../utils/soroban/getAdmin';
import getServer from '../utils/soroban/getServer';
import getStream from '../utils/soroban/stream/getStream';
import bigintValuesToNumbers from '../utils/soroban/stream/bigintValuesToNumbers';
import log from '../logger';

const saveNewStream = async (id: string) => {
  const server = getServer();
  const admin = await server.getAccount(getAdmin().publicKey());
  const contract = new Contract(String(process.env.CONTRACT_ID));

  const existingStream = await Stream.findOne({ id });

  if (existingStream) {
    return;
  }

  const stream = await getStream(admin, contract, id);
  const streamDetails = bigintValuesToNumbers(stream);

  let token = await Token.findOne({ address: streamDetails.token });

  if (!token) {
    token = await saveToken(streamDetails.token);
  }

  streamDetails.id = id;
  streamDetails.token = token._id;

  const newStream = new Stream(streamDetails);

  await newStream.save();

  log.info({ message: 'Save new stream successful', value: newStream });
};

export default saveNewStream;
