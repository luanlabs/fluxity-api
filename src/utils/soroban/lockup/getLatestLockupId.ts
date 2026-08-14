import { rpc, scValToBigInt } from '@stellar/stellar-sdk';

import getConfig from '../getConfig';
import baseTransaction from '../baseTransaction';
import { Network } from '../../../types/networkType';

export const getLatestLockupId = async (network: Network): Promise<bigint> => {
  const { server, contract, admin, networkPassphrase } = await getConfig(network);

  const call = contract.call('get_latest_lockup_id');

  const transaction = baseTransaction(admin, call, networkPassphrase);

  const simulation = await server.simulateTransaction(transaction);

  if (!rpc.Api.isSimulationSuccess(simulation) || !simulation.result) {
    throw new Error(`Failed to simulate get_latest_lockup_id on ${network}`);
  }

  return scValToBigInt(simulation.result.retval);
};

export default getLatestLockupId;
