import { Account, Contract } from 'stellar-sdk';

import ToScVal from '../../scVal';
import baseTransaction from '../../baseTransaction';
import getConfig from '../../getConfig';
import { network } from '../../../../constant/network';

const buildStreamTransaction = async (
  admin: Account,
  toAddress: string,
  token: string,
): Promise<string> => {
  const { server, contract: contractId, adminSecretKey } = await getConfig(network.Testnet);
  const contract = new Contract(contractId.address().toString());

  const params = ToScVal.toXdrValueStream(toAddress, token);

  const streamCall = contract.call('create_stream', params);

  const transaction = await baseTransaction(admin, streamCall);

  const transactionPrepare = await server.prepareTransaction(transaction);
  transactionPrepare.sign(adminSecretKey);

  const response = await server.sendTransaction(transactionPrepare);
  return response.hash;
};

export default buildStreamTransaction;
