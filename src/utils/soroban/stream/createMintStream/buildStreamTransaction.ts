import { Account, Contract } from 'stellar-sdk';

import ToScVal from '../../scVal';
import baseTransaction from '../../baseTransaction';
import getAdmin from '../../getAdmin';
import getConfig from '../../getConfig';

const buildStreamTransaction = async (
  admin: Account,
  toAddress: string,
  token: string,
): Promise<string> => {
  const { server, contract: contractId } = await getConfig('testnet');
  const adminAccount = getAdmin();
  const contract = new Contract(contractId.address().toString());

  const params = ToScVal.toXdrValueStream(toAddress, token);

  const streamCall = contract.call('create_stream', params);

  const transaction = await baseTransaction(admin, streamCall);

  const transactionPrepare = await server.prepareTransaction(transaction);
  transactionPrepare.sign(adminAccount);

  const response = await server.sendTransaction(transactionPrepare);
  return response.hash;
};

export default buildStreamTransaction;
