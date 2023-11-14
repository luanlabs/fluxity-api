import { Contract } from 'soroban-client';

import getAdmin from '../utils/soroban/getAdmin';
import getServer from '../utils/soroban/getServer';
import getStream from '../utils/soroban/stream/getStream';
import Stream from '../models/Stream';
import bigintValuesToNumbers from '../utils/soroban/stream/bigintValuesToNumbers';

const saveNewStram = async (id: string) => {
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

    streamDetails._id = String(id);

    const newStream = new Stream(streamDetails);
    await newStream.save();

    return newStream;
  } catch (e) {
    return console.log(e.message);
  }
};

export default saveNewStram;
