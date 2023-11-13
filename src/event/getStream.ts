import { Contract } from 'soroban-client';
import getAdmin from '../utils/soroban/getAdmin';
import getServer from '../utils/soroban/getServer';
import buildGetStreamTransaction from '../utils/soroban/stream/buildGetStream';
import Stream from '../models/Stream';
import bigintToNumberStream from '../utils/soroban/stream/bigintToNumberStream';

const getStreamAndSave = async (id: string) => {
  const server = getServer();
  const accountAdmin = await server.getAccount(getAdmin().publicKey());
  const contract = new Contract(String(process.env.CONTRACT_ID));
  const getStream = await buildGetStreamTransaction(accountAdmin, contract, id);

  const existingStream = await Stream.findOne({ id_stream: id });
  if (existingStream) {
    return 'stream in db';
  }
  const streamDetails = bigintToNumberStream(getStream);
  streamDetails.id_stream = Number(id);
  streamDetails.status = 'ongoing';

  const streamToDb = new Stream(streamDetails);
  await streamToDb.save();

  return streamToDb;
};
export default getStreamAndSave;
