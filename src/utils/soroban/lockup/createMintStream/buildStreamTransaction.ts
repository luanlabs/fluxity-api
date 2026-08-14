import { Account } from '@stellar/stellar-sdk';

import ToScVal from '../../scVal';
import baseTransaction from '../../baseTransaction';
import getConfig from '../../getConfig';
import { Networks } from '../../../../constant/network';

const buildStreamTransaction = async (
  admin: Account,
  toAddress: string,
  token: string,
): Promise<string> => {
  const { server, contract, adminKeypair, networkPassphrase } = await getConfig(Networks.Testnet);

  const params = await ToScVal.toXdrValueStream(toAddress, token);

  const streamCall = contract.call('create_lockup', params);

  const transaction = baseTransaction(admin, streamCall, networkPassphrase);

  const transactionPrepare = await server.prepareTransaction(transaction);
  transactionPrepare.sign(adminKeypair);

  const response = await server.sendTransaction(transactionPrepare);

  if (response.status === 'ERROR') {
    throw new Error(`Failed to submit create_lockup transaction for token ${token}`);
  }

  return response.hash;
};

export default buildStreamTransaction;
