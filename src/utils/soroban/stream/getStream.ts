import { Account, Contract, scValToNative } from 'stellar-sdk';

import ToScVal from '../scVal';
import baseTransaction from '../baseTransaction';
import { Network } from '../../../types/networkType';
import getConfig from '../getConfig';

const getStream = async (admin: Account, contract: Contract, id: string, network: Network) => {
  const { server } = await getConfig(network);

  const call = contract.call('get_stream', ToScVal.u64(id));

  const transaction = await baseTransaction(admin, call);

  const transactionSimulate = await server.simulateTransaction(transaction);

  const response = scValToNative(Object(transactionSimulate).result.retval);

  return response;
};

export default getStream;
