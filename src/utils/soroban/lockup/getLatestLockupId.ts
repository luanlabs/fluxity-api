import { scValToBigInt } from '@stellar/stellar-sdk';

import getConfig from '../getConfig';
import baseTransaction from '../baseTransaction';
import { Network } from '../../../types/networkType';

export const getLatestLockupId = async (network: Network): Promise<bigint> => {
  const { server, contract, admin } = await getConfig(network);

  const call = contract.call('get_latest_lockup_id');

  const transactionResult = await baseTransaction(admin, call);

  const transactionSimulate = await server.simulateTransaction(transactionResult);

  const retval = scValToBigInt(Object(transactionSimulate).result.retval);

  return retval;
};

export default getLatestLockupId;
