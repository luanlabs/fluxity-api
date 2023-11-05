import { Account, scValToNative, Contract } from 'soroban-client';

import createTransaction from '../baseTransaction';
import getServer from '../getServer';

export const simulateTransaction = async (
  admin: Account,
  contract: Contract,
  functionName: string,
): Promise<string> => {
  const server = getServer();

  const call = contract.call(functionName);

  const transactionResult = await createTransaction(admin, call);

  const transactionSimulate = await server.simulateTransaction(
    transactionResult,
  );

  const retval: string = scValToNative(
    Object(transactionSimulate).result.retval,
  );

  return retval;
};

export default simulateTransaction;
