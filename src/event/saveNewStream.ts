import { Contract } from 'soroban-client';

import getAdmin from '../utils/soroban/getAdmin';
import getServer from '../utils/soroban/getServer';
import getStream from '../utils/soroban/stream/getStream';
import Stream from '../models/Stream';
import bigintValuesToNumbers from '../utils/soroban/stream/bigintValuesToNumbers';
import Token from '../models/Token';
import saveToken from '../utils/token/saveToken';

const saveNewStream = async (id: string) => {
  try {
    const server = getServer();
    const admin = await server.getAccount(getAdmin().publicKey());
    const contract = new Contract(String(process.env.CONTRACT_ID));
    const stream = await getStream(admin, contract, id);

    const existingStream = await Stream.findOne({ _id: id });

    if (existingStream) {
      return;
    }

    const streamDetails = bigintValuesToNumbers(stream);

    let token = await Token.findOne({ address: streamDetails.token });

    if (!token) {
      token = await saveToken(streamDetails.token);
    }

    streamDetails._id = String(id);
    streamDetails.token = token._id;

    const newStream = new Stream(streamDetails);
    await newStream.save();
  } catch (e) {}
};

export default saveNewStream;
