import { Contract } from 'soroban-client';
import getAdmin from '../utils/soroban/getAdmin';
import getServer from '../utils/soroban/getServer';
import buildGetStreamTransaction from '../utils/soroban/stream/buildGetStream';
import Stream from '../models/Stream';

const getStream = async (id: string) => {
  const server = getServer();
  const accountAdmin = await server.getAccount(getAdmin().publicKey());
  const contract = new Contract(String(process.env.CONTRACT_ID));
  const streamDetails = await buildGetStreamTransaction(accountAdmin, contract, id);

  const existingStream = await Stream.findOne({ id_stream: id });
  if (existingStream) {
    return 'stream in db';
  }

  streamDetails.id_stream = id;

  const streamToDb = new Stream(streamDetails);
  await streamToDb.save();

  return streamToDb;
};
export default getStream;
