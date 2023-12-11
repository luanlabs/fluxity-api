import { Account, Contract } from 'soroban-client';

import ToScVal from '../scVal';
import getServer from '../getServer';
import baseTransaction from '../baseTransaction';
import getAdmin from '../getAdmin';

const buildStreamTransaction = async (
  admin: Account,
  toAddress: string,
  token: string,
): Promise<string> => {
  const server = getServer();
  const adminAccount = getAdmin();
  const contract = new Contract(String(process.env.CONTRACT_ID));

  const params = ToScVal.toXdrValueStream(toAddress, token);

  const streamCall = contract.call('create_stream', params);

  const transaction = await baseTransaction(admin, streamCall);

  const transactionPrepare = await server.prepareTransaction(transaction);
  transactionPrepare.sign(adminAccount);

  const response = await server.sendTransaction(transactionPrepare);

  return response.hash;
};

export default buildStreamTransaction;
