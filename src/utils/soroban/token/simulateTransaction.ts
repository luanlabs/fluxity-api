import { Account, scValToNative, Contract } from 'stellar-sdk';

import createTransaction from '../baseTransaction';
import getConfig from '../getConfig';

export const simulateTransaction = async (
  admin: Account,
  contract: Contract,
  functionName: string,
  network: string,
): Promise<string> => {
  const { server } = await getConfig(network);

  const call = contract.call(functionName);

  const transactionResult = await createTransaction(admin, call);

  const transactionSimulate = await server.simulateTransaction(transactionResult);

  const retval: string = scValToNative(Object(transactionSimulate).result.retval);

  return retval;
};

export default simulateTransaction;
