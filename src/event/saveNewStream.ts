import Token from '../models/Token';
import Stream from '../models/Stream';
import saveToken from '../utils/token/saveToken';
import getStream from '../utils/soroban/stream/getStream';
import bigintValuesToNumbers from '../utils/soroban/stream/bigintValuesToNumbers';
import log from '../logger';
import getConfig from '../utils/soroban/getConfig';

const saveNewStream = async (id: string, network: string) => {
  const { contract, admin } = await getConfig(network);

  const existingStream = await Stream.findOne({ id, network });

  if (existingStream) {
    return;
  }

  const stream = await getStream(admin, contract, id);
  const streamDetails = bigintValuesToNumbers(stream);

  let token = await Token.findOne({ address: streamDetails.token });

  if (!token) {
    token = await saveToken(streamDetails.token, network);
  }

  streamDetails.id = id;
  streamDetails.token = token._id;

  const newStream = new Stream(streamDetails);

  await newStream.save();

  log.info({ message: 'Save new stream successful', value: newStream });
};

export default saveNewStream;
