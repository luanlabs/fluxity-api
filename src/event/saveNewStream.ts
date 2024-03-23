import Token from '../models/Token';
import Stream from '../models/Stream';
import saveToken from '../utils/token/saveToken';
import getStream from '../utils/soroban/stream/getStream';
import bigintValuesToNumbers from '../utils/soroban/stream/bigintValuesToNumbers';
import log from '../logger';
import getConfig from '../utils/soroban/getConfig';
import { Network } from '../types/networkType';

const saveNewStream = async (id: string, network: Network) => {
  try {
    const { contract, admin } = await getConfig(network);

    const existingStream = await Stream.findOne({ id, network });

    if (existingStream) {
      return;
    }

    const stream = await getStream(admin, contract, id, network);
    const streamDetails = bigintValuesToNumbers(stream);

    let token = await Token.findOne({ address: streamDetails.token });

    if (!token) {
      token = await saveToken(streamDetails.token, network);
    }

    streamDetails.id = id;
    streamDetails.token = token._id;
    streamDetails.network = network;

    const newStream = new Stream(streamDetails);

    await newStream.save();

    log.info({ message: 'Save new stream successful', value: newStream });
  } catch {
    log.info({ message: 'Save new stream not successful (duplicate stream)' });
  }
};

export default saveNewStream;
