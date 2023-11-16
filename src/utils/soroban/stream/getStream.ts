import { Account, Contract, scValToNative } from 'soroban-client';

import ToScVal from '../scVal';
import getServer from '../getServer';
import baseTransaction from '../baseTransaction';

const getStream = async (admin: Account, contract: Contract, id: string) => {
  const server = getServer();

  const call = contract.call('get_stream', ToScVal.u64(id));

  const transaction = await baseTransaction(admin, call);

  const transactionSimulate = await server.simulateTransaction(transaction);

  const response = scValToNative(Object(transactionSimulate).result.retval);

  return response;
};

export default getStream;
