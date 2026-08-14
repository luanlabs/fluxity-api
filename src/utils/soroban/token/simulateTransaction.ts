import { Account, rpc, scValToNative, Contract } from '@stellar/stellar-sdk';

import baseTransaction from '../baseTransaction';
import getConfig from '../getConfig';
import { Network } from '../../../types/networkType';

export const simulateTransaction = async (
  admin: Account,
  contract: Contract,
  functionName: string,
  network: Network,
): Promise<string> => {
  const { server, networkPassphrase } = await getConfig(network);

  const call = contract.call(functionName);

  const transaction = baseTransaction(admin, call, networkPassphrase);

  const simulation = await server.simulateTransaction(transaction);

  if (!rpc.Api.isSimulationSuccess(simulation) || !simulation.result) {
    throw new Error(`Failed to simulate "${functionName}" on ${network}`);
  }

  return scValToNative(simulation.result.retval);
};

export default simulateTransaction;
