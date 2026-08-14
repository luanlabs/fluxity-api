import { Account, Contract, rpc, scValToNative } from '@stellar/stellar-sdk';

import ToScVal from '../scVal';
import baseTransaction from '../baseTransaction';
import { Network } from '../../../types/networkType';
import getConfig from '../getConfig';

const getLockup = async (admin: Account, contract: Contract, id: string, network: Network) => {
  const { server, networkPassphrase } = await getConfig(network);

  const call = contract.call('get_lockup', ToScVal.u64(id));

  const transaction = baseTransaction(admin, call, networkPassphrase);

  const simulation = await server.simulateTransaction(transaction);

  if (!rpc.Api.isSimulationSuccess(simulation) || !simulation.result) {
    throw new Error(`Failed to simulate get_lockup for id ${id} on ${network}`);
  }

  return scValToNative(simulation.result.retval);
};

export default getLockup;
